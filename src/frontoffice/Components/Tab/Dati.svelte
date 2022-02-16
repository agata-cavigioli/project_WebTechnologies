<script>
import { loggedIn, userID } from '../../stores.js';
import { onMount } from 'svelte';
import jQuery from 'jquery';

let id;

userID.subscribe(value => {
	id = value;
});

let modifyconfirm = "modify";
function modifyconfirmfun(){
	if (modifyconfirm == "modify") modify();
	else confirm();
}
onMount(() => {
	jQuery( document ).ready(async function() {
		console.log("id: "+id);
		//document.getElementById('datatab').innerHTML="";
		const found = await getPersonalData();
		console.log(found);
		loadinfo(found);
		//console.log(found);
		//if (found) loadinfo();
	});
});


let personaldata = "";

async function getPersonalData(){

	let searchurl = "http://site202123.tw.cs.unibo.it/clients";
  searchurl += "?id=" + id;
  console.log(searchurl);

  await jQuery.get(searchurl).done(
		function(data){
	 			personaldata = data[0];
	 			if(personaldata) {
					console.log(personaldata);
					//console.log(personaldata.name);
					//return true;
				}
	 			else {
	 			document.getElementById('datatab').innerHTML=("Cannot find personal data");
				//return false;
	 			}
 		}
 )
}

function loadinfo(found){
		console.log(personaldata);
		document.getElementById('datatab').innerHTML=( "<h5 class='font-weight-bold text-secondary mt-4' id='riepilogodiv'> \
		Nome: <span class='modificabile d-inline'>"+ personaldata.name + " </span> <br> \
		Cognome: <span class='modificabile d-inline'>"+ personaldata.surname + " </span> <br> \
		Email: <span class='modificabile d-inline'>"+ personaldata.email + " </span> <br> \
		Numero di phone: <span class='modificabile d-inline'>"+ personaldata.phone + " </span> <br> \
		Indirizzo: <span class='modificabile d-inline'>"+ personaldata.address + " </span> \
		</h5> ")
	}

function modify(){
	console.log("modify");
	document.getElementById('datatab').innerHTML="";
	document.getElementById('datatab').innerHTML=(
	"	<h5 class='font-weight-bold text-secondary mt-4' id='riepilogodiv'> \
		Nome: <input type='text' id = 'personalnome' class='modificabile m-1 d-inline' value='"+ personaldata.name + "'> </input> <br> \
		Cognome: <input type='text'id='personalcognome' class='modificabile m-1 d-inline' value='"+ personaldata.surname + "'> </input> <br> \
		Email: <input type='text' id='personalemail' class='modificabile m-1 d-inline' value='"+ personaldata.email + "'> </input> <br> \
		Password: <input type='password' id='personalpwd' class='modificabile m-1 d-inline' value='"+ personaldata.pwd + "'> </input> <br> \
		Numero di phone: <input type='text' id='personaltelefono' class='m-1 modificabile d-inline' value='"+ personaldata.phone + "'> </input> <br> \
		Indirizzo: <input type='text' id='personalindirizzo' class='m-1 modificabile d-inline' value='"+ personaldata.address + "'> </input> \
		</h5> ");

		modifyconfirm = "confirm";
		document.getElementById('modifyconfirm').innerHTML="Conferma";
		//document.getElementById('modifyconfirm').removeEventListener("click", modify);
		//document.getElementById('modifyconfirm').addEventListener("click", confirm);
		document.getElementById('modifyconfirm').classList.remove("btn-outline-info");
		document.getElementById('modifyconfirm').classList.add("btn-outline-warning");

}

async function confirm(){
	console.log("confirm");
	/////////////////////////// post sul database
	let modify= sendmodify();
	if (modify){
	let url = "http://site202123.tw.cs.unibo.it/update/clients?id="+id;
	console.log(url);
	console.log(modify);

	var update = {$set : modify};

	await jQuery.post(url,update);
/////////////////////////////
	loadinfo();
	console.log("cambio il bottone");
	modifyconfirm = "modify";
	document.getElementById('modifyconfirm').innerHTML="Modifica";
	//document.getElementById('modifyconfirm').removeEventListener("click", confirm);
	//document.getElementById('modifyconfirm').addEventListener("click", modify);
	document.getElementById('modifyconfirm').classList.add("btn-outline-info");
	document.getElementById('modifyconfirm').classList.remove("btn-outline-warning");

}
function sendmodify(){
		const stars = document.querySelectorAll('.redstar');
			stars.forEach(redstar => {
			redstar.remove();
			});
			var sendcheck = true;
			var modify = {};

			//personaldata.name  = document.getElementById('personalnome').value;
			//personaldata.surname  = document.getElementById('personalcognome').value;
			//personaldata.email  = document.getElementById('personalemail').value;
			//personaldata.phone  = document.getElementById('personaltelefono').value;
			//personaldata.address  = document.getElementById('personalindirizzo').value;
			let nome = document.getElementById('personalnome').value;
			let cognome = document.getElementById('personalcognome').value;
			let mail = document.getElementById('personalemail').value;
			let pwd = document.getElementById('personalpwd').value;
			let telefono = document.getElementById('personaltelefono').value;
			let indirizzo = document.getElementById('personalindirizzo').value;

		if(nome){modify.name = nome;
			personaldata.name = nome;
		}
			else {
			sendcheck = false;}
		if(cognome){modify.surname = cognome;
		personaldata.surname = cognome;}
			else {
				sendcheck = false;}
		if(mail && validateEmail(mail)){
			modify.email = mail;
		personaldata.email = mail;}
		else {
			sendcheck = false;
		}
		if(pwd){
			modify.pwd = pwd;
		}
		else {
			sendcheck = false;
		}
		if(telefono && !isNaN(telefono)){
			modify.phone = telefono;
		personaldata.phone = telefono;}
		else {
			sendcheck = false;
		}
		if(indirizzo){modify.address = indirizzo;
			personaldata.address = indirizzo;}
		else {r
			sendcheck = false;
		}

		if(sendcheck){
			modify.nolo_data = {};
			modify.nolo_data.info = "";
		return modify;
	}
	else {
		alert("Inserire i campi mancanti");
		return false;}
}
}


const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

async function deleteprofile(){
	let myurl = "http://site202123.tw.cs.unibo.it/clients?id=" + id;
  await jQuery.ajax({
         url: myurl ,
         type: 'DELETE'
     });
	userID.set(-1);
	loggedIn.update(b => !b);
	document.getElementById('datatab').innerHTML=("Profilo eliminato");
}

</script>

<div class="personaltab" >
<h4 class='font-weight-bold text-my mt-4'>
Dati profilo
</h4>
<div id="datatab">
</div>
<button id="modifyconfirm"  class='btn btn-outline-info waves-effect' on:click={modifyconfirmfun}>Modifica</button>
<button id="modifyconfirm"  class='btn btn-outline-danger waves-effect' on:click={deleteprofile}>Elimina</button>
</div>
