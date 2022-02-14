<script>
import { onMount } from 'svelte';
import jQuery from 'jquery';

let nolotime = "present";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

onMount(() => {
	jQuery( document ).ready(function() {

	});
});
let image = "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png";
let noleggi = [
	{ 	"product_id" : "present",
         "client_id" : 0,
         "date_from" : "01/01/2022",
         "date_to" : "04/04/2022",
         "status" : "booked",
         "nolo_data" : {
					 	"discount" : 10,
          	"daily_cost" : 213,
             "other_fees" : 0,
             "info" : "" }
     },
		 { 	"product_id" : "past",
	          "client_id" : 0,
	          "date_from" : "01/01/2022",
	          "date_to" : "02/02/2022",
	          "status" : "booked",
	          "nolo_data" : {
	 					 	"discount" : 10,
	           	"daily_cost" : 213,
	              "other_fees" : +10,
	              "info" : "" }
	      },

				{ 	"product_id" : "future",
			         "client_id" : 0,
			         "date_from" : "05/05/2022",
			         "date_to" : "08/08/2022",
			         "status" : "booked",
			         "nolo_data" : {
								 	"discount" : 10,
			          	"daily_cost" : 213,
			             "other_fees" : -10,
			             "info" : "" }
			     }

]

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

</script>
<div class="personaltab container">
<div class="row">
<p id="nolopresent" type='button' class='col btn btn-outline-info waves-effect' on:click={()=>(nolotime = "present")}>Noleggi in corso</p>
<p id="nolofuture" type='button' class='col btn btn-outline-info waves-effect' on:click={()=>(nolotime = "future")}>Noleggi previsti</p>
<p id="nolopast" type='button' class='col btn btn-outline-info waves-effect' on:click={()=>(nolotime = "past")}>Noleggi conclusi</p>

</div>

{#if (nolotime=="present")}
<h4 class='font-weight-bold text-info mt-4'>
Noleggi in corso
</h4>
{#each noleggi as noleggio}
    {#if ((noleggio.date_from<=today)&&(noleggio.date_to>=today))}
		<div class="card flex-row row mt-2">
				<div class="col-3 m-2">
						<div class="card-img-actions"> <img src={image} class="card-img img-fluid" width="96" height="350" alt=""> </div>
				</div>
				<div class="col-6 m-2">
						<div class="mb-2">
								<h6 class="font-weight-semibold mb-2">
									<div class="text-default mb-2" data-abc="true">
									{noleggio.product_id}
									</div>
								</h6>
								<div class="text-muted" data-abc="true">
								Periodo di noleggio: {noleggio.date_from} - {noleggio.date_to}
								</div>
								<div class="text-info" data-abc="true">
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
						<h3 class="mb-0 font-weight-semibold">Costo del noleggio: &euro;{calcolocosto(noleggio)}</h3>
						<h3 class="mb-0 text-danger font-weight-semibold">Prezzo finale: &euro;{calcolofinale(noleggio)}</h3>

						<div class='mybooking'>
						</div>
				</div>
        <div class="col-lg-2">
        <div class="container">


        </div>
        </div>
		</div>
    {/if}

{/each}

{:else if ((nolotime=="future"))}
<h4 class='font-weight-bold text-info mt-4'>
Noleggi previsti
</h4>
{#each noleggi as noleggio}
    {#if (noleggio.date_from>today)}
		<div class="card flex-row row mt-2">
				<div class="col-3 m-2">
						<div class="card-img-actions"> <img src={image} class="card-img img-fluid" width="96" height="350" alt=""> </div>
				</div>
				<div class="col-6 m-2">
						<div class="mb-2">
								<h6 class="font-weight-semibold mb-2">
									<div class="text-default mb-2" data-abc="true">
									{noleggio.product_id}
									</div>
								</h6>
								<div class="text-muted" data-abc="true">
								Periodo di noleggio: {noleggio.date_from} - {noleggio.date_to}
								</div>
								<div class="text-info" data-abc="true">
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
						<h3 class="mb-0 font-weight-semibold">Costo del noleggio: &euro;{calcolocosto(noleggio)}</h3>
						<h3 class="mb-0 text-danger font-weight-semibold">Prezzo finale: &euro;{calcolofinale(noleggio)}</h3>

						<div class='mybooking'>
						</div>
				</div>
        <div class="col-lg-2">
        <div class="container">

        <div class="row">
          <div class="col">
            <p id="nolofattura" type='button' class='mt-4 btn btn-outline-info waves-effect' on:click={()=>(nolotime = "past")}>Modifica</p>
          </div>

          <div class="col">
            <p id="nolofattura" type='button' class='row-lg mt-4 btn btn-outline-warning waves-effect' on:click={()=>(nolotime = "past")}>Elimina</p>
          </div>

        </div>

        </div>
        </div>
		</div>
    {/if}

{/each}

{:else if ((nolotime=="past"))}
<h4 class='font-weight-bold text-info mt-4'>
Noleggi conclusi
</h4>
{#each noleggi as noleggio}
    {#if (noleggio.date_to<today)}
		<div class="card flex-row row mt-2">
				<div class="col-3 m-2">
						<div class="card-img-actions"> <img src={image} class="card-img img-fluid" width="96" height="350" alt=""> </div>
				</div>
				<div class="col-6 m-2">
						<div class="mb-2">
								<h6 class="font-weight-semibold mb-2">
									<div class="text-default mb-2" data-abc="true">
									{noleggio.product_id}
									</div>
								</h6>
								<div class="text-muted" data-abc="true">
								Periodo di noleggio: {noleggio.date_from} - {noleggio.date_to}
								</div>
								<div class="text-info" data-abc="true">
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
						<h3 class="mb-0 font-weight-semibold">Costo del noleggio: &euro;{calcolocosto(noleggio)}</h3>
						<h3 class="mb-0 text-danger font-weight-semibold">Prezzo finale: &euro;{calcolofinale(noleggio)}</h3>

						<div class='mybooking'>
						</div>
				</div>
        <div class="col-lg-2 container">
        <div class="container text-center">
          <p id="nolofattura" type='button' class='row-lg mt-4 btn btn-outline-warning waves-effect' on:click={()=>(nolotime = "past")}>Scarica fattura</p>
        </div>
        </div>
		</div>
    {/if}

{/each}

{/if}

</div>
