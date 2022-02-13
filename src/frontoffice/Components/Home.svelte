<script>
import Searchbar from './Searchbar.svelte';
import Signlog from './Signlog.svelte';
import Signature from './Signature.svelte';
import Filter from './Filter.svelte';

import Modal from 'svelte-simple-modal';
import PrenotButton from './MyModal/PrenotButton.svelte'

let filosofi = [
    { "name": "Aaron David Gordon",
         "birth": "1856",
         "birth_p": "Ukraine",
         "death": "1922",
         "death_p": "Palestine",
         "subjects": "Agriculture, Zionism",
         "nolo_data": { "cost": 100,
             "available_from": "1/1/2345",
             "available_to": "7/3/2736",
             "discount": 0,
             "info": "",
             "condition": "Buono" }
     },
    {
        "name": "Aaron David Gordon",
        "birth": "1856",
        "birth_p": "Ukraine",
        "death": "1922",
        "death_p": "Palestine",
        "subjects": "Agriculture, Zionism",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Abraham Joshua Heschel",
        "birth": "1907",
        "birth_p": "Poland",
        "death": "1972",
        "death_p": "York",
        "subjects": "Judaism, Philosophy Of Religion",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Albert of Saxony",
        "birth": "1316",
        "birth_p": "Germany",
        "death": "1390",
        "death_p": "Germany",
        "subjects": "Gravity",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Alessandro Achillini",
        "birth": "1463",
        "birth_p": "Italy",
        "death": "1512",
        "death_p": "Bologna",
        "subjects": "William Of Ockham",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Alexander Gottlieb Baumgarten",
        "birth": "1714",
        "birth_p": "Germany",
        "death": "1762",
        "death_p": "Germany",
        "subjects": "Aesthetics, Gottfried Wilhelm Leibniz, Feeling, Christian, Baron Von Wolff",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Alexius Meinong",
        "birth": "1853",
        "birth_p": "Ukraine",
        "death": "1920",
        "death_p": "Austria",
        "subjects": "Objectivism, Intentionality",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Alfred Firmin Loisy",
        "birth": "1857",
        "birth_p": "France",
        "death": "1940",
        "death_p": "France",
        "subjects": "Philosophy Of Religion, Modernism",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Alfred Korzybski",
        "birth": "1879",
        "birth_p": "Poland",
        "death": "1950",
        "death_p": "Connecticut",
        "subjects": "Semantics, General Semantics",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Alfred North Whitehead",
        "birth": "1861",
        "birth_p": "England",
        "death": "1947",
        "death_p": "Massachusetts",
        "subjects": "Education, Mathematics, Philosophy Of Science, Formal Logic, Materialism",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Allan Bloom",
        "birth": "1930",
        "birth_p": "Indiana",
        "death": "1992",
        "death_p": "Illinois",
        "subjects": "Higher Education",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Anaxagoras",
        "birth": "500",
        "birth_p": "Clazomenae",
        "death": "428",
        "death_p": "Lampsacus",
        "subjects": "Eclipse, Cosmology, Nous",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Anicius Manlius Severinus Boethius",
        "birth": "475",
        "birth_p": "Italy",
        "death": "524",
        "death_p": "Italy",
        "subjects": "Aristotelianism, Universal, Trinity, Porphyry, Free Will",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    },
    {
        "name": "Antonio Labriola",
        "birth": "1843",
        "birth_p": "Sicilies",
        "death": "1904",
        "death_p": "Italy",
        "subjects": "Socialism, Historical Materialism",
        "nolo_data": { "cost": 100,
            "available_from": "1/1/2345",
            "available_to": "7/3/2736",
            "discount": 0,
            "info": "",
            "condition": "Buono" }
    }
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
