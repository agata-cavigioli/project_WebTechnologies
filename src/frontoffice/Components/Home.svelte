<script>
import Searchbar from './Searchbar.svelte';
import Signlog from './Signlog.svelte';
import Signature from './Signature.svelte';
import Filter from './Filter.svelte';

import Modal from 'svelte-simple-modal';
import PrenotButton from './MyModal/PrenotButton.svelte'

let filosofi = [
  {
"name": "Aaron David Gordon",
"birth": "1856",
"birth_p": "Ukraine",
"death": "1922",
"death_p": "Palestine",
"subjects": "Agriculture, Zionism",
"nolo_data": {
  "cost": 134,
  "available_from": "",
   "available_to": "",
   "discount": 0,
   "condition": "Entusiasta",
   "info": ""}},
{"name": "Abraham Joshua Heschel", "birth": "1907", "birth_p": "Poland", "death": "1972", "death_p": "York", "subjects": "Judaism, Philosophy Of Religion", "nolo_data": {"cost": 245, "available_from": "", "available_to": "", "discount": 50, "condition": "Gi\\u00fa di morale", "info": ""}},
{"name": "Albert of Saxony", "birth": "1316", "birth_p": "Germany", "death": "1390", "death_p": "Germany", "subjects": "Gravity", "nolo_data": {"cost": 295, "available_from": "", "available_to": "", "discount": 0, "condition": "Entusiasta", "info": ""}},
{"name": "Alessandro Achillini", "birth": "1463", "birth_p": "Italy", "death": "1512", "death_p": "Bologna", "subjects": "William Of Ockham", "nolo_data": {"cost": 116, "available_from": "", "available_to": "", "discount": 0, "condition": "Riflessivo", "info": ""}},
{"name": "Alexander Gottlieb Baumgarten", "birth": "1714", "birth_p": "Germany", "death": "1762", "death_p": "Germany", "subjects": "Aesthetics, Gottfried Wilhelm Leibniz, Feeling, Christian, Baron Von Wolff", "nolo_data": {"cost": 165, "available_from": "", "available_to": "", "discount": 0, "condition": "Entusiasta", "info": ""}},
{"name": "Alexius Meinong", "birth": "1853", "birth_p": "Ukraine", "death": "1920", "death_p": "Austria", "subjects": "Objectivism, Intentionality", "nolo_data": {"cost": 130, "available_from": "", "available_to": "", "discount": 10, "condition": "Riflessivo", "info": ""}},
{"name": "Alfred Firmin Loisy", "birth": "1857", "birth_p": "France", "death": "1940", "death_p": "France", "subjects": "Philosophy Of Religion, Modernism", "nolo_data": {"cost": 226, "available_from": "", "available_to": "", "discount": 10, "condition": "Riflessivo", "info": ""}}
]

/*
window.onload = () => {
  const container = document.getElementById("cardcontainer");
  const row = document.createElement("div");
  row.classList.add("row");
  for (let i = 0; i < 5; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("col-md-4");
    card.classList.add("mt-2");
    card.classList.add("p-2");
    card.innerHTML +=
              "<div class='card'> \
                      <div class='card-body'> \
                          <div class='card-img-actions'> \
                            <img src='https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png' \
                                  class='card-img img-fluid' width='96' height='350' alt=''>\
                          </div> \
                      </div> \
                      <div class='card-body bg-light text-center'> \
                          <div class='mb-2'> \
                              <h6 class='font-weight-semibold mb-2'>\
                               <a href='#' class='text-default mb-2' data-abc='true'>\
                             {{prod.nome}}                               </a>\
                               </h6>\
                               <a href='#' class='text-muted' data-abc='true'>\
                               Laptops & Notebooks\
                               </a> \
                          </div> \
                          <h3 class='mb-0 font-weight-semibold'>$250.99</h3> \
                          <div> <i class='fa fa-star star'></i> <i class='fa fa-star star'></i> <i class='fa fa-star star'></i> <i class='fa fa-star star'></i> </div> \
                          <div class='text-muted mb-3'>34 reviews</div> <button type='button' class='btn bg-cart'><i class='fa fa-cart-plus mr-2'></i> Add to cart</button> \
                      </div> \
                  </div>";

    row.appendChild(card);
}
container.appendChild(row);
};
*/

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
          <Searchbar/>
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
