<script>
import { onMount } from 'svelte';
import jQ from 'jquery';

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
    {
        "Philosophers": "Aaron David Gordon",
        "Born": "1856",
        "Birth place": "Ukraine",
        "Died": "1922",
        "Place of Death": "Palestine",
        "Subjects Of Study": "Agriculture, Zionism",
        "Cost":"250.99",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/14/2022",
        "enddate": "02/18/2022"
    },
    {
        "Philosophers": "Abraham Joshua Heschel",
        "Cost":"250.99",
        "Born": "1907",
        "Birth place": "Poland",
        "Died": "1972",
        "Place of Death": "York",
        "Subjects Of Study": "Judaism, Philosophy Of Religion",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/14/2022",
        "enddate": "02/18/2022"
    },
    {
        "Philosophers": "Albert of Saxony",
        "Cost":"250.99",
        "Born": "1316",
        "Birth place": "Germany",
        "Died": "1390",
        "Place of Death": "Germany",
        "Subjects Of Study": "Gravity",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/14/2022",
        "enddate": "02/18/2022"
    },
    {
        "Philosophers": "Alessandro Achillini",
        "Cost":"250.99",
        "Born": "1463",
        "Birth place": "Italy",
        "Died": "1512",
        "Place of Death": "Bologna",
        "Subjects Of Study": "William Of Ockham",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/14/2022",
        "enddate": "02/18/2022"
    },
    {
        "Philosophers": "Alexander Gottlieb Baumgarten",
        "Cost":"250.99",
        "Born": "1714",
        "Birth place": "Germany",
        "Died": "1762",
        "Place of Death": "Germany",
        "Subjects Of Study": "Aesthetics, Gottfried Wilhelm Leibniz, Feeling, Christian, Baron Von Wolff",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/14/2022",
        "enddate": "02/18/2022"
    },
    {
        "Philosophers": "Alexius Meinong",
        "Cost":"250.99",
        "Born": "1853",
        "Birth place": "Ukraine",
        "Died": "1920",
        "Place of Death": "Austria",
        "Subjects Of Study": "Objectivism, Intentionality",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/14/2022",
        "enddate": "02/18/2022"
    },
    {
        "Philosophers": "Alfred Firmin Loisy",
        "Cost":"250.99",
        "Born": "1857",
        "Birth place": "France",
        "Died": "1940",
        "Place of Death": "France",
        "Subjects Of Study": "Philosophy Of Religion, Modernism",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/14/2022",
        "enddate": "02/18/2022"
    },
    {
        "Philosophers": "Alfred Korzybski",
        "Cost":"250.99",
        "Born": "1879",
        "Birth place": "Poland",
        "Died": "1950",
        "Place of Death": "Connecticut",
        "Subjects Of Study": "Semantics, General Semantics",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/14/2022",
        "enddate": "02/18/2022"
    },
    {
        "Philosophers": "Alfred North Whitehead",
        "Cost":"250.99",
        "Born": "1861",
        "Birth place": "England",
        "Died": "1947",
        "Place of Death": "Massachusetts",
        "Subjects Of Study": "Education, Mathematics, Philosophy Of Science, Formal Logic, Materialism",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/14/2022",
        "enddate": "02/18/2022"
    },
    {
        "Philosophers": "Allan Bloom",
        "Cost":"250.99",
        "Born": "1930",
        "Birth place": "Indiana",
        "Died": "1992",
        "Place of Death": "Illinois",
        "Subjects Of Study": "Higher Education",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/01/2022",
        "enddate": "02/10/2022"
    },
    {
        "Philosophers": "Anaxagoras",
        "Cost":"250.99",
        "Born": "500",
        "Birth place": "Clazomenae",
        "Died": "428",
        "Place of Death": "Lampsacus",
        "Subjects Of Study": "Eclipse, Cosmology, Nous",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/11/2022",
        "enddate": "02/13/2022"
    },
    {
        "Philosophers": "Anicius Manlius Severinus Boethius",
        "Cost":"250.99",
        "Born": "475",
        "Birth place": "Italy",
        "Died": "524",
        "Place of Death": "Italy",
        "Subjects Of Study": "Aristotelianism, Universal, Trinity, Porphyry, Free Will",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/13/2022",
        "enddate": "02/15/2022"
    },
    {
        "Philosophers": "Antonio Labriola",
        "Cost":"250.99",
        "Born": "1843",
        "Birth place": "Sicilies",
        "Died": "1904",
        "Place of Death": "Italy",
        "Subjects Of Study": "Socialism, Historical Materialism",
				"image": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
        "startdate": "02/12/2022",
        "enddate": "02/14/2022"
    }
]
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
    {#if ((noleggio.startdate<=today)&&(noleggio.enddate>=today))}
		<div class="card flex-row row mt-2">
				<div class="col-3 m-2">
						<div class="card-img-actions"> <img src={noleggio.image} class="card-img img-fluid" width="96" height="350" alt=""> </div>
				</div>
				<div class="col-6 m-2">
						<div class="mb-2">
								<h6 class="font-weight-semibold mb-2">
									<div class="text-default mb-2" data-abc="true">
									{noleggio.Philosophers}
									</div>
								</h6>
								<div class="text-muted" data-abc="true">
								{noleggio.Sub}
								</div>
						</div>
						<div class="text-muted mb-3">
						{noleggio.Born}
						{noleggio.Birthp},
						{noleggio.Died}
						{noleggio.Deathp}
						</div>
						<h3 class="mb-0 font-weight-semibold">&euro; {noleggio.Cost} al giorno</h3>
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

{:else if ((nolotime=="future"))}
<h4 class='font-weight-bold text-info mt-4'>
Noleggi previsti
</h4>
{#each noleggi as noleggio}
    {#if (noleggio.startdate>today)}
		<div class="card flex-row row mt-2">
				<div class="col-3 m-2">
						<div class="card-img-actions"> <img src={noleggio.image} class="card-img img-fluid" width="96" height="350" alt=""> </div>
				</div>
				<div class="col-6 m-2">
						<div class="mb-2">
								<h6 class="font-weight-semibold mb-2">
									<div class="text-default mb-2" data-abc="true">
									{noleggio.Philosophers}
									</div>
								</h6>
								<div class="text-muted" data-abc="true">
								{noleggio.Sub}
								</div>
						</div>
						<div class="text-muted mb-3">
						{noleggio.Born}
						{noleggio.Birthp},
						{noleggio.Died}
						{noleggio.Deathp}
						</div>
						<h3 class="mb-0 font-weight-semibold">&euro; {noleggio.Cost} al giorno</h3>
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
    {#if (noleggio.enddate<today)}
		<div class="card flex-row row mt-2">
				<div class="col-3 m-2">
						<div class="card-img-actions"> <img src={noleggio.image} class="card-img img-fluid" width="96" height="350" alt=""> </div>
				</div>
				<div class="col-6 m-2">
						<div class="mb-2">
								<h6 class="font-weight-semibold mb-2">
									<div class="text-default mb-2" data-abc="true">
									{noleggio.Philosophers}
									</div>
								</h6>
								<div class="text-muted" data-abc="true">
								{noleggio.Sub}
								</div>
						</div>
						<div class="text-muted mb-3">
						{noleggio.Born}
						{noleggio.Birthp},
						{noleggio.Died}
						{noleggio.Deathp}
						</div>
						<h3 class="mb-0 font-weight-semibold">&euro; {noleggio.Cost} al giorno</h3>
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
