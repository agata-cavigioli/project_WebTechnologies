<script>
  import { loggedIn, userID } from '../../stores.js';
  import Signlog from '../Signlog.svelte';
  import { getContext } from 'svelte';
  const { close } = getContext('simple-modal');
  import { onMount } from 'svelte';
  import jQuery from 'jquery';

  let islogged;
  let user;
  let confermato = false;
  var booking = {};
  export let filo = '';
  export const message = 'Hi';

  let nolotime = "present";


	loggedIn.subscribe(value => {
		islogged = value;
	});
  userID.subscribe(value => {
		user = value;
	});

  onMount(() => {
    jQuery( document ).ready(function() {
      var close = document.getElementsByClassName("close")[0];
      close.id="closemodal";

      close.addEventListener("click", function() {
      let element;
        if (element=document.getElementById('home')){
        document.getElementById('home').classList.remove("overflow-hidden");
        document.getElementById('home').classList.add("overflow-auto");
      }
    });
  });
 });

function preventivo(){
  //remove red stars
  document.getElementById("inserimentodate").innerHTML = "Inserisci la date di noleggio";

  const stars = document.querySelectorAll('.redstar');
    stars.forEach(redstar => {
    redstar.remove();
    });
    //

    let costo = filo.nolo_data.cost;
    let discount = filo.nolo_data.discount;
    let datefrom = document.getElementById('datefromnolo').value;
    let dateto = document.getElementById('datetonolo').value;
    let sendprev = true;
    if(datefrom && dateto) {
      const date1 = new Date(datefrom);
      const date2 = new Date(dateto);
      const diffTime = date2 - date1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      const today = new Date();
      const diffTimetoday = today - date1;
      const diffDaystoday = Math.ceil(diffTimetoday / (1000 * 60 * 60 * 24)) - 1;
      console.log( "diffdays" + diffDays);
      console.log(diffDaystoday);
      if (diffDaystoday>0) {
        document.getElementById("inserimentodate").innerHTML+= "<br><div class='text-danger'>Inserire una data di inizio successiva ad oggi</div>";
        redstar('dadate');
        redstar('todate');
        sendprev = false;
      }
      else if (diffDays<1){
        document.getElementById("inserimentodate").innerHTML+= "<br><div class='text-danger'>Modificare la data di fine noleggio</div>";
        redstar('dadate');
        redstar('todate');
        sendprev = false;
      }
      if(sendprev){document.getElementById("preventivo").innerHTML="";
      const node = document.createElement("h5");

      const totale = document.createElement("div");
      totale.innerHTML = "Costo del noleggio per "+ diffDays;

      if(diffDays>1) {
        totale.innerHTML += " giorni: &euro; ";
      }
      else {
        totale.innerHTML += " giorno: &euro; ";
      }
      totale.innerHTML += costo*diffDays;
      node.appendChild(totale);

      const finale = document.createElement("div");
      finale.innerHTML = "Prezzo finale: &euro;" + ((costo*diffDays)-((costo*diffDays*discount)/100));
      node.appendChild(finale);

      totale.classList.add("font-weight-bold");
      totale.classList.add( "text-secondary");
      finale.classList.add("font-weight-bold");
      finale.classList.add( "text-danger");

      document.getElementById("preventivo").appendChild(node);}


    }
    else {
      document.getElementById("inserimentodate").innerHTML+= "<br><div class='text-danger'>Inserire le date</div>";
      redstar('dadate');
      redstar('todate');
      document.getElementById("preventivo").innerHTML="";
    }

}

function redstar(id){
  const redstar = document.createElement("span");
  redstar.innerHTML = "&#42;";

  redstar.classList.add( "text-danger");
  redstar.classList.add( "fw-bold");
  redstar.classList.add( "redstar");


  document.getElementById(id).appendChild(redstar);
}

async function checkAvailability(product_id, from, to){
     let url = "http://site202123.tw.cs.unibo.it/nolos?product_id=" + product_id;
     console.log(url);
     var prod_nolos = await jQuery.get(url);
     console.log(prod_nolos);
     var date_from = new Date(from);
     var date_to = new Date(to);

     for(n in prod_nolos){
         let nol = prod_nolos[n];

         let sdate = new Date(nol.date_from);
         let edate = new Date(nol.date_to);

         if((date_from > sdate && date_from < edate) ||
             (date_to > sdate && date_to < edate))
             console.log('non disponibile');
              return false;
     }
     console.log("checked");
     return true;
}

