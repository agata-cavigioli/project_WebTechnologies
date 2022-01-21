<script>
import { getContext } from 'svelte';
import { fly } from 'svelte/transition';
import Dialog from './Dialog.svelte';
import Modal from 'svelte-simple-modal';

const {open} = getContext('simple-modal');

function login(){
  alert("login");
}
function showDialog(){

}
/*
  const showDialog = () => {
		open(
			Dialog,
			{
				message: "What is your name?",
				hasForm: true,
				onCancel,
				onOkay
			},
			{
				closeButton: false,
    		closeOnEsc: false,
    		closeOnOuterClick: false,
			}
	  );
}
*/
</script>

<div class="button-div">
<button class="signup-button" on:click={showDialog}>Signup</button>
<button class="login-button" on:click={login}>Login</button>
</div>
