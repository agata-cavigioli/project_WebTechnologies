<script>
import { onMount } from 'svelte';
import jQuery from 'jquery';

export let time;
export let noleggio;

let image = "https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png";
let FiloName = "Gino";
let FilImg = "";
let modifyconfirm = "modify";

onMount(async () => {
    await getFilNameById();
})

let filosofo;

async function getFilNameById(){
    let searchurl = "http://site202123.tw.cs.unibo.it/products?id=" + noleggio.product_id ;
    let data = await jQuery.get(searchurl);
    FiloName = data[0] && data[0].name;
    FilImg = data[0] && data[0].img;
    console.log(FiloName);
    return true;
}

function modifyconfirmNolo(){
  if (modifyconfirm == "modify") modify();
  else confirm();
}

function calcolocosto(noleggio){
	const date1 = new Date(noleggio.date_from);
	const date2 = new Date(noleggio.date_to);
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

	return (diffDays*noleggio.nolo_data.daily_cost);
}

function calcolofinale(noleggio){
	const date1 = new Date(noleggio.date_from);
	const date2 = new Date(noleggio.date_to);
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

	return ((diffDays*noleggio.nolo_data.daily_cost)-((diffDays*noleggio.nolo_data.daily_cost*noleggio.nolo_data.discount)/100)+noleggio.nolo_data.other_fees);
}
async function deleteNolo(){
	let myurl = "http://site202123.tw.cs.unibo.it/nolos?id=" + noleggio.id;
  await jQuery.ajax({
         url: myurl ,
         type: 'DELETE'
     });
  let divmio = 'cardnolo'+noleggio.id;
	document.getElementById(divmio).innerHTML=("Noleggio eliminato");
}

function modify(){
  let divmio = 'dateNolo' + noleggio.id;
  console.log(divmio);
    document.getElementById(divmio).innerHTML = "Periodo di noleggio: <div class='input-group mb-2 mr-sm-2'> \
      <div class='input-group-prepend'><label for='datefrom' class='input-group-text customcol-smor'>Da:</label> \
    </div>  <input class='input-group date form-control' type='date' id='datefrom' value='" + noleggio.date_from + "'> \
    <label for='dateto' class='input-group-text rounded-0 border-left-0 border-right-0 customcol-smor'>a:</label>  \
        <input type='date' class='input-group date form-control'  id='dateto' value='"+ noleggio.date_to + "'> </div> \
        <div id='aggiunte"+noleggio.id+"' class='text-default text-danger'> </div>";

  //cambia pulsante conferma
  modifyconfirm = "confirm";
  document.getElementById('modifyconfirm').innerHTML="Conferma";
  //document.getElementById('modifyconfirm').removeEventListener("click", modify);
  //document.getElementById('modifyconfirm').addEventListener("click", confirm);
  document.getElementById('modifyconfirm').classList.remove("btn-outline-info");
  document.getElementById('modifyconfirm').classList.add("btn-outline-warning");
}

function confirm(){
  let aggiunte = "aggiunte" + noleggio.id;
  console.log(aggiunte);
  document.getElementById(aggiunte).innerHTML = "";
  if(canModify()){
      noleggio.date_from = document.getElementById('datefrom').value;
      noleggio.date_to = document.getElementById('dateto').value;

      let divmio = 'dateNolo' + noleggio.id;
      console.log("confermo la modifica");
      document.getElementById(divmio).innerHTML = "Periodo di noleggio: " + noleggio.date_from + " / " + noleggio.date_to;

      console.log("cambio il bottone");
    	modifyconfirm = "modify";
    	document.getElementById('modifyconfirm').innerHTML="Modifica";
    	//document.getElementById('modifyconfirm').removeEventListener("click", confirm);
    	//document.getElementById('modifyconfirm').addEventListener("click", modify);
    	document.getElementById('modifyconfirm').classList.add("btn-outline-info");
    	document.getElementById('modifyconfirm').classList.remove("btn-outline-warning");}

}