function sendnolo(){
  document.getElementById("inserimentodate").innerHTML = "Inserisci la date di noleggio";
  const stars = document.querySelectorAll('.redstar');
    stars.forEach(redstar => {
    redstar.remove();
    });
    var sendcheck = true;
    var bookingArray = [];
  let datefrom = document.getElementById('datefromnolo').value;
  let dateto = document.getElementById('datetonolo').value;

  if(datefrom && dateto) {
    const date1 = new Date(datefrom);
    const date2 = new Date(dateto);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const today = new Date();
    const diffTimetoday = today - date1;
    const diffDaystoday = Math.ceil(diffTimetoday / (1000 * 60 * 60 * 24)) - 1;
    console.log(diffDays);
    console.log(diffDaystoday);
    if (diffDaystoday>0) {
      document.getElementById("inserimentodate").innerHTML+= "<br><div class='text-danger'>Inserire una data di inizio successiva ad oggi</div>";
      redstar('dadate');
      redstar('todate');
      sendcheck = false;
    }
    else if (diffDays<1){
      document.getElementById("inserimentodate").innerHTML+= "<br><div class='text-danger'>Modificare la data di fine noleggio</div>";
      redstar('dadate');
      redstar('todate');
      sendcheck = false;
    }
    else if (!checkAvailability(filo.id, datefrom, dateto)){
      document.getElementById("inserimentodate").innerHTML+= "<br><div class='text-danger'>Il filosofo non &eacute; disponibile in queste date</div>";
      redstar('dadate');
      redstar('todate');
      sendcheck = false;
    }
    else{
    document.getElementById("inserimentodate").innerHTML = "Inserisci la date di noleggio";
    booking.date_from = datefrom;
    booking.date_to = dateto;
    booking.diffdate = diffDays;}

  }
  else{
    document.getElementById("inserimentodate").innerHTML+= "<br><div class='text-danger'>Inserire le date</div>";
    redstar('dadate');
    redstar('todate');
    sendcheck = false;
  }
  let note = document.getElementById('notefromnolo').value;
  booking.nolo_data = {};
  if(note){
    booking.nolo_data.info = note;
  }
  else booking.nolo_data.info = "";

  let payment = document.getElementById('inputGroupPay').value;
  if(payment){
    booking.payment = payment;
  }
  else {
    redstar('paylabel');
    sendcheck = false;
  }

  if(sendcheck){
    booking.product_id = filo.id;
    booking.client_id = user;
    booking.dep_id = -1;
    const date1 = new Date(datefrom);
    const today = new Date();
    const diffTimetoday = today - date1;
    const diffDaystoday = Math.ceil(diffTimetoday / (1000 * 60 * 60 * 24)) - 1;
    booking.status = (diffDaystoday==0) ? "Iniziato" : "Prenotato";
    console.log(booking.status);
    booking.nolo_data.discount = filo.nolo_data.discount;
    booking.nolo_data.daily_cost = filo.nolo_data.cost;
    booking.nolo_data.other_fees = 0;
  bookingArray.push({...booking});
  confermato = true;
  booking = bookingArray[0];
  console.log(booking);
}

}



async function confirm(){
//POST booking
if (booking){
  //console.log("stringa: " + JSON.stringify(signupArray));
  //console.log("array" + signupArray);
  //let created =
  await jQuery.post("http://site202123.tw.cs.unibo.it/nolos",booking).done(
    function(res){
      console.log("booking posted");
    }
  );

  confermato = false;

  let element;
  if (element=document.getElementById('home')){
  document.getElementById('home').classList.remove("overflow-hidden");
  document.getElementById('home').classList.add("overflow-auto");
  }
  close()
  }
}

</script>


