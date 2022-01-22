
<script>
  import { Router, Route, Link } from "svelte-routing";
	import Signlog from './Components/Signlog.svelte';
	import Signature from './Components/Signature.svelte';
	import Searchbar from './Components/Searchbar.svelte';
  import Home from './Components/Home.svelte';
	export let url = "";

	import 'css/global.css';
	import 'css/extra.css';
	export let name;


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

<svelte:body/>
<main>
<Router url="{url}">
<Route path="/">
		<div class='centro'>
			<div id='titolo' >Dining philosophers</div>
			<div id='benvenuto' style='font-weight: 700;'>	Welcome!<br>

			</div>
			<form class="ricerca" action="" method="get">
        <Searchbar/>
      </form>
			<div id='basso'>
			<span style='font-weight: 700;'> Don't know who you are looking for?</span>
			<div class="search-button" id='finalbutton' on:click={searchfunction}>
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
</Router>
</main>