async function canModify(){
  let modDateFrom = document.getElementById('datefrom').value;
  let modDateTo = document.getElementById('dateto').value;
  let aggiunte = 'aggiunte' + noleggio.id;
  let sendMod
  if(modDateFrom && modDateTo) {
    const date1 = new Date(modDateFrom);
    const date2 = new Date(modDateTo);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const today = new Date();
    const diffTimetoday = today - date1;
    const diffDaystoday = Math.ceil(diffTimetoday / (1000 * 60 * 60 * 24)) - 1;
    console.log( "diffdays" + diffDays);
    console.log(diffDaystoday);
    if (diffDaystoday>0) {
      document.getElementById(aggiunte).innerHTML+= "Inserire una data di inizio successiva ad oggi";
      return false;
    }
    else if (diffDays<1){
      document.getElementById(aggiunte).innerHTML+= "Modificare la data di fine noleggio";
      return false;
    }
    console.log("post");
    //////// POST

    let modify = {};
    modify.diffdate = diffDays;
    modify.date_from =  modDateFrom;
    modify.date_to =  modDateTo;
    modify.payment = noleggio.payment;
    modify.product_id = noleggio.product_id;
    modify.client_id = noleggio.client_id;
    modify.dep_id = noleggio.dep_id;
    modify.status= noleggio.status;
    modify.nolo_data = noleggio.nolo_data;
    if (modify){
  	let url = "http://site202123.tw.cs.unibo.it/update/nolos?id="+noleggio.id;
  	console.log(url);
  	console.log(modify);

  	var update = {$set : modify};
    console.log(update);
  	await jQuery.post(url,update);
    return true;
  }
    ////////GET
  }
  else{
    document.getElementById(aggiunte).innerHTML+= "Inserire le date";
    return false;

  }
}


function downloadBill(){
          let invoiceid = 'fattura'+ noleggio.id;
          const invoice = document.getElementById(invoiceid);
            console.log(invoice);
            console.log(window);
            var opt = {
                margin: 1,
                filename: 'fattura.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(invoice).set(opt).save();

}

</script>

<div id="cardnolo{noleggio.id}" class="card flex-row row mt-2">
    <div class="col-3 m-2">
        <div class="card-img-actions"> <img src={FilImg} class="card-img "  height="350" alt="">  </div>
    </div>

    <div id="fattura{noleggio.id}" class="col-lg-6 m-2">

        <div class="mb-2">
            <h6 class="font-weight-semibold mb-2">
              <div class="text-default mb-2" data-abc="true">
              {FiloName}
              </div>
            </h6>
            <div id="dateNolo{noleggio.id}" class="text-muted" data-abc="true">
            Periodo di noleggio: {noleggio.date_from} / {noleggio.date_to}
              <div id="aggiunte{noleggio.id}" class='text-default text-danger'>
              </div>
            </div>
            <div class="text-my" data-abc="true">
            Stato del noleggio: {noleggio.status}
            </div>
        </div>
       <div class="text-muted mb-3">
        Costo giornaliero: &euro;{noleggio.nolo_data.daily_cost}
        <br>
        Sconti applicati: {noleggio.nolo_data.discount} &#37;
        <br>
        Costi aggiuntivi: {noleggio.nolo_data.other_fees} &euro;
        </div>

        <h3 class="mb-0 font-weight-semibold">Costo base: &euro;{calcolocosto(noleggio)}</h3>
        <h3 class="mb-0 text-danger font-weight-semibold">Prezzo finale: &euro;{calcolofinale(noleggio)}</h3>

        <div class='mybooking'>
        </div>
    </div>
    {#if ((time=="future"))}
    <div class="col-lg-2">
      <div class="container">
          <div class="row">
            <div class="col">
              <p id="modifyconfirm" type='button' class='mt-4 btn btn-outline-info waves-effect' on:click={modifyconfirmNolo}>Modifica</p>
            </div>

            <div class="col">
              <p id="nolodelete" type='button' class='row-lg mt-4 btn btn-outline-warning waves-effect' on:click={deleteNolo}>Elimina</p>
            </div>
          </div>
        </div>
    </div>
    {:else if ((time=="past"))}
        <div class="col-lg-2 container">
        <div class="container text-center">
          <button class="row-lg mt-4 btn btn-outline-warning waves-effect" id="download" on:click={downloadBill}> Scarica fattura</button>
        </div>
        </div>
    {/if}
</div>