<div class="modal-dialog modal-notify modal-warning prenotazione" role="document">
  <div class="modal-content container" id="prenot-modal-content" tabindex="-1">
      <div class='row'>
          <div class="col-lg m-2">
              <div class="card">
                  <div class="card-body">
                      <div class="card-img-actions"> <img src={filo.img} class="card-img "  height="350" alt=""> </div>
                  </div>
                  <div class="card-body bg-light text-center">
                      <div class="mb-2">
                          <h6 class="font-weight-semibold mb-2">
                            <div class="text-default mb-2" data-abc="true">
                            {filo.name}
                            </div>
                          </h6>
                          <div class="text-muted" data-abc="true">
                          {filo.subjects}
                          </div>
                      </div>
                      <div class="text-muted mb-3">
                      {filo.birth}
                      {filo.birth_p},
                      {filo.death}
                      {filo.death_p}
                      </div>
                      <h3 class="mb-0 font-weight-semibold">&euro; {filo.nolo_data.cost} al giorno</h3>
                      {#if (filo.nolo_data.discount>0)}
                      <h3 class="mb-0 font-weight-semibold text-danger">Sconto:  {filo.nolo_data.discount}&#37;</h3>

                      {/if}
                  </div>
              </div>
          </div>

      <div class="col-lg">

        <div class="modal-header text-center">
        <h4 class="modal-title white-text w-100 font-weight-bold py-2">Noleggia {filo.name}</h4>
        </div>
        {#if !confermato}
        <h5 id="inserimentodate" class="font-weight-bold text-secondary mt-4">
        Inserisci la date di noleggio
        </h5>
        <div class=" input-group mb-2 mr-sm-2">

          <div class="input-group-text customcol-smor" id='dadate'>Da:</div>
              <input class="input-group date form-control" type="date" id="datefromnolo" value="">

            <div class="input-group-text rounded-0 border-left-0 border-right-0 customcol-smor" id="todate">a:</div>
                <input type="date" class="input-group date form-control"  id="datetonolo" value="">

      </div>

      {#if !islogged}

      <button  class="btn btn-outline-warning waves-effect" on:click={preventivo}>Calcola un preventivo</button>
      <div id="preventivo">
      </div>

      <div class="modal-footer justify-content-center container">
      <h5 class="font-weight-bold text-danger mt-4 row">
      Attenzione! Il filosofo potrebbe non essere disponibile delle date selezionate
      </h5>
      <h5 class="font-weight-bold text-secondary row">
      Registrati o accedi per noleggiare
      </h5>
      <div class="row nolosign">
        <Signlog/>
        </div>
      </div>


{:else if islogged}

<h5 class="font-weight-bold text-secondary mt-4" id="paylabel">
Inserisci il tuo metodo di pagamento
</h5>
  <select class="custom-select form-control mb-4" id="inputGroupPay">
    <option selected value="">Choose...</option>
    <option value="PayPal">PayPal</option>
    <option value="Carta di Credito">Carta di Credito</option>
    <option value="Carta Regalo">Carta Regalo</option>
      </select>
<h5 class="font-weight-bold text-secondary mt-4" id="addresslabel">
Inserisci eventuali note
</h5>
<div class=" input-group mb-2 mr-sm-2">
      <input class="input-group form-control"  type="text" id="notefromnolo" value="">
</div>

<div class="modal-footer justify-content-center">
  <p type="button" class="btn btn-outline-warning waves-effect" on:click={sendnolo}>Procedi al pagamento</p>
</div>

{/if}
{:else if confermato}


<h4 class="font-weight-bold text-my mt-4">
Riepilogo dell'ordine
</h4>
<h5 class="font-weight-bold text-secondary mt-4" id="riepilogodiv">
Periodo: da {booking.date_from} a {booking.date_to}
<br>
Costo per {booking.diffdate} {(booking.diffdate>1)? "giorni":"giorno"}: &euro;{booking.diffdate*filo.nolo_data.cost}
<br>
Sconto applicato: {filo.nolo_data.discount}&#37;
<br>
<div class="text-danger">
Prezzo finale: &euro; {(booking.diffdate*filo.nolo_data.cost)-((booking.diffdate*filo.nolo_data.cost*filo.nolo_data.discount)/100)}
</div>
Metodo di pagamento: {booking.payment}
<br>
Note: {booking.nolo_data.info}
</h5>


<div class="modal-footer justify-content-center">
  <p type="button" class="btn btn-outline-info waves-effect" on:click={()=>(confermato = false)}>Modifica</p>
  <p type="button" class="btn btn-outline-warning waves-effect" on:click={confirm}>Conferma</p>

</div>
{/if}

    </div>
    </div>
  </div>
</div>
