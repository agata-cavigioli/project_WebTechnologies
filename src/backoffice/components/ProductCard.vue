<template>
  <div v-if="!this.editing" class="card text-start">
    <div class="card-body">
      <div class="row"> 
        <div class="col"> 
          <h5 class="card-title fw-bold">{{this.product.Philosophers}}</h5>
          <p class="card-text">
            {{this.product['Birth place']}}, {{this.product['Born']}} -
            <span v-if="this.product['Place of Death'] != this.product['Birth place']">
              {{this.product['Place of Death']}}
            </span> {{this.product['Died']}}
          </p>
          <h6 class="fw-bold">Tematiche:</h6>
          <p class="card-text">
            {{this.product['Subjects Of Study']}}
          </p>
        </div>
        <div class="col"> 
          <img src="https://picsum.photos/400" class="card-img-top" alt="...">
        </div>
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        Prezzo:
      </li>
      <li class="list-group-item">
        Disponibilità:
      </li>
      <li class="list-group-item">
        In sconto:
      </li>
      <li class="list-group-item">
        Note:
      </li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link"
         v-on:click="this.editing = true"
        >Modifica</a>
      <a href="#" class="card-link"
        >Elimina</a>
    </div>
  </div>
  <div v-else class="card text-start">
    <div class="card-body">
      <input type="text"
             v-model="new_name"
             class="card-title fw-bold form-control"
             :placeholder="this.product.Philosophers"
             aria-label="Name">

      <div class="row mb-2">
        <div class="col">
          <input type="text"
                 v-model="new_name"
                 class="card-text form-control"
                 :placeholder="this.product['Birth place']"
                 aria-label="Birth place">
        </div>
        <div class="col">
          <input type="text"
                 v-model="new_name"
                 class="card-text form-control"
                 :placeholder="this.product['Born']"
                 aria-label="Born">
        </div>
      </div>


      <div class="row mb-2">
        <div class="col">
          <input type="text"
                 v-model="new_name"
                 class="card-text form-control"
                 :placeholder="this.product['Place of Death']"
                 aria-label="Place_of_death">
        </div>
        <div class="col">
          <input type="text"
                 v-model="new_name"
                 class="card-text form-control"
                 :placeholder="this.product['Died']"
                 aria-label="Died">
        </div>
      </div>



      <h6 class="fw-bold">Tematiche:</h6>
      <input type="text"
             v-model="new_name"
             class="card-text form-control"
             :placeholder="this.product['Subjects Of Study']"
             aria-label="Subjects">
    </div>
    <!--
      <div class="col"> 
      <img src="https://picsum.photos/400" class="card-img-top" alt="...">
      </div>
    -->
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <div class="row">
          <div class="col">
            Prezzo:
          </div>
          <div class="col">
            <input type="text"
                   v-model="new_name"
                   class="card-text form-control"
                   aria-label="Subjects">
          </div>
        </div>
      </li>
      <li class="list-group-item">
        <div class="row">
          <div class="col">
            Disponibilità:
          </div>
          <div class="col">
            <input type="text"
                   v-model="new_name"
                   class="card-text form-control"
                   aria-label="Subjects">
          </div>
        </div>
      </li><li class="list-group-item">
        <div class="row">
          <div class="col">
            Sconto:
          </div>
          <div class="col">
            <input type="text"
                   v-model="new_name"
                   class="card-text form-control"
                   aria-label="Subjects">
          </div>
        </div>
      </li><li class="list-group-item">
        <div class="row">
          <div class="col">
            Note:
          </div>
          <div class="col">
            <input type="text"
                   v-model="new_name"
                   class="card-text form-control"
                   aria-label="Subjects">
          </div>
        </div>
      </li>
    </ul>
    <div class="card-body">
      <a href="#"
         class="card-link"
         v-on:click="this.editing = false">Salva</a>
      <a href="#"
         class="card-link"
         v-on:click="this.editing = false"
         >Annulla</a>
    </div>
  </div>

</template>
<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  data () {
    return {
      editing: false
    }
  }
}
</script>
<style>
</style>

disponibilità
sconti
note
costo

