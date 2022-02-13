<script>
import { onMount } from 'svelte';
import jQuery from 'jquery';

export let id = "1234";
let personaldata;
let personaldatastring;

onMount(() => {
	jQuery( document ).ready(function() {
		getPersonalData();
		loadinfo();

	});
});


let people = [
	{ "id": "1234",
	"name": "Mario",
     "surname": "Rossi",
     "email": "mario.rossi@gmail.com",
     "phone": "3456778254",
     "address": "via vai",
     "nolo_data": {
         "info": ""
     },
	 },
    {
			"id": "4321",
			"name": "Luca",
			"surname": "Bianchi",
			"email": "luca.bianchi@gmail.com",
			"phone": "3786557942",
			"address": "via via",
			"fotoprofilo": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png",
			"nolo_data": {
          "info": ""
      },
		},
	]

function getPersonalData(){
	let found = false;
	people.forEach((person) => {
		if(person.id == id) {
			found = true;
			personaldata = person;
			personaldatastring = JSON.stringify(person);
		}
	});
	if (!found) document.getElementById('datatab').innerHTML=("Cannot find personal data");
	else console.log(personaldata);
}

function loadinfo(){
	document.getElementById('datatab').innerHTML=(
	"	<h5 class='font-weight-bold text-secondary mt-4' id='riepilogodiv'> \
		Nome: <span class='modificabile d-inline'>"+ personaldata.name + " </span> <br> \
		Cognome: <span class='modificabile d-inline'>"+ personaldata.surname + " </span> <br> \
		Email: <span class='modificabile d-inline'>"+ personaldata.email + " </span> <br> \
		Numero di phone: <span class='modificabile d-inline'>"+ personaldata.phone + " </span> <br> \
		Indirizzo: <span class='modificabile d-inline'>"+ personaldata.address + " </span> \
		</h5> ")
	}

function modify(){
	personaldata.email = "rossi.mario@gmail.com";
	document.getElementById('datatab').innerHTML="";
	document.getElementById('datatab').innerHTML=(
	"	<h5 class='font-weight-bold text-secondary mt-4' id='riepilogodiv'> \
		Nome: <input type='text' id = 'personalnome' class='modificabile m-1 d-inline' value='"+ personaldata.name + "'> </input> <br> \
		Cognome: <input type='text'id='personalcognome' class='modificabile m-1 d-inline' value='"+ personaldata.surname + "'> </input> <br> \
		Email: <input type='text' id='personalemail' class='modificabile m-1 d-inline' value='"+ personaldata.email + "'> </input> <br> \
		Numero di phone: <input type='text' id='personaltelefono' class='m-1 modificabile d-inline' value='"+ personaldata.phone + "'> </input> <br> \
		Indirizzo: <input type='text' id='personalindirizzo' class='m-1 modificabile d-inline' value='"+ personaldata.address + "'> </input> \
		</h5> ");

		document.getElementById('modifyconfirm').innerHTML="Conferma";
		document.getElementById('modifyconfirm').removeEventListener("click", modify);
		document.getElementById('modifyconfirm').addEventListener("click", confirm);
		document.getElementById('modifyconfirm').classList.remove("btn-outline-info");
		document.getElementById('modifyconfirm').classList.add("btn-outline-warning");

}

function confirm(){
	/////////////////////////
	personaldata.name  = document.getElementById('personalnome').value;
	personaldata.surname  = document.getElementById('personalcognome').value;
	personaldata.email  = document.getElementById('personalemail').value;
	personaldata.phone  = document.getElementById('personaltelefono').value;
	personaldata.address  = document.getElementById('personalindirizzo').value;
/////////////////////////////
	loadinfo();

	document.getElementById('modifyconfirm').innerHTML="Modifica";
	document.getElementById('modifyconfirm').addEventListener("click", modify);
	document.getElementById('modifyconfirm').removeEventListener("click", confirm);
	document.getElementById('modifyconfirm').classList.add("btn-outline-info");
	document.getElementById('modifyconfirm').classList.remove("btn-outline-warning");

}

</script>

<div class="personaltab" >
<h4 class='font-weight-bold text-info mt-4'>
Dati profilo
</h4>
<div id="datatab">
</div>
<p id="modifyconfirm" type='button' class='btn btn-outline-info waves-effect' on:click={modify}>Modifica</p>

</div>
