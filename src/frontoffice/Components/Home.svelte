<script>
import Searchbar from './Searchbar.svelte';
import Signlog from './Signlog.svelte';
import Signature from './Signature.svelte';
import Filter from './Filter.svelte';

import Modal from 'svelte-simple-modal';
import PrenotButton from './MyModal/PrenotButton.svelte'

let filosofi = [
    {
        "Philosophers": "Aaron David Gordon",
        "Born": "1856",
        "Birth place": "Ukraine",
        "Died": "1922",
        "Place of Death": "Palestine",
        "Subjects Of Study": "Agriculture, Zionism"
    },
    {
        "Philosophers": "Abraham Joshua Heschel",
        "Born": "1907",
        "Birth place": "Poland",
        "Died": "1972",
        "Place of Death": "York",
        "Subjects Of Study": "Judaism, Philosophy Of Religion"
    },
    {
        "Philosophers": "Albert of Saxony",
        "Born": "1316",
        "Birth place": "Germany",
        "Died": "1390",
        "Place of Death": "Germany",
        "Subjects Of Study": "Gravity"
    },
    {
        "Philosophers": "Alessandro Achillini",
        "Born": "1463",
        "Birth place": "Italy",
        "Died": "1512",
        "Place of Death": "Bologna",
        "Subjects Of Study": "William Of Ockham"
    },
    {
        "Philosophers": "Alexander Gottlieb Baumgarten",
        "Born": "1714",
        "Birth place": "Germany",
        "Died": "1762",
        "Place of Death": "Germany",
        "Subjects Of Study": "Aesthetics, Gottfried Wilhelm Leibniz, Feeling, Christian, Baron Von Wolff"
    },
    {
        "Philosophers": "Alexius Meinong",
        "Born": "1853",
        "Birth place": "Ukraine",
        "Died": "1920",
        "Place of Death": "Austria",
        "Subjects Of Study": "Objectivism, Intentionality"
    },
    {
        "Philosophers": "Alfred Firmin Loisy",
        "Born": "1857",
        "Birth place": "France",
        "Died": "1940",
        "Place of Death": "France",
        "Subjects Of Study": "Philosophy Of Religion, Modernism"
    },
    {
        "Philosophers": "Alfred Korzybski",
        "Born": "1879",
        "Birth place": "Poland",
        "Died": "1950",
        "Place of Death": "Connecticut",
        "Subjects Of Study": "Semantics, General Semantics"
    },
    {
        "Philosophers": "Alfred North Whitehead",
        "Born": "1861",
        "Birth place": "England",
        "Died": "1947",
        "Place of Death": "Massachusetts",
        "Subjects Of Study": "Education, Mathematics, Philosophy Of Science, Formal Logic, Materialism"
    },
    {
        "Philosophers": "Allan Bloom",
        "Born": "1930",
        "Birth place": "Indiana",
        "Died": "1992",
        "Place of Death": "Illinois",
        "Subjects Of Study": "Higher Education"
    },
    {
        "Philosophers": "Anaxagoras",
        "Born": "500",
        "Birth place": "Clazomenae",
        "Died": "428",
        "Place of Death": "Lampsacus",
        "Subjects Of Study": "Eclipse, Cosmology, Nous"
    },
    {
        "Philosophers": "Anicius Manlius Severinus Boethius",
        "Born": "475",
        "Birth place": "Italy",
        "Died": "524",
        "Place of Death": "Italy",
        "Subjects Of Study": "Aristotelianism, Universal, Trinity, Porphyry, Free Will"
    },
    {
        "Philosophers": "Antonio Labriola",
        "Born": "1843",
        "Birth place": "Sicilies",
        "Died": "1904",
        "Place of Death": "Italy",
        "Subjects Of Study": "Socialism, Historical Materialism"
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
                          {filosofo.Philosophers}
                          </div>
                        </h6>
                        <div class="text-muted" data-abc="true">
                        {filosofo.Sub}
                        </div>
                    </div>
                    <div class="text-muted mb-3">
                    {filosofo.Born}
                    {filosofo.Birthp},
                    {filosofo.Died}
                    {filosofo.Deathp}
                    </div>
                    <h3 class="mb-0 font-weight-semibold">&euro; 250.99 al giorno</h3>
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
