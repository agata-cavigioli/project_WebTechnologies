<script>
import { userID } from '../../stores.js';
import { onMount } from 'svelte';
import jQuery from 'jquery';
import CardNolo from './CardNolo.svelte';

let id;

userID.subscribe(value => {
	id = value;
});

let nolotime = "present";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

onMount(() => {
	jQuery( document ).ready(async function() {
		let done = await getPersonalNolos();
	});
});

let image = "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png";
let noleggi = "";

function getPersonalNolos(){
  let searchurl = "http://site202123.tw.cs.unibo.it/nolos";
  searchurl += '?client_id=' + id + '';
  console.log(searchurl);

  jQuery.get(searchurl, async function(data){
   noleggi = data;
  })
}

</script>
<div class="personaltab container">
<div class="row">
<button id="nolopresent"  class='col btn btn-outline-info waves-effect' on:click={()=>(nolotime = "present")}>Noleggi in corso</button>
<button id="nolofuture"  class='col btn btn-outline-info waves-effect' on:click={()=>(nolotime = "future")}>Noleggi previsti</button>
<button id="nolopast"  class='col btn btn-outline-info waves-effect' on:click={()=>(nolotime = "past")}>Noleggi conclusi</button>

</div>

{#if (nolotime=="present")}
<h4 class='font-weight-bold text-my mt-4' id="nolo-header">
Noleggi in corso
</h4>
{#each noleggi as noleggio}
		{#if ((noleggio.date_from<=today)&&(noleggio.date_to>=today))}
    <CardNolo time={"present"} noleggio={noleggio}/>
		{/if}
{/each}

{:else if ((nolotime=="future"))}
<h4 class='font-weight-bold text-my mt-4'>
Noleggi previsti
</h4>
{#each noleggi as noleggio}
		{#if (noleggio.date_from>today)}
		<CardNolo time={"future"} noleggio={noleggio}/>
		{/if}
{/each}

{:else if ((nolotime=="past"))}
<h4 class='font-weight-bold text-my mt-4'>
Noleggi conclusi
</h4>
{#each noleggi as noleggio}
		{#if (noleggio.date_to<today)}
		<CardNolo time={"past"} noleggio={noleggio}/>
		{/if}
{/each}


{/if}

</div>
