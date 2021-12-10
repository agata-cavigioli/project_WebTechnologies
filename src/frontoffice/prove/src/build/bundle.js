
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.44.1 */

    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let meta0;
    	let meta1;
    	let link0;
    	let link1;
    	let link2;
    	let link3;
    	let t0;
    	let t1;
    	let main;
    	let div8;
    	let div0;
    	let t3;
    	let div1;
    	let t4;
    	let br;
    	let t5;
    	let form;
    	let div5;
    	let div2;
    	let label0;
    	let t7;
    	let input0;
    	let t8;
    	let div3;
    	let label1;
    	let t10;
    	let input1;
    	let t11;
    	let div4;
    	let a0;
    	let t13;
    	let div7;
    	let span;
    	let t15;
    	let div6;
    	let a1;
    	let t17;
    	let div9;
    	let button0;
    	let t19;
    	let button1;
    	let t21;
    	let div10;

    	const block = {
    		c: function create() {
    			meta0 = element("meta");
    			meta1 = element("meta");
    			link0 = element("link");
    			link1 = element("link");
    			link2 = element("link");
    			link3 = element("link");
    			t0 = space();
    			t1 = space();
    			main = element("main");
    			div8 = element("div");
    			div0 = element("div");
    			div0.textContent = "Dining philosophers";
    			t3 = space();
    			div1 = element("div");
    			t4 = text("Welcome!");
    			br = element("br");
    			t5 = space();
    			form = element("form");
    			div5 = element("div");
    			div2 = element("div");
    			label0 = element("label");
    			label0.textContent = "Who are you looking for?";
    			t7 = space();
    			input0 = element("input");
    			t8 = space();
    			div3 = element("div");
    			label1 = element("label");
    			label1.textContent = "Where are you looking?";
    			t10 = space();
    			input1 = element("input");
    			t11 = space();
    			div4 = element("div");
    			a0 = element("a");
    			a0.textContent = "Search";
    			t13 = space();
    			div7 = element("div");
    			span = element("span");
    			span.textContent = "Don't know who you are looking for?";
    			t15 = space();
    			div6 = element("div");
    			a1 = element("a");
    			a1.textContent = "Search everyone";
    			t17 = space();
    			div9 = element("div");
    			button0 = element("button");
    			button0.textContent = "Signup";
    			t19 = space();
    			button1 = element("button");
    			button1.textContent = "Login";
    			t21 = space();
    			div10 = element("div");
    			div10.textContent = "by NoloNolo+™";
    			attr_dev(meta0, "content", "text/html;charset=utf-8");
    			attr_dev(meta0, "http-equiv", "Content-Type");
    			attr_dev(meta0, "class", "svelte-371579");
    			add_location(meta0, file, 7, 1, 81);
    			attr_dev(meta1, "content", "utf-8");
    			attr_dev(meta1, "http-equiv", "encoding");
    			attr_dev(meta1, "class", "svelte-371579");
    			add_location(meta1, file, 8, 0, 148);
    			attr_dev(link0, "rel", "shortcut icon");
    			attr_dev(link0, "href", "#");
    			attr_dev(link0, "class", "svelte-371579");
    			add_location(link0, file, 10, 1, 195);
    			attr_dev(link1, "rel", "preconnect");
    			attr_dev(link1, "href", "https://fonts.googleapis.com");
    			attr_dev(link1, "class", "svelte-371579");
    			add_location(link1, file, 11, 1, 234);
    			attr_dev(link2, "rel", "preconnect");
    			attr_dev(link2, "href", "https://fonts.gstatic.com");
    			attr_dev(link2, "crossorigin", "");
    			attr_dev(link2, "class", "svelte-371579");
    			add_location(link2, file, 12, 0, 294);
    			attr_dev(link3, "href", "https://fonts.googleapis.com/css2?family=Lobster&display=swap");
    			attr_dev(link3, "rel", "stylesheet");
    			attr_dev(link3, "class", "svelte-371579");
    			add_location(link3, file, 13, 0, 363);
    			attr_dev(div0, "id", "titolo");
    			attr_dev(div0, "class", "svelte-371579");
    			add_location(div0, file, 225, 3, 4273);
    			attr_dev(br, "class", "svelte-371579");
    			add_location(br, file, 227, 11, 4378);
    			attr_dev(div1, "id", "benvenuto");
    			set_style(div1, "font-weight", "700");
    			attr_dev(div1, "class", "svelte-371579");
    			add_location(div1, file, 226, 3, 4320);
    			attr_dev(label0, "class", "search-label svelte-371579");
    			set_style(label0, "font-size", "1.9vw");
    			add_location(label0, file, 234, 8, 4577);
    			attr_dev(input0, "class", "search-input svelte-371579");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "autocomplete", "on");
    			attr_dev(input0, "placeholder", "Philosopher's name");
    			attr_dev(input0, "name", "query");
    			add_location(input0, file, 235, 8, 4673);
    			attr_dev(div2, "class", "search-element svelte-371579");
    			set_style(div2, "border-top-left-radius", "5px");
    			set_style(div2, "border-bottom-left-radius", "5px");
    			add_location(div2, file, 232, 6, 4467);
    			attr_dev(label1, "class", "search-label svelte-371579");
    			set_style(label1, "font-size", "1.9vw");
    			add_location(label1, file, 238, 8, 4834);
    			attr_dev(input1, "class", "search-input svelte-371579");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "placeholder", "State");
    			attr_dev(input1, "autocomplete", "on");
    			attr_dev(input1, "name", "location");
    			add_location(input1, file, 239, 8, 4926);
    			attr_dev(div3, "class", "search-element svelte-371579");
    			add_location(div3, file, 237, 6, 4797);
    			attr_dev(a0, "href", "#");
    			attr_dev(a0, "type", "submit");
    			set_style(a0, "color", "white");
    			attr_dev(a0, "class", "svelte-371579");
    			add_location(a0, file, 242, 8, 5074);
    			attr_dev(div4, "class", "search-button svelte-371579");
    			add_location(div4, file, 241, 3, 5037);
    			attr_dev(div5, "class", "product-search svelte-371579");
    			add_location(div5, file, 231, 2, 4432);
    			attr_dev(form, "action", "");
    			attr_dev(form, "method", "get");
    			attr_dev(form, "class", "svelte-371579");
    			add_location(form, file, 230, 3, 4400);
    			set_style(span, "font-weight", "700");
    			attr_dev(span, "class", "svelte-371579");
    			add_location(span, file, 247, 3, 5181);
    			attr_dev(a1, "type", "submit");
    			set_style(a1, "color", "white");
    			attr_dev(a1, "class", "svelte-371579");
    			add_location(a1, file, 249, 8, 5314);
    			attr_dev(div6, "class", "search-button svelte-371579");
    			attr_dev(div6, "id", "finalbutton");
    			add_location(div6, file, 248, 3, 5260);
    			attr_dev(div7, "id", "basso");
    			attr_dev(div7, "class", "svelte-371579");
    			add_location(div7, file, 246, 3, 5161);
    			attr_dev(div8, "class", "centro svelte-371579");
    			add_location(div8, file, 224, 2, 4249);
    			attr_dev(button0, "class", "signup-button svelte-371579");
    			add_location(button0, file, 254, 2, 5429);
    			attr_dev(button1, "class", "login-button svelte-371579");
    			add_location(button1, file, 255, 2, 5477);
    			attr_dev(div9, "class", "button-div svelte-371579");
    			add_location(div9, file, 253, 1, 5402);
    			attr_dev(div10, "class", "signature-div svelte-371579");
    			add_location(div10, file, 257, 1, 5530);
    			attr_dev(main, "class", "svelte-371579");
    			add_location(main, file, 223, 0, 4240);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, meta0);
    			append_dev(document.head, meta1);
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			append_dev(document.head, link2);
    			append_dev(document.head, link3);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div8);
    			append_dev(div8, div0);
    			append_dev(div8, t3);
    			append_dev(div8, div1);
    			append_dev(div1, t4);
    			append_dev(div1, br);
    			append_dev(div8, t5);
    			append_dev(div8, form);
    			append_dev(form, div5);
    			append_dev(div5, div2);
    			append_dev(div2, label0);
    			append_dev(div2, t7);
    			append_dev(div2, input0);
    			append_dev(div5, t8);
    			append_dev(div5, div3);
    			append_dev(div3, label1);
    			append_dev(div3, t10);
    			append_dev(div3, input1);
    			append_dev(div5, t11);
    			append_dev(div5, div4);
    			append_dev(div4, a0);
    			append_dev(div8, t13);
    			append_dev(div8, div7);
    			append_dev(div7, span);
    			append_dev(div7, t15);
    			append_dev(div7, div6);
    			append_dev(div6, a1);
    			append_dev(main, t17);
    			append_dev(main, div9);
    			append_dev(div9, button0);
    			append_dev(div9, t19);
    			append_dev(div9, button1);
    			append_dev(main, t21);
    			append_dev(main, div10);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(meta0);
    			detach_dev(meta1);
    			detach_dev(link0);
    			detach_dev(link1);
    			detach_dev(link2);
    			detach_dev(link3);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { name } = $$props;
    	const writable_props = ['name'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({ name });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { name: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var app = new App({
    	target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
