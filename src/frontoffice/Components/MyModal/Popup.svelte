<script>
  import { loggedIn } from '../../stores.js';
  import { getContext } from 'svelte';
  const { close } = getContext('simple-modal');
  import { onMount } from 'svelte';
  import jQ from 'jquery';


  export let op = 'Login';
  export const message = 'Hi';

  onMount(() => {
    jQuery( document ).ready(function() {
      console.log(op);
      if (document.getElementById('home')&& !document.getElementById('prenot-modal-content')){
        var close = document.getElementsByClassName("close")[0];
        close.id="closemodal";
        close.addEventListener("click", function() {
            document.getElementById('home').classList.remove("overflow-hidden");
            document.getElementById('home').classList.add("overflow-auto");
          });
          }
      else if (document.getElementById('prenot-modal-content')){
          var close = document.getElementsByClassName("close")[1];
          close.id="closemodal";
          close.addEventListener("click", function() {
              document.getElementById('prenot-modal-content').classList.remove("overflow-hidden");
              document.getElementById('prenot-modal-content').classList.add("overflow-auto");
            });
          }
    });
  });

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
      let element;
      if (element=document.getElementById('home')&& !document.getElementById('prenot-modal-content')){
      document.getElementById('home').classList.remove("overflow-hidden");
      document.getElementById('home').classList.add("overflow-auto");
      }
      console.log(document.getElementById('prenot-modal-content'));
      if (document.getElementById('prenot-modal-content')){
      document.getElementById('prenot-modal-content').classList.remove("overflow-hidden");
      document.getElementById('prenot-modal-content').classList.add("overflow-auto");
    }
      close()
    }

  }

  function checksignup(){
    if (sendsignup()){
      loggedIn.update(b => !b);
      let element;
      if (element=document.getElementById('home')&& !document.getElementById('prenot-modal-content')){
      document.getElementById('home').classList.remove("overflow-hidden");
      document.getElementById('home').classList.add("overflow-auto");
      }
      console.log(document.getElementById('prenot-modal-content'));
      if (document.getElementById('prenot-modal-content')){
      document.getElementById('prenot-modal-content').classList.remove("overflow-hidden");
      document.getElementById('prenot-modal-content').classList.add("overflow-auto");
    }
      close()
    }

  }

  function sendsignup(){
      const stars = document.querySelectorAll('.redstar');
        stars.forEach(redstar => {
        redstar.remove();
        });
        var sendcheck = true;
        var signupArray = [];
        var signup = {};

        let nome = document.getElementById("form0").value;
        let cognome = document.getElementById("form1").value;
        let mail = document.getElementById("form3").value;
        let pwd = document.getElementById("form2").value;
        let telefono = document.getElementById("form4").value;
        let indirizzo = document.getElementById("form5").value;

      if(nome){signup.nome = nome;}
        else {redstar('label0');
        sendcheck = false;}
      if(cognome){signup.cognome = cognome;}
        else {redstar('label1');
          sendcheck = false;}
      if(mail && validateEmail(mail)){signup.email = mail;}
      else {redstar('label3');
        sendcheck = false;
      }
      if(pwd){signup.pwd = pwd;}
      else {redstar('label2');
        sendcheck = false;
      }
      if(telefono){signup.telefono = telefono;}
      else {redstar('label4');
        sendcheck = false;
      }
      if(indirizzo){signup.indirizzo = indirizzo;}
      else {redstar('label5');
        sendcheck = false;
      }

      if(sendcheck){
      signupArray.push({...signup});
      console.log(JSON.stringify(signupArray));
      //confermato = true;
    }
}

  function checkpassword(mail, pwd){
    if (mail == pwd) return true;
    else {
      alert("wrong email or password");
      return false;
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function redstar(id){
    const redstar = document.createElement("span");
    redstar.innerHTML = "&#42;";

    redstar.classList.add( "text-danger");
    redstar.classList.add( "fw-bold");
    redstar.classList.add( "redstar");


    document.getElementById(id).appendChild(redstar);
  }
</script>

<div class='mymodal'>

{#if (op == "Login")}
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
      <p type="button" class="btn btn-outline-warning waves-effect" on:click={checklogin}>Send </p>
    </div>
  </div>
  </div>

  {:else if (op=='Signup')}
  <div class="modal-dialog modal-notify modal-warning" role="document">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h4 class="modal-title white-text w-100 font-weight-bold py-2">{op}</h4>
      </div>


      <div class="modal-body">
      <div class="md-form mb-5">
        <i class="bi bi-envelope prefix grey-text"></i>
        <label class="float-left" data-error="wrong" data-success="right" for="form0" id="label0">Nome</label>
        <input type="text" id="form0" class="form-control validate">
      </div>

      <div class="md-form mb-5">
        <i class="bi bi-envelope prefix grey-text"></i>
        <label class="float-left" data-error="wrong" data-success="right" for="form1" id="label1">Cognome</label>
        <input type="text" id="form1" class="form-control validate">
      </div>

        <div class="md-form mb-5">
          <i class="bi bi-envelope prefix grey-text"></i>
          <label class="float-left" data-error="wrong" data-success="right" for="form3" id="label3">Email</label>
          <input type="text" id="form3" class="form-control validate">
        </div>

        <div class="md-form">
          <i class="fas fa-envelope prefix grey-text"></i>
          <label class="float-left" data-error="wrong" data-success="right" for="form2" id="label2">Password</label>
          <input type="password" id="form2" class="form-control validate">

          <div class="form-check float-right form-switch">
            <input class="form-check-input float-none "  on:click={revealpwd} type="checkbox" id="btn-check-2" name="darkmode" value="yes" unchecked>
            <label class="form-check-label " for="btn-check-2">Show Password</label>
          </div>

        </div>

        <div class="md-form mb-5">
          <i class="bi bi-envelope prefix grey-text"></i>
          <label class="float-left" data-error="wrong" data-success="right" for="form4" id="label4">Telefono</label>
          <input type="text" id="form4" class="form-control validate">
        </div>

        <div class="md-form mb-5">
          <i class="bi bi-envelope prefix grey-text"></i>
          <label class="float-left" data-error="wrong" data-success="right" for="form5" id="label5">Indirizzo</label>
          <input type="text" id="form5" class="form-control validate">
        </div>
      </div>

      <div class="modal-footer justify-content-center">
        <p type="button" class="btn btn-outline-warning waves-effect" on:click={checksignup}>Send </p>
      </div>
    </div>
    </div>
  {/if}
</div>
