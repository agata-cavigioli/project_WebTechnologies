
<script>
	import 'css/global.css';
	import 'css/extra.css';
	export let name;
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
		<div class='centro'>
			<div id='titolo' >Dining philosophers</div>
			<div id='benvenuto' style='font-weight: 700;'>
			Welcome!<br>

			</div>
			<form action="" method="get">
  <div class="product-search">
      <div class="search-element" style='border-top-left-radius: 5px;
		  border-bottom-left-radius: 5px;'>
        <label class="search-label" style='font-size: 1.9vw; '>Who are you looking for?</label>
        <input class="search-input" type="text" autocomplete="on" placeholder="Philosopher's name" name="query">
      </div>
      <div class="search-element">
        <label class="search-label" style='font-size: 1.9vw'>Where are you looking?</label>
        <input class="search-input" type="text" placeholder="State" autocomplete="on" name="location">
      </div>
			<div class="search-button" >
        <a href="#" type="submit" style="color:white">Search</a>
			</div>
  </div>
</form>
			<div id='basso'>
			<span style='font-weight: 700;'> Don't know who you are looking for?</span>
			<div class="search-button" id='finalbutton' >
        <a type="submit" style="color:white;">Search everyone</a>
			</div>
			</div>
		</div>
	<div class="button-div">
		<button class="signup-button">Signup</button>
		<button class="login-button">Login</button>
	</div>
	<div class='signature-div'>
	by NoloNolo+&trade;
	</div>

</main>
