<script>
import Searchbar from './Searchbar.svelte';
import Signlog from './Signlog.svelte';
import Signature from './Signature.svelte';
import Filter from './Filter.svelte';

import Modal from 'svelte-simple-modal';
import PrenotButton from './MyModal/PrenotButton.svelte';

import { onMount } from 'svelte';
import jQuery from 'jquery';

let filosofi = "";
let id;

onMount(() => {
	jQuery( document ).ready(function() {
		console.log(filosofi);
	});
});

</script>

<svelte:body/>
  <div class="home" id='home'>
  <Signlog/>
  <Signature/>
    <div class="container mt-2 position-absolute">
      <div class='row'>
        <div id='titolo' >Dining philosophers</div>
      </div>
        <div class=" row ricerca mt-4">
          <Searchbar bind:filosofi={filosofi}/>
        </div>
        <div class='row m-3'>
        <Filter/>
        </div>
      <div class='row dis'>

        {#each filosofi as filosofo}

        <div class="col-md-4 mt-2">
            <div class="card">
                <div class="card-body">
                    <div class="card-img-actions"> <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png" class="card-img img-fluid" width="96" height="350" alt=""> </div>
                </div>
                <div class="card-body bg-light text-center">
                    <div class="mb-2">
                        <h6 class="font-weight-semibold mb-2">
                          <div class="text-default mb-2" data-abc="true">
                          {filosofo.name}
                          </div>
                        </h6>
                        <div class="text-muted" data-abc="true">
                        {filosofo.subjects}
                        </div>
                    </div>
                    <div class="text-muted mb-3">
                    {filosofo.birth}
                    {filosofo.birth_p},
                    {filosofo.death}
                    {filosofo.death_p}
                    </div>
                    <h3 class="mb-0 font-weight-semibold">&euro; {filosofo.nolo_data.cost} al giorno</h3>
                    {#if (filosofo.nolo_data.discount>0)}
                    <h3 class="mb-0 font-weight-semibold text-danger">Sconto:  {filosofo.nolo_data.discount}&#37;</h3>

                    {/if}
                    <div class='mybooking'>
                    <Modal>
                      <PrenotButton philosopher={filosofo}/>
                    </Modal>
                    </div>
                </div>
            </div>
        </div>

        {/each}
    </div>
</div>
</div>
