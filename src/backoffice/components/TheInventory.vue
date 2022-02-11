<template>
  <div class="bg-white p-3 row">
    <div class="table-responsive col-lg-8 col-12">
      <table id="twrap" class="text-start
      table table-striped table-hover 
      ">
        <thead id="header" >
          <tr>
            <th scope="col">
              Nome
              <form class="d-flex">
                <input
                  v-model="name"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
            <th scope="col">
              Nascita
              <form class="d-flex">
                <input
                  v-model="birth"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
            <th scope="col">
              Luogo Nascita
              <form class="d-flex">
                <input
                  v-model="birth_place"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
            <th scope="col">
              Morte
              <form class="d-flex">
                <input
                  v-model="death"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
            <th scope="col">
              Luogo Morte
              <form class="d-flex">
                <input
                  v-model="death_place"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
            <th scope="col">
              Tematiche
              <form class="d-flex">
                <input
                  v-model="subject"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="philosopher in this.prods">
            <td href="card"
                v-if="anyStringIncluded(philosopher)"
                v-on:click="this.selectedProduct = philosopher"
                v-for="field in philosopher">
              {{field}}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row justify-content-start g-3">
        <div class="col col-lg-2">
          <button class="w-100 btn btn-primary mb-2"
                  type="">
            Nuovo 
          </button>
        </div>
        <div class="col col-lg-2">
          <a class="w-100 btn btn-primary mb-2"
             v-on:click="resetFields" 
             href="#header"
             role="button"
             type="reset">
            Reset
          </a>
        </div>
        <div class="col col-lg-2">
          <a class="w-100 btn btn-primary mb-2"
             href="#header"
             role="button">
            Top
          </a>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-12 ">
      <ProductCard id="card"
                   v-if="this.selectedProduct != undefined"
                   :product="this.selectedProduct"
                   :loggedIn="this.loggedIn"
                   />
      <h4 v-else> No product selected.</h4>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import ProductCard from './ProductCard.vue'

export default {

  name: 'TheInventory',
  props: ['loggedIn', 'products'], 
  components: {
    ProductCard
  },
  data () {
    return {
      selectedProduct: undefined,
      name: '',
      birth: '',
      birth_place: '',
      death: '',
      death_place: '',
      subject: '',
      fields : ['Nome', 'Nascita', 'Luogo Nascita', 'Morte', 'Luogo Morte', 'Tematiche'],
      prods : this.products({}, {}, 'test'),
    }
  },
  methods : {
    resetFields : function() {
      this.name='';
      this.birth='';
      this.birth_place='';
      this.death='';
      this.death_place='';
      this.subject='';
    },
    anyStringIncluded : function(philosopher) {
      return philosopher['Philosophers'].includes(this.name) &&
        philosopher['Born'].includes(this.birth) &&
        philosopher['Birth place'].includes(this.birth_place) &&
        philosopher['Died'].includes(this.death) && 
        philosopher['Place of Death'].includes(this.death_place) &&
        philosopher['Subjects Of Study'].includes(this.subject);
    }
  }
}
</script>

<style>
#twrap {
  max-height: 60vh;
  overflow: auto;
  display:inline-block;
  -ms-overflow-style: none;
  scrollbar-width: none;  
}

#twrap::-webkit-scrollbar {
  display: none;
}

th, td {
  width: 16.6%;
}

</style>
