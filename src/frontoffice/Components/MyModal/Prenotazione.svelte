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
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

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
  const stars = document.querySelectorAll('.redstar');
    stars.forEach(redstar => {
    redstar.remove();
    });
    //

    let costo = filo.nolo_data.cost;
    let discount = filo.nolo_data.discount;
    let datefrom = document.getElementById('datefromnolo').value;
    let dateto = document.getElementById('datetonolo').value;
    if(datefrom && dateto && datefrom<=dateto && datefrom>=today) {
      const date1 = new Date(datefrom);
      const date2 = new Date(dateto);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      document.getElementById("preventivo").innerHTML="";
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

      document.getElementById("preventivo").appendChild(node);

    }
    else {
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

function sendnolo(){
  const stars = document.querySelectorAll('.redstar');
    stars.forEach(redstar => {
    redstar.remove();
    });
    var sendcheck = true;
    var bookingArray = [];
  let datefrom = document.getElementById('datefromnolo').value;
  let dateto = document.getElementById('datetonolo').value;
  if(datefrom && dateto && datefrom<=dateto && datefrom>=today) {
    const date1 = new Date(datefrom);
    const date2 = new Date(dateto);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    booking.date_from = datefrom;
    booking.date_to = dateto;
    booking.diffdate = diffDays;
  }
  else{
    redstar('dadate');
    redstar('todate');
    sendcheck = false;
  }
  let note = document.getElementById('notefromnolo').value;
  booking.nolo_data = {};
  if(note){
    booking.nolo_data.info = note;
  }

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
    booking.status = (datefrom==today) ? "started" : "booked";
    booking.nolo_data.discount = filo.nolo_data.discount;
    booking.nolo_data.cost = filo.nolo_data.cost;
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
  if (element=document.getElementById('home')&& !document.getElementById('prenot-modal-content')){
  document.getElementById('home').classList.remove("overflow-hidden");
  document.getElementById('home').classList.add("overflow-auto");
  }
  close()
  }
}

</script>


<div class="modal-dialog modal-notify modal-warning prenotazione" role="document">
  <div class="modal-content container" id="prenot-modal-content">
      <div class='row'>
          <div class="col-lg m-2">
              <div class="card">
                  <div class="card-body">
                      <div class="card-img-actions"> <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png" class="card-img img-fluid" width="96" height="350" alt=""> </div>
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
        <h5 class="font-weight-bold text-secondary mt-4">
        Inserisci la date di noleggio
        </h5>
        <div class=" input-group mb-2 mr-sm-2">

          <div class="input-group-text customcol-smor" id='dadate'>Da:</div>
              <input class="input-group date form-control" type="date" id="datefromnolo" value="">

            <div class="input-group-text rounded-0 border-left-0 border-right-0 customcol-smor" id="todate">a:</div>
                <input type="date" class="input-group date form-control"  id="datetonolo" value="">

      </div>

      {#if !islogged}

      <p type="button" class="btn btn-outline-warning waves-effect" on:click={preventivo}>Calcola un preventivo</p>
      <div id="preventivo">
      </div>

      <div class="modal-footer justify-content-center container">
      <h5 class="font-weight-bold text-secondary mt-4 row">
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


<h4 class="font-weight-bold text-info mt-4">
Riepilogo dell'ordine
</h4>
<h5 class="font-weight-bold text-secondary mt-4" id="riepilogodiv">
Periodo: da {booking.datefrom} a {booking.dateto}
<br>
Costo per {booking.diffdate} {(booking.diffdate>1)? "giorni":"giorno"}: &euro;{booking.diffdate*filo.nolo_data.cost}
<br>
Sconto applicato: {filo.nolo_data.discount}&#37;
<br>
<div class="text-danger">
Prezzo finale: &euro;{(booking.diffdate*filo.nolo_data.cost)-((booking.diffdate*filo.nolo_data.cost*filo.nolo_data.discount)/100)}
</div>
Metodo di pagamento: {booking.payment}
Note: {filo.nolo_data.info}
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
