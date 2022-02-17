<script>
import { onMount } from 'svelte';
import jQuery from 'jquery';

export let time;
export let noleggio;
let image = "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png";
let FiloName = "Gino";

onMount(async () => {
    await getFilNameById();
})

async function getFilNameById(){
    let searchurl = "http://site202123.tw.cs.unibo.it/products"+'?id=' + noleggio.product_id ;
    let data = await jQuery.get(searchurl);
    FiloName = data[0].name;
    console.log(FiloName);
    return true;
}

function calcolocosto(noleggio){
	const date1 = new Date(noleggio.date_from);
	const date2 = new Date(noleggio.date_to);
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

	return (diffDays*noleggio.nolo_data.daily_cost);
}

function calcolofinale(noleggio){
	const date1 = new Date(noleggio.date_from);
	const date2 = new Date(noleggio.date_to);
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

	return ((diffDays*noleggio.nolo_data.daily_cost)-((diffDays*noleggio.nolo_data.daily_cost*noleggio.nolo_data.discount)/100)+noleggio.nolo_data.other_fees);
}

function downloadBill(){

}

async function deleteNolo(){
	let myurl = "http://site202123.tw.cs.unibo.it/nolos?id=" + noleggio.id;
  await jQuery.ajax({
         url: myurl ,
         type: 'DELETE'
     });
	document.getElementById('cardnolo{noleggio.id}').innerHTML=("Noleggio eliminato");
}

function modifyNolo(){
  let divmio = 'dateNolo' + noleggio.id;
  console.log(divmio);
    document.getElementById(divmio).innerHTML = "Periodo di noleggio: <div class='input-group mb-2 mr-sm-2'> \
      <div class='input-group-prepend'><label for='datefrom' class='input-group-text customcol-smor'>Da:</label> \
    </div>  <input class='input-group date form-control' type='date' id='datefrom' value='" + noleggio.date_from + "'> \
    <label for='dateto' class='input-group-text rounded-0 border-left-0 border-right-0 customcol-smor'>a:</label>  \
        <input type='date' class='input-group date form-control'  id='dateto' value='"+ noleggio.date_to + "'> </div>";

  //cambia pulsante conferma
}
</script>

<div id="cardnolo{noleggio.id}" class="card flex-row row mt-2">
    <div class="col-3 m-2">
        <div class="card-img-actions"> <img src={image} class="card-img img-fluid" width="96" height="350" alt=""> </div>
    </div>

    <div class="col-lg-6 m-2">

        <div class="mb-2">
            <h6 class="font-weight-semibold mb-2">
              <div class="text-default mb-2" data-abc="true">
              {FiloName}
              </div>
            </h6>
            <div id="dateNolo{noleggio.id}" class="text-muted" data-abc="true">
            Periodo di noleggio: {noleggio.date_from} - {noleggio.date_to}
            </div>
            <div class="text-my" data-abc="true">
            Stato del noleggio: {noleggio.status}
            </div>
        </div>
       <div class="text-muted mb-3">
        Costo giornaliero: &euro;{noleggio.nolo_data.daily_cost}
        <br>
        Sconti applicati: {noleggio.nolo_data.discount} &#37;
        <br>
        Costi aggiuntivi: {noleggio.nolo_data.other_fees} &euro;
        </div>

        <h3 class="mb-0 font-weight-semibold">Costo base: &euro;{calcolocosto(noleggio)}</h3>
        <h3 class="mb-0 text-danger font-weight-semibold">Prezzo finale: &euro;{calcolofinale(noleggio)}</h3>

        <div class='mybooking'>
        </div>
    </div>
    {#if ((time=="future"))}
    <div class="col-lg-2">
      <div class="container">
          <div class="row">
            <div class="col">
              <p id="nolofattura" type='button' class='mt-4 btn btn-outline-info waves-effect' on:click={modifyNolo}>Modifica</p>
            </div>

            <div class="col">
              <p id="nolofattura" type='button' class='row-lg mt-4 btn btn-outline-warning waves-effect' on:click={deleteNolo}>Elimina</p>
            </div>
          </div>
        </div>
    </div>
    {:else if ((time=="past"))}
        <div class="col-lg-2 container">
        <div class="container text-center">
          <p id="nolofattura" type='button' class='row-lg mt-4 btn btn-outline-warning waves-effect' on:click={downloadBill}>Scarica fattura</p>
        </div>
        </div>
    {/if}
</div>
