<script>
  import { Router, Route, Link } from "svelte-routing";
  import {tweened} from 'svelte/motion' ;
  import { getContext } from 'svelte';
  import Popup from './Popup.svelte';
  const { open } = getContext('simple-modal');

  import { loggedIn } from '../../stores.js';

  let islogged;

	loggedIn.subscribe(value => {
		islogged = value;
	});

  const openmodal = (option) => {
    let element;
    if (element=document.getElementById('home')){
    element.classList.add("overflow-hidden");}
    open(Popup, { op: option, message: "It's a modal!" });
  }

</script>

{#if islogged}
<!--	<button on:click={toggle}>
		Log out
	</button>
-->
<div class="button-div container" style=" width: 40vmin; right:0vw;">
  <div class='row'>
  <button class="signup-button col" on:click={() => {loggedIn.update(b => !b);}}>

      Logout

  </button>
  <div class='col'>
    <Link to="/personal" type="submit" style="color:black;" class='text-center'>Area <br> Personale</Link>
    </div>
  </div>
</div>

{:else if !islogged}
<!--	<button on:click={toggle}>
		Log in
	</button>
-->
  <div class="button-div">
  <button class="signup-button" on:click={() => openmodal('Signup')}>Signup</button>
  <button class="login-button" on:click={() => openmodal('Login')}>Login</button>
  </div>
{/if}
