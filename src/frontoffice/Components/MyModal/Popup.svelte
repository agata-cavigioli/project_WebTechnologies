<script context="module">
//export let user = {loggedIn: false};
</script>

<script>
  import { loggedIn } from '../../stores.js';
  import { getContext } from 'svelte';
  const { close } = getContext('simple-modal');


  export let op = 'login';
  export const message = 'Hi';

  function revealpwd() {
    var x = document.getElementById("form2");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  function checklogin(){
    var mail = document.getElementById("form3").value;
    var pwd = document.getElementById("form2").value;
    if (checkpassword(mail,pwd)){
      loggedIn.update(b => !b);
    }
    close()
  }

  function checkpassword(mail, pwd){
    if (mail == pwd) return true;
    else {
      alert("wrong email or password");
    }
  }
</script>

<div class='mymodal'>

<div class="modal-dialog modal-notify modal-warning" role="document">
  <div class="modal-content">
    <div class="modal-header text-center">
      <h4 class="modal-title white-text w-100 font-weight-bold py-2">{op}</h4>
    </div>


    <div class="modal-body">
      <div class="md-form mb-5">
        <i class="bi bi-envelope prefix grey-text"></i>
        <label class="float-left" data-error="wrong" data-success="right" for="form3">Email</label>
        <input type="text" id="form3" class="form-control validate">
      </div>

      <div class="md-form">
        <i class="fas fa-envelope prefix grey-text"></i>
        <label class="float-left" data-error="wrong" data-success="right" for="form2">Password</label>
        <input type="password" id="form2" class="form-control validate">

        <div class="form-check float-right form-switch">
          <input class="form-check-input float-none "  on:click={revealpwd} type="checkbox" id="btn-check-2" name="darkmode" value="yes" unchecked>
          <label class="form-check-label " for="btn-check-2">Show Password</label>
        </div>

      </div>
    </div>

    <div class="modal-footer justify-content-center">
      <p type="button" class="btn btn-outline-warning waves-effect" on:click={checklogin}>Send <i class="fas fa-paper-plane-o ml-1"></i></p>
    </div>
  </div>
  </div>
</div>
