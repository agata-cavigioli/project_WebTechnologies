
<script>
	export let name;
</script>

<svelte:head>
	<!-- elements go here -->
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
<meta content="utf-8" http-equiv="encoding">

	<link rel="shortcut icon" href="#" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
</svelte:head>

<style>
/*TOGLIERE SCROLL*/
	:global(body){
		margin: 0;
    text-align: center;
		padding: 0px;
		border:0px;
		height: 100%;
		overflow: hidden;
		font-size: 1.9vw;
	  font-weight: 100;
		}
	main{
		margin: 0px;
		padding: 0px;
		border:0px;
		height: 100%;
		background-image: url("background.jpg");
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		z-index: -1;
		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
		}

	.centro {
		position: absolute;
 		width: 80%;
 		height: 60%;
 		z-index: 0;
 		top: 20%;
 		left: 10%;
		display: flex;
  	justify-content: center;


		display:grid;
    grid-template-areas:    "head1"
                    				"head2"
                            "barra"
														"basso";
    grid-template-rows: 15% 30% 25% 30%;
  	grid-template-columns: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	*, *::before, *::after { box-sizing: border-box; }

	#titolo{
		grid-area: head1;
		font-family: 'Lobster', cursive;
		color: rgb(100, 149, 237);
		font-size: 8vw;
	}
	#benvenuto{
		grid-area: head2;
		font-size: 2.1vw;
	}
	.product-search {
		grid-area: barra;
		display: flex;
		height:100%;
  	align-items: center;

  	border-radius: 5px;
  	margin: 0 auto;
  	box-shadow: rgba(0,0,0,.172549) 0 6px 12px 0;
  	cursor: pointer;
		}

	.search-element {
		display: flex;
		height:100%;
		background: white;
  	flex-grow: 2;
	  flex-direction: column;
	  border-right: 1px solid rgba(10,10,10,.1);
	  padding: 1em;
	}

	.search-label {
	  font-weight: 550;
	}

	.search-input {
	  border: none;
	  appearance: none;
	  outline: none;
	  height: 100%;
	  font-size: 1.9vw;
	  line-height: 1.2em;
	  margin-top: 5px;
	}

	.search-input:focus {
	  box-shadow: 0px 2px 0px 0px rgb(65, 105, 225)
	}

	.search-button {
		height:100%;
		flex-grow: 1;
	  text-align: center;
	  font-size: 1.9vw;
	  font-weight: 300;
	  border: 0;
		padding: 1em;
	  border-top-left-radius: 0px;
	  border-bottom-left-radius: 0px;
	  border-top-right-radius: 5px;
	  border-bottom-right-radius: 5px;
	  color: white;
	  background-color: rgb(100, 149, 237);

	  border-right: 1px solid rgba(10,10,10,.1);
		display: flex;
		justify-content: center; /* align horizontal */
		align-items: center; /* align vertical */
	}
	a {
		text-decoration: none;
	}

	.search-button:hover {
	  background-color: #1859c9db
	}

	#basso {
		grid-area: 'basso';
		padding:2em;
		font-size: 2.1vw;
	}

	#finalbutton{
	 display: inline;
	 border-top-left-radius: 5px;
	 border-bottom-left-radius: 5px;
	}

	.button-div {
		z-index:1;
    width: 20vmin;
    height: 10vmin;
		min-width: 120px;
		position: fixed;
		top: 10px;
    right: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    padding: 0px;
}

.signup-button {
		font-size: 1.9vw;
		font-weight: 300;
    width: 100%;
    height: 55px;
    margin-right: 7px;
    border: none;
    border-radius: 5px;
    background-color: #e9ecf0;
    cursor: pointer
}

.login-button {
		font-size: 1.9vw;
		font-weight: 300;
    width: 100%;
    height: 55px;
    border: none;
    border-radius: 5px;
    color: #fff;
    background-color: rgb(100, 149, 237);
    cursor: pointer
}

.login-button:hover {
    background-color: #1859c9db
}

.signup-button:hover {
    background-color: #e9ecf0d1
}

.signature-div {
	z-index:1;
	width: 20vw;
	height: auto;
	position: fixed;
	bottom: 10px;
	right: 5vw;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0px;
	font-weight: 500
}


</style>
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
