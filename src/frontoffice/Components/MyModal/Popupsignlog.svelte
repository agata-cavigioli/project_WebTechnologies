<script>
  import { loggedIn, userID } from '../../stores.js';
  import { getContext } from 'svelte';
  const { close } = getContext('simple-modal');
  import { onMount } from 'svelte';
  import jQuery from 'jquery';


  export let op = 'Login';
  export const message = 'Hi';

  let id;
  userID.subscribe(value => {
		id = value;
	});
/*
  let focusableElements;
  if(op == "Login"){
    focusableElements =
        [ 'form3', 'form2', 'btn-check-2', 'sendloginbutton'];


  } else if (op == "Signup"){
    focusableElements =
        [ 'form0', 'form1', 'form3', 'form2', 'btn-check-2', 'form4', 'form5', 'sendsignupbutton'];

  }
*/
  onMount(() => {
    jQuery( document ).ready(function() {
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
/*
          // add all the elements inside modal which you want to make focusable
          const modal = document.getElementById('#mymodal'); // select the modal by it's id
          console.log(focusableElements[0]);
          const firstFocusableElement = document.getElementById(focusableElements[0]); // get first element to be focused inside modal
          //const focusableContent = modal.querySelectorAll(focusableElements);
          const lastFocusableElement = document.getElementById(focusableElements[focusableElements.length - 1]); // get last element to be focused inside modal


          document.addEventListener('keydown', function(e) {
            let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

            if (!isTabPressed) {
              return;
            }

            if (e.shiftKey) { // if shift key pressed for shift + tab combination
              if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
              }
            } else { // if tab key is pressed
              if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
              }
            }
          });

          firstFocusableElement.focus();

          //////////////////
          */
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

async function checklogin(){
    var mail = document.getElementById("form3").value;
    var pwd = document.getElementById("form2").value;
    if (!mail || !pwd) {
      redstar('label2');
      redstar('label3');
      return false;
    }


    const tempurl = '?email="'+ document.getElementById("form3").value + '"&pwd="' + document.getElementById("form2").value +'"';
    let done = await checkpassword(tempurl);
    //console.log(done);
    if (done){
      loggedIn.update(b => !b);
      let element;
      if (element=document.getElementById('home')&& !document.getElementById('prenot-modal-content')){
      document.getElementById('home').classList.remove("overflow-hidden");
      document.getElementById('home').classList.add("overflow-auto");
      }
      //console.log(document.getElementById('prenot-modal-content'));
      if (document.getElementById('prenot-modal-content')){
      document.getElementById('prenot-modal-content').classList.remove("overflow-hidden");
      document.getElementById('prenot-modal-content').classList.add("overflow-auto");
    }
      close()
    }

  }

  async function checksignup(){
    let signup= sendsignup();
    if (signup){
      //console.log("stringa: " + JSON.stringify(signupArray));
      //console.log("array" + signupArray);
      //let created =
      await jQuery.post("//site202123.tw.cs.unibo.it/clients",signup).done(
        function(res){
          userID.set(res.id);
          //console.log(id);
        }
      );

      loggedIn.update(b => !b);

      let element;
      if (element=document.getElementById('home')&& !document.getElementById('prenot-modal-content')){
      document.getElementById('home').classList.remove("overflow-hidden");
      document.getElementById('home').classList.add("overflow-auto");
      }
      //console.log(document.getElementById('prenot-modal-content'));
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

      if(nome){signup.name = nome;}
        else {redstar('label0');
        sendcheck = false;}
      if(cognome){signup.surname = cognome;}
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
      if(telefono && !isNaN(telefono)){signup.phone = telefono;}
      else {redstar('label4');
        sendcheck = false;
      }
      if(indirizzo){signup.address = indirizzo;}
      else {redstar('label5');
        sendcheck = false;
      }

      if(sendcheck){
        signup.nolo_data = {};
        signup.nolo_data.info = "";
      signupArray.push({...signup});
      //console.log(signupArray);
      //console.log(signup);
      //console.log(JSON.stringify(signupArray));
      //console.log(JSON.stringify(signup));
      return signup;
    }
    else return false;
}

async function checkpassword(tempurl){
    const url = "//site202123.tw.cs.unibo.it/clients"+tempurl;
    //console.log(url);
    let done;
    await jQuery.get(url).done(
      function(res){
        let personlogged = res[0];
        //console.log(personlogged);
        if (personlogged) {
          //console.log("found");
          userID.set(personlogged.id);
          //console.log(id);
          done =  true;        }
        else {
          alert("wrong email or password");
          done =  false;
        }
      }
    );
    return done;
/*
    if (mail == pwd) return true;
    else {
      alert("wrong email or password");
      return false;
    }
    */
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

/////////////////// accessibilitá
// add all the elements inside modal which you want to make focusable
/*
let focusableElements;
if(op == "Login"){
  focusableElements =
      ['"modaltitle"', 'form3', 'form2', 'btn-check-2', 'sendloginbutton'];


} else if (op == "Signup"){
  focusableElements =
      ['modaltitle', 'form0', 'form1', 'form3', 'form2', 'btn-check-2', 'form4', 'form5', 'sendsignupbutton'];

}
const modal = document.getElementById('#mymodal'); // select the modal by it's id
console.log(focusableElements[0]);
const firstFocusableElement = document.getElementById(focusableElements[0]); // get first element to be focused inside modal
//const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = document.getElementById(focusableElements[focusableElements.length - 1]); // get last element to be focused inside modal


document.addEventListener('keydown', function(e) {
  let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) { // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else { // if tab key is pressed
    if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
});

firstFocusableElement.focus();
*/
//////////////////
</script>



{#if (op == "Login")}
<div class='mymodal nololog' id="mymodal">
<div class="modal-dialog modal-notify modal-warning" role="document">
  <div class="modal-content">
    <div class="modal-header text-center">
      <h4 class="modal-title white-text w-100 font-weight-bold py-2" id="modaltitle">
      {op}
      </h4>
    </div>


    <div class="modal-body">
      <div class="md-form mb-5">
        <i class="bi bi-envelope prefix grey-text"></i>
        <label class="float-left" data-error="wrong" data-success="right" for="form3" id ="label3">Email</label>
        <input type="text" id="form3" class="form-control validate">
      </div>

      <div class="md-form">
        <i class="fas fa-envelope prefix grey-text"></i>
        <label class="float-left" data-error="wrong" data-success="right" for="form2" id ="label2">Password</label>
        <input type="password" id="form2" class="form-control validate">

        <div class="form-check float-right form-switch">
          <input class="form-check-input float-none "  on:click={revealpwd} type="checkbox" id="btn-check-2" name="darkmode" value="yes" unchecked>
          <label class="form-check-label " for="btn-check-2">Show Password</label>
        </div>

      </div>
    </div>

    <div class="modal-footer justify-content-center">
      <button class="btn btn-outline-warning waves-effect" on:click={checklogin} id="sendloginbutton">Send </button>
    </div>
  </div>
  </div>
</div>
  {:else if (op=='Signup')}
<div class='mymodal nolosignup signupmodal1'>
  <div class="modal-dialog modal-notify modal-warning" role="document">
    <div class="modal-content overflow-auto">
      <div class="modal-header text-center">
        <h4 class="modal-title white-text w-100 font-weight-bold py-2" id="modaltitle">
        {op}
        </h4>
      </div>


      <div class="modal-body">
      <div class="row-lg">
      <div class="col-lg md-form mb-5">
        <i class="bi bi-envelope prefix grey-text"></i>
        <label class="float-left" data-error="wrong" data-success="right" for="form0" id="label0">Nome</label>
        <input type="text" id="form0" class="form-control validate">
      </div>

      <div class="col-lg md-form mb-5">
        <i class="bi bi-envelope prefix grey-text"></i>
        <label class="float-left" data-error="wrong" data-success="right" for="form1" id="label1">Cognome</label>
        <input type="text" id="form1" class="form-control validate">
      </div>
      </div>
      <div class="row-lg">
        <div class="col-lg md-form mb-5">
          <i class="bi bi-envelope prefix grey-text"></i>
          <label class="float-left" data-error="wrong" data-success="right" for="form3" id="label3">Email</label>
          <input type="text" id="form3" class="form-control validate">
        </div>

        <div class="col-lg md-form">
          <i class="fas fa-envelope prefix grey-text"></i>
          <label class="float-left" data-error="wrong" data-success="right" for="form2" id="label2">Password</label>
          <input type="password" id="form2" class="form-control validate">

          <div class="form-check float-right form-switch">
            <input class="form-check-input float-none "  on:click={revealpwd} type="checkbox" id="btn-check-2" name="darkmode" value="yes" unchecked>
            <label class="form-check-label " for="btn-check-2">Show Password</label>
          </div>
        </div>

        </div>
        <div class="row-lg">
        <div class="col-lg md-form mb-5">
          <i class="bi bi-envelope prefix grey-text"></i>
          <label class="float-left" data-error="wrong" data-success="right" for="form4" id="label4">Telefono</label>
          <input type="text" id="form4" class="form-control validate">
        </div>

        <div class="col-lg md-form mb-5">
          <i class="bi bi-envelope prefix grey-text"></i>
          <label class="float-left" data-error="wrong" data-success="right" for="form5" id="label5">Indirizzo</label>
          <input type="text" id="form5" class="form-control validate">
        </div>
      </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button class="btn btn-outline-warning waves-effect" on:click={checksignup} id="sendsignupbutton" >Send </button>
      </div>
    </div>
    </div>
    </div>
  {/if}
