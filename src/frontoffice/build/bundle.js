var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function s(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function r(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function i(){return t=" ",document.createTextNode(t);var t}function d(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}let f;function h(t){f=t}const b=[],p=[],v=[],m=[],g=Promise.resolve();let x=!1;function y(t){v.push(t)}let $=!1;const z=new Set;function _(){if(!$){$=!0;do{for(let t=0;t<b.length;t+=1){const e=b[t];h(e),k(e.$$)}for(h(null),b.length=0;p.length;)p.pop()();for(let t=0;t<v.length;t+=1){const e=v[t];z.has(e)||(z.add(e),e())}v.length=0}while(b.length);for(;m.length;)m.pop()();x=!1,$=!1,z.clear()}}function k(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(y)}}const w=new Set;function E(t,e){-1===t.$$.dirty[0]&&(b.push(t),x||(x=!0,g.then(_)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function S(a,l,c,u,i,d,b,p=[-1]){const v=f;h(a);const m=a.$$={fragment:null,ctx:null,props:d,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l.context||(v?v.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:l.target||v.$$.root};b&&b(m.root);let g=!1;if(m.ctx=c?c(a,l.props||{},((t,e,...n)=>{const o=n.length?n[0]:e;return m.ctx&&i(m.ctx[t],m.ctx[t]=o)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](o),g&&E(a,t)),e})):[],m.update(),g=!0,o(m.before_update),m.fragment=!!u&&u(m.ctx),l.target){if(l.hydrate){const t=function(t){return Array.from(t.childNodes)}(l.target);m.fragment&&m.fragment.l(t),t.forEach(r)}else m.fragment&&m.fragment.c();l.intro&&((x=a.$$.fragment)&&x.i&&(w.delete(x),x.i($))),function(t,n,a,l){const{fragment:c,on_mount:r,on_destroy:u,after_update:i}=t.$$;c&&c.m(n,a),l||y((()=>{const n=r.map(e).filter(s);u?u.push(...n):o(n),t.$$.on_mount=[]})),i.forEach(y)}(a,l.target,l.anchor,l.customElement),_()}var x,$;h(v)}function N(e){let n,o,s,a,f,h,b,p,v;return{c(){n=u("meta"),o=u("meta"),s=u("link"),a=u("link"),f=u("link"),h=u("link"),b=i(),p=i(),v=u("main"),v.innerHTML='<div class="centro svelte-bxuazt"><div id="titolo" class="svelte-bxuazt">Dining philosophers</div> \n\t\t\t<div id="benvenuto" style="font-weight: 700;" class="svelte-bxuazt">Welcome!<br class="svelte-bxuazt"/></div> \n\t\t\t<form action="" method="get" class="svelte-bxuazt"><div class="product-search svelte-bxuazt"><div class="search-element svelte-bxuazt" style="border-top-left-radius: 5px; border-bottom-left-radius: 5px;"><label class="search-label svelte-bxuazt" style="font-size: 1.9vw; ">Who are you looking for?</label> \n        <input class="search-input svelte-bxuazt" type="text" autocomplete="on" placeholder="Philosopher&#39;s name" name="query"/></div> \n      <div class="search-element svelte-bxuazt"><label class="search-label svelte-bxuazt" style="font-size: 1.9vw">Where are you looking?</label> \n        <input class="search-input svelte-bxuazt" type="text" placeholder="State" autocomplete="on" name="location"/></div> \n\t\t\t<div class="search-button svelte-bxuazt"><a href="#" type="submit" style="color:white" class="svelte-bxuazt">Search</a></div></div></form> \n\t\t\t<div id="basso" class="svelte-bxuazt"><span style="font-weight: 700;" class="svelte-bxuazt">Don&#39;t know who you are looking for?</span> \n\t\t\t<div class="search-button svelte-bxuazt" id="finalbutton"><a type="submit" style="color:white;" class="svelte-bxuazt">Search everyone</a></div></div></div> \n\t<div class="button-div svelte-bxuazt"><button class="signup-button svelte-bxuazt">Signup</button> \n\t\t<button class="login-button svelte-bxuazt">Login</button></div> \n\t<div class="signature-div svelte-bxuazt">by NoloNolo+™</div>',d(n,"content","text/html;charset=utf-8"),d(n,"http-equiv","Content-Type"),d(n,"class","svelte-bxuazt"),d(o,"content","utf-8"),d(o,"http-equiv","encoding"),d(o,"class","svelte-bxuazt"),d(s,"rel","shortcut icon"),d(s,"href","#"),d(s,"class","svelte-bxuazt"),d(a,"rel","preconnect"),d(a,"href","https://fonts.googleapis.com"),d(a,"class","svelte-bxuazt"),d(f,"rel","preconnect"),d(f,"href","https://fonts.gstatic.com"),d(f,"crossorigin",""),d(f,"class","svelte-bxuazt"),d(h,"href","https://fonts.googleapis.com/css2?family=Lobster&display=swap"),d(h,"rel","stylesheet"),d(h,"class","svelte-bxuazt"),d(v,"class","svelte-bxuazt")},m(t,e){l(document.head,n),l(document.head,o),l(document.head,s),l(document.head,a),l(document.head,f),l(document.head,h),c(t,b,e),c(t,p,e),c(t,v,e)},p:t,i:t,o:t,d(t){r(n),r(o),r(s),r(a),r(f),r(h),t&&r(b),t&&r(p),t&&r(v)}}}function q(t,e,n){let{name:o}=e;return t.$$set=t=>{"name"in t&&n(0,o=t.name)},[o]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),S(this,t,q,N,a,{name:0})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map