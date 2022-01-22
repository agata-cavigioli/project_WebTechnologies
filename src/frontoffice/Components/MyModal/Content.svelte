<script>
  import { getContext } from 'svelte';
  import Popup from './Popup.svelte';
  const { open } = getContext('simple-modal');

  const openmodal = (option) => open(Popup, { op: option, message: "It's a modal!" });
</script>

<div class="button-div">
<button class="signup-button" on:click={() => openmodal('Signup')}>Signup</button>
<button class="login-button" on:click={() => openmodal('Login')}>Login</button>
</div>
