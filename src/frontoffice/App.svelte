
<script>
  import { Router, Route, Link } from "svelte-routing";
	import Signlog from './Components/Signlog.svelte';
	import Signature from './Components/Signature.svelte';
	import Searchbar from './Components/Searchbar.svelte';
  import Personal from './Components/Personal.svelte';
  import Home from './Components/Home.svelte';
	export let url = "";

	import 'css/global.css';
	import 'css/extra.css';


function searchfunction(){

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
<main>
<Router url="{url}">
<Route path="/">
		<div class='container pt-5 position-absolute' id='appcont'>
			<div class='row'>
        <div class='col'>
        <div  id='titolo'>Dining philosophers
        </div>
        <div id='benvenuto' class='fw-bold'>
        Welcome!
        </div>
  			</div>
      </div>

			<form class="ricerca row" action="" method="get">
        <div class='col'>
        <Searchbar/>
        </div>
      </form>
			<div class='row align-items-center m-5 h2'>
			<div class='col' style='font-weight: 700;'> Don't know who you are looking for?</div>
			<div class=' col-lg-3 search-button ' style='border-radius: 5px;' on:click={searchfunction}>

        <Link class="searchlink" to="/home" type="submit" style="color:white;">Search everyone</Link>

      </div>
			</div>
		</div>

		<Signlog/>
		<Signature/>

    </Route>
		<Route path="/home">
		    <Home/>
		</Route>
    <Route path="/personal">
		    <Personal/>
		</Route>
</Router>
</main>
