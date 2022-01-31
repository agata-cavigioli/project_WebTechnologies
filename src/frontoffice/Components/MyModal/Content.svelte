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

  const openmodal = (option) => open(Popup, { op: option, message: "It's a modal!" });

</script>

{#if islogged}
<!--	<button on:click={toggle}>
		Log out
	</button>
-->
<div class="button-div" style="display:grid; width: 40vmin; right:0vw;">
  <button class="signup-button row" on:click={() => {loggedIn.update(b => !b);}}>
      Logout
  </button>
  <div class="row">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class=" bi bi-person" viewBox="0 0 16 16">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
    </svg>
    <Link to="/personal" type="submit" style="color:black;">Area Personale</Link>
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
