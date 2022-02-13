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
		console.log(today);

	});
});

let noleggi = [
	{ 	"product_id" : 0,
         "client_id" : 0,
         "date_from" : "12/12/2021",
         "date_to" : "1/1/2022",
         "status" : "booked",
         "nolo_data" : {
             "other_fees" : 0,
             "info" : "" }
     },
    {
        "name": "Aaron David Gordon",
        "Cost":"250.99",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/14/2022",
        "date_to": "02/18/2022"
    },
    {
        "name": "Abraham Joshua Heschel",
        "Cost":"250.99",
        "birth": "1907",
        "birth_p": "Poland",
        "death": "1972",
        "death_p": "York",
        "subjects": "Judaism, Philosophy Of Religion",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/14/2022",
        "date_to": "02/18/2022"
    },
    {
        "name": "Albert of Saxony",
        "Cost":"250.99",
        "birth": "1316",
        "birth_p": "Germany",
        "death": "1390",
        "death_p": "Germany",
        "subjects": "Gravity",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/14/2022",
        "date_to": "02/18/2022"
    },
    {
        "name": "Alessandro Achillini",
        "Cost":"250.99",
        "birth": "1463",
        "birth_p": "Italy",
        "death": "1512",
        "death_p": "Bologna",
        "subjects": "William Of Ockham",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/14/2022",
        "date_to": "02/18/2022"
    },
    {
        "name": "Alexander Gottlieb Baumgarten",
        "Cost":"250.99",
        "birth": "1714",
        "birth_p": "Germany",
        "death": "1762",
        "death_p": "Germany",
        "subjects": "Aesthetics, Gottfried Wilhelm Leibniz, Feeling, Christian, Baron Von Wolff",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/14/2022",
        "date_to": "02/18/2022"
    },
    {
        "name": "Alexius Meinong",
        "Cost":"250.99",
        "birth": "1853",
        "birth_p": "Ukraine",
        "death": "1920",
        "death_p": "Austria",
        "subjects": "Objectivism, Intentionality",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/14/2022",
        "date_to": "02/18/2022"
    },
    {
        "name": "Alfred Firmin Loisy",
        "Cost":"250.99",
        "birth": "1857",
        "birth_p": "France",
        "death": "1940",
        "death_p": "France",
        "subjects": "Philosophy Of Religion, Modernism",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/14/2022",
        "date_to": "02/18/2022"
    },
    {
        "name": "Alfred Korzybski",
        "Cost":"250.99",
        "birth": "1879",
        "birth_p": "Poland",
        "death": "1950",
        "death_p": "Connecticut",
        "subjects": "Semantics, General Semantics",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/14/2022",
        "date_to": "02/18/2022"
    },
    {
        "name": "Alfred North Whitehead",
        "Cost":"250.99",
        "birth": "1861",
        "birth_p": "England",
        "death": "1947",
        "death_p": "Massachusetts",
        "subjects": "Education, Mathematics, Philosophy Of Science, Formal Logic, Materialism",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/14/2022",
        "date_to": "02/18/2022"
    },
    {
        "name": "Allan Bloom",
        "Cost":"250.99",
        "birth": "1930",
        "birth_p": "Indiana",
        "death": "1992",
        "death_p": "Illinois",
        "subjects": "Higher Education",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/01/2022",
        "date_to": "02/10/2022"
    },
    {
        "name": "Anaxagoras",
        "Cost":"250.99",
        "birth": "500",
        "birth_p": "Clazomenae",
        "death": "428",
        "death_p": "Lampsacus",
        "subjects": "Eclipse, Cosmology, Nous",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/11/2022",
        "date_to": "02/13/2022"
    },
    {
        "name": "Anicius Manlius Severinus Boethius",
        "Cost":"250.99",
        "birth": "475",
        "birth_p": "Italy",
        "death": "524",
        "death_p": "Italy",
        "subjects": "Aristotelianism, Universal, Trinity, Porphyry, Free Will",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/13/2022",
        "date_to": "02/15/2022"
    },
    {
        "name": "Antonio Labriola",
        "Cost":"250.99",
        "birth": "1843",
        "birth_p": "Sicilies",
        "death": "1904",
        "death_p": "Italy",
        "subjects": "Socialism, Historical Materialism",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "date_from": "02/12/2022",
        "date_to": "02/14/2022"
    }
]

function calcolocosto(noleggio){
	const date1 = new Date(noleggio.date_from);
	const date2 = new Date(noleggio.date_to);
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

	//let start = noleggio.date_from;
	//console.log(start);
	//let end = noleggio.date_to;
	//console.log(end);
	console.log(diffDays);
	return (diffDays*noleggio.Cost);
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
						<div class="card-img-actions"> <img src={noleggio.image} class="card-img img-fluid" width="96" height="350" alt=""> </div>
				</div>
				<div class="col-6 m-2">
						<div class="mb-2">
								<h6 class="font-weight-semibold mb-2">
									<div class="text-default mb-2" data-abc="true">
									{noleggio.name}
									</div>
								</h6>
								<div class="text-muted" data-abc="true">
								Periodo di noleggio: {noleggio.date_from} - {noleggio.date_to}
								</div>
						</div>
						<div class="text-muted mb-3">
						Costo giornaliero: {noleggio.Cost}
						<br>
						Sconti applicati:
						</div>
						<h3 class="mb-0 font-weight-semibold">Costo del noleggio: {calcolocosto(noleggio)}</h3>
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
            <p id="nolofattura" type='button' class='row-lg mt-4 btn btn-outline-warning waves-effect' on:click={()=>(nolotime = "past")}>Concludi il noleggio</p>
          </div>

        </div>

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
						<div class="card-img-actions"> <img src={noleggio.image} class="card-img img-fluid" width="96" height="350" alt=""> </div>
				</div>
				<div class="col-6 m-2">
						<div class="mb-2">
								<h6 class="font-weight-semibold mb-2">
									<div class="text-default mb-2" data-abc="true">
									{noleggio.name}
									</div>
								</h6>
								<div class="text-muted" data-abc="true">
								Periodo di noleggio: {noleggio.date_from} - {noleggio.date_to}
								</div>
						</div>
						<div class="text-muted mb-3">
						Costo giornaliero: {noleggio.Cost}
						<br>
						Sconti applicati:
						<br>
						Luogo di noleggio:
						</div>
						<h3 class="mb-0 font-weight-semibold">Costo del noleggio: {(noleggio.date_from-noleggio.date_to +1)*noleggio.Cost} al giorno</h3>
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
						<div class="card-img-actions"> <img src={noleggio.image} class="card-img img-fluid" width="96" height="350" alt=""> </div>
				</div>
				<div class="col-6 m-2">
						<div class="mb-2">
								<h6 class="font-weight-semibold mb-2">
									<div class="text-default mb-2" data-abc="true">
									{noleggio.name}
									</div>
								</h6>
								<div class="text-muted" data-abc="true">
								Periodo di noleggio: {noleggio.date_from} - {noleggio.date_to}
								</div>
						</div>
						<div class="text-muted mb-3">
						Costo giornaliero: {noleggio.Cost}
						<br>
						Sconti applicati:
						<br>
						Luogo di noleggio:
						</div>
						<h3 class="mb-0 font-weight-semibold">Costo del noleggio: {(noleggio.date_from-noleggio.date_to +1)*noleggio.Cost} al giorno</h3>
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
