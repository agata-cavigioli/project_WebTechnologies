
<script>
  import { Router, Route, Link } from "svelte-routing";
	import Signlog from './Components/Signlog.svelte';
	import Signature from './Components/Signature.svelte';
	import Searchbar from './Components/Searchbar.svelte';
  import Personal from './Components/Personal.svelte';
  import Home from './Components/Home.svelte';
  import { onMount, afterUpdate } from 'svelte';
  import jQuery from 'jquery';
	export let url = "";

	import 'css/global.css';
	import 'css/extra.css';

//let filosofi = "";
let filosofiApp = [{ "name": "Aaron David Gordon",
           "birth": "1856",
           "birth_p": "Ukraine",
           "death": "1922",
           "death_p": "Palestine",
           "subjects": "Agriculture, Zionism",
           "nolo_data": { "cost": 100,
               "available_from": "1/1/2345",
              "available_to": "7/3/2736",
             "discount": 0,
             "info": "",
            "condition": "Buono" }
     }];

    onMount(() => {
		    searchfunall();
	})

async function searchfunall(){
    let searchurl = "//site202123.tw.cs.unibo.it/products";
    //console.log(searchurl);
    let data = await jQuery.get(searchurl);
    filosofiApp = data;
    //console.log("in app:");
    //console.log(filosofiApp);
}

</script>

<svelte:head>
	<!-- elements go here -->
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
<meta content="utf-8" http-equiv="encoding">
	<link rel="shortcut icon" href="#">
	<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

</svelte:head>

<svelte:body

/>
<main class="overflow-auto">
<Router url="{url}">
<Route path="/">
		<div class='container pt-5 position-absolute' id='appcont'>
			<div class='row'>
        <div class='col'>
        <div  id='titolo'>Dining philosophers
        </div>
        <div id='benvenuto' class='fw-bold'>
        Ti poni molte domande sulla vita? <br> Prenota un filosofo per un incontro memorabile
        </div>
  			</div>
      </div>

			<form class="ricerca row">
        <div class='col'>
        <Searchbar bind:filosofi={filosofiApp}/>
        </div>

			<div class='row align-items-center m-5 h2'>
			   <div class='col' style='font-weight: 700;'> Non sai chi cercare?</div>
			      <div class=' col-lg-3 search-button ' style='border-radius: 5px;'>
              <Link class="searchlink" to="/home" style="color:white;">Cerca tutti</Link>
            </div>
			</div>
        </form>
		</div>

		<Signlog/>
		<Signature/>

    </Route>
		<Route path="/home">
		    <Home filosofi={filosofiApp} />
		</Route>
    <Route path="/personal">
		    <Personal/>
		</Route>
</Router>
</main>
