<script>
  import { loggedIn } from '../../stores.js';
  import Signlog from '../Signlog.svelte';
  import { getContext } from 'svelte';
  const { close } = getContext('simple-modal');
  import { onMount } from 'svelte';
  import jQ from 'jquery';

  let islogged;

	loggedIn.subscribe(value => {
		islogged = value;
	});

  export let filo = '';
  export const message = 'Hi';

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
    let costo = 250.99;
    let datefrom = document.getElementById('datefromnolo').value;
    let dateto = document.getElementById('datetonolo').value;
    if(datefrom<dateto) {
      const date1 = new Date(datefrom);
      const date2 = new Date(dateto);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      document.getElementById("preventivo").innerHTML="";
      const node = document.createElement("h5");

      const textnode1 = document.createTextNode("Costo del noleggio per "+ diffDays);
      node.appendChild(textnode1);
      if(diffDays>1) {
        const textnode2 = document.createTextNode(" giorni: ");
        node.appendChild(textnode2);
      }
      else {
        const textnode3 = document.createTextNode(" giorno: ");
        node.appendChild(textnode3);
      }
      const textnode4 = document.createTextNode(costo*diffDays);

      node.appendChild(textnode4);
      node.classList.add("font-weight-bold");
      node.classList.add( "text-secondary");

      document.getElementById("preventivo").appendChild(node);

    }
    else {
      document.getElementById("preventivo").innerHTML="";
      const node = document.createElement("h5");
      const textnode4 = document.createTextNode("Inserire delle date corette");

      node.appendChild(textnode4);
      node.classList.add("font-weight-bold");
      node.classList.add( "text-danger");

      document.getElementById("preventivo").appendChild(node);

    }

}

function sendnolo(){

}

</script>


<div class="modal-dialog modal-notify modal-warning prenotazione" role="document">
  <div class="modal-content container">
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
                            {filo.Philosophers}
                            </div>
                          </h6>
                          <div class="text-muted" data-abc="true">
                          {filo.Sub}
                          </div>
                      </div>
                      <div class="text-muted mb-3">
                      {filo.Born}
                      {filo.Birthp},
                      {filo.Died}
                      {filo.Deathp}
                      </div>
                      <h3 class="mb-0 font-weight-semibold">&euro; 250.99 al giorno</h3>

                  </div>
              </div>
          </div>
      <div class="col-lg">

        <div class="modal-header text-center">
        <h4 class="modal-title white-text w-100 font-weight-bold py-2">Noleggia {filo.Philosophers}</h4>
        </div>

        <h5 class="font-weight-bold text-secondary mt-4">
        Inserisci la date di noleggio
        </h5>
        <div class=" input-group mb-2 mr-sm-2">

          <div class="input-group-text customcol-smor">Da:</div>
              <input class="input-group date form-control" data-provide="datepicker" type="text" id="datefromnolo" value="">

            <div class="input-group-text rounded-0 border-left-0 border-right-0 customcol-smor">a:</div>
                <input type="text" class="input-group date form-control" data-provide="datepicker" id="datetonolo" value="">

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

<div class="modal-footer justify-content-center">
  <p type="button" class="btn btn-outline-warning waves-effect" on:click={sendnolo}>Send </p>
</div>

{/if}

    </div>
    </div>
  </div>
</div>
