<script>
import { userID } from '../../stores.js';
import { onMount } from 'svelte';
import jQuery from 'jquery';
import CardNolo from './CardNolo.svelte';

let id;
let noleggi = [];

userID.subscribe(value => {
	id = value;
});

let nolotime = "present";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
/*
onMount(() => {
	jQuery( document ).ready(async function() {
		await getPersonalNolos(()=>{console.log(noleggi);});
	});
});

async function getPersonalNolos(){
  let searchurl = "//site202123.tw.cs.unibo.it/nolos";
  searchurl += '?client_id=' + id;

  await jQuery.get(searchurl, function(data){
   noleggi = data;
 	});
	console.log(noleggi.length);
 	await (async() => {
	 for (let n in noleggi){
	 noleggi[n].filinfo = await getFilNameById(noleggi[n].product_id);
	}
})();
console.log(noleggi);
}

async function getFilNameById(id){
		console.log("getFilNameById");
    let searchurl = "//site202123.tw.cs.unibo.it/products?id=" + id ;
    await jQuery.get(searchurl, function(data){
			let FiloInfo = {};
      FiloInfo.name = data[0] && data[0].name;
      FiloInfo.img = data[0] && data[0].img;
      console.log(FiloInfo);
  		return FiloInfo;
	  });

}
*/
onMount(() => {
	jQuery(document).ready(
		async function() {
			await getPersonalNolos();
		}
	);
});

async function getPersonalNolos(){
  let searchurl = "//site202123.tw.cs.unibo.it/nolos";
  searchurl += '?client_id=' + id;

	await jQuery.get(searchurl, function(data){
		noleggi = data;
	});
	console.log(noleggi);

}

async function getFilNameById(id){

	//console.log("getFilNameById");
	let searchurl = "//site202123.tw.cs.unibo.it/products?id=" + id ;
	let data = await jQuery.get(searchurl);
		let FiloInfo = {};
		FiloInfo.name = data[0] && data[0].name;
		FiloInfo.img = data[0] && data[0].img;
		FiloInfo.available_from = data[0] && data[0].nolo_data && data[0].nolo_data.available_from;
		FiloInfo.available_to = data[0] && data[0].nolo_data && data[0].nolo_data.available_to;
	//console.log(FiloInfo);
		return FiloInfo;
	//return {'name':'ue', 'img' : 'ue'};
}

/*
function difSToday(date){
	const mydate = new Date(date);
	const today = new Date();
	const diffTimetoday = today - mydate;
	const diffDaystoday = Math.ceil(diffTimetoday / (1000 * 60 * 60 * 24));
	console.log("difference: "+diffDaystoday);
	//17-17->0
	//17-16->1  start>=0
	//17-18 -> -1 finish<=0
	//17-16 -> 1 finish >0 passato
	return diffDaystoday;

}
*/
async function reload(){
	//console.log('reload');
	await getPersonalNolos();
}
</script>
<div class="personaltab container">
<div class="row">
<button id="nolopresent"  class='col btn btn-outline-info waves-effect' on:click={()=>{nolotime = "present"; reload()}}>Noleggi in corso</button>
<button id="nolofuture"  class='col btn btn-outline-info waves-effect' on:click={()=>{nolotime = "future"; reload()}}>Noleggi previsti</button>
<button id="nolopast"  class='col btn btn-outline-info waves-effect' on:click={()=>{nolotime = "past"; reload()}}>Noleggi conclusi</button>

</div>

{#if (nolotime=="present")}
<h4 class='font-weight-bold text-my mt-4' id="nolo-header">
Noleggi in corso
</h4>
{#each noleggi as noleggio}
		{#if ((noleggio.status=="Iniziato")||(noleggio.status=="In ritardo"))}
			{#await getFilNameById(noleggio.product_id) then value}
    		<CardNolo time={"present"} noleggio={noleggio} filinfo={value}/>
			{/await}
		{/if}
{/each}

{:else if (nolotime=="future")}
<h4 class='font-weight-bold text-my mt-4'>
Noleggi previsti
</h4>
{#each noleggi as noleggio}
		{#if (noleggio.status=="Prenotato")}
			{#await getFilNameById(noleggio.product_id) then value}
				<CardNolo time={"future"} noleggio={noleggio} filinfo={value}/>
			{/await}
		{/if}
{/each}

{:else if (nolotime=="past")}
<h4 class='font-weight-bold text-my mt-4'>
Noleggi conclusi
</h4>
{#each noleggi as noleggio}
		{#if (noleggio.status=="Concluso")}
			{#await getFilNameById(noleggio.product_id) then value}
				<CardNolo time={"past"} noleggio={noleggio} filinfo={value}/>
				{/await}
		{/if}
{/each}


{/if}

</div>
