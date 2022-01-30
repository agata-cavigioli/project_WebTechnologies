<script>
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
  <div class="button-div" on:click={() => {loggedIn.update(b => !b);}}>
  Area personale
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
