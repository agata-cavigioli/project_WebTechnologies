<script>
	import Dati from "./Tab/Dati.svelte";
	import Noleggi from "./Tab/Noleggi.svelte";
	import Contatti from "./Tab/Contatti.svelte";
  import Tabs from "./Tab/Tabs.svelte";

  let items = [
    { label: "Dati Profilo",
		 value: 1,
		 component: Dati
		},
    { label: "I miei noleggi",
		 value: 2,
		 component: Noleggi
		},
    { label: "Contatti",
		 value: 3,
		 component: Contatti
		}
  ];
</script>

<h1 class='text-center p-3'>
Area Personale
</h1>

<Tabs {items} />
