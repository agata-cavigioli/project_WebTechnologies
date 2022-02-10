<script>
import { getContext } from 'svelte';
  import Prenotazione from './Prenotazione.svelte';
  const { open } = getContext('simple-modal');
  export let philosopher;

  

  const prenota = () => {
    document.getElementById('home').classList.add("overflow-hidden");
    open(Prenotazione, { filo: philosopher, message: "It's a modal!" });
  }


</script>

<p type="button" class="btn btn-outline-warning waves-effect mt-2" on:click={() => prenota()}>Prenota</p>
