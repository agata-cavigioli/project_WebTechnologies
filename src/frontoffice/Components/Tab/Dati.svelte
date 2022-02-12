<script>
import { onMount } from 'svelte';
import jQ from 'jquery';

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
    {
				"id": "1234",
        "nome": "Mario",
        "cognome": "Rossi",
        "email": "mario.rossi@gmail.com",
        "telefono": "3456778254",
        "indirizzo": "via vai",
        "fotoprofilo": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
    },
    {
			"id": "4321",
			"nome": "Luca",
			"cognome": "Bianchi",
			"email": "luca.bianchi@gmail.com",
			"telefono": "3786557942",
			"indirizzo": "via via",
			"fotoprofilo": "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
	}
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
		Nome: <span class='modificabile d-inline'>"+ personaldata.nome + " </span> <br> \
		Cognome: <span class='modificabile d-inline'>"+ personaldata.cognome + " </span> <br> \
		Email: <span class='modificabile d-inline'>"+ personaldata.email + " </span> <br> \
		Numero di telefono: <span class='modificabile d-inline'>"+ personaldata.telefono + " </span> <br> \
		Indirizzo: <span class='modificabile d-inline'>"+ personaldata.indirizzo + " </span> \
		</h5> ")
	}

function modify(){
	personaldata.email = "rossi.mario@gmail.com";
	document.getElementById('datatab').innerHTML="";
	document.getElementById('datatab').innerHTML=(
	"	<h5 class='font-weight-bold text-secondary mt-4' id='riepilogodiv'> \
		Nome: <input type='text' id = 'personalnome' class='modificabile m-1 d-inline' value='"+ personaldata.nome + "'> </input> <br> \
		Cognome: <input type='text'id='personalcognome' class='modificabile m-1 d-inline' value='"+ personaldata.cognome + "'> </input> <br> \
		Email: <input type='text' id='personalemail' class='modificabile m-1 d-inline' value='"+ personaldata.email + "'> </input> <br> \
		Numero di telefono: <input type='text' id='personaltelefono' class='m-1 modificabile d-inline' value='"+ personaldata.telefono + "'> </input> <br> \
		Indirizzo: <input type='text' id='personalindirizzo' class='m-1 modificabile d-inline' value='"+ personaldata.indirizzo + "'> </input> \
		</h5> ");

		document.getElementById('modifyconfirm').innerHTML="Conferma";
		document.getElementById('modifyconfirm').removeEventListener("click", modify);
		document.getElementById('modifyconfirm').addEventListener("click", confirm);
		document.getElementById('modifyconfirm').classList.remove("btn-outline-info");
		document.getElementById('modifyconfirm').classList.add("btn-outline-warning");

}

function confirm(){
	/////////////////////////
	personaldata.nome  = document.getElementById('personalnome').value;
	personaldata.cognome  = document.getElementById('personalcognome').value;
	personaldata.email  = document.getElementById('personalemail').value;
	personaldata.telefono  = document.getElementById('personaltelefono').value;
	personaldata.indirizzo  = document.getElementById('personalindirizzo').value;
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
