<template>
  <div class="row p-3 bg-white border rounded">
    <div class="pt-1 col-12 col-md-3">
      <h4 class="mb-1">Categorie</h4>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2 mb-1"
               v-model="categorySearch"
               type="search"
               placeholder="Search"
               aria-label="Search">
      </form>
      <ul class="list-group">
        <li v-for="cat in Object.keys(this.categories)">
          <a href="#elements"
             v-if="cat.includes(this.categorySearch)"
             class="list-group-item list-group-item-action"
             :class="{active : cat == this.selectedCategory}"
             v-on:click="
             this.selectedCategory = cat;
             if (this.selectedCategory != undefined)
             this.selectedElement = this.categories[this.selectedCategory].elements[0]
             ">
            {{ cat }}
          </a>
        </li>
      </ul>
    </div>
    <div id="elements" class="pt-1 col-12 col-md-5">
      <h4 class="mb-1">{{ elementType }}</h4>
      <input class="form-control mr-sm-2 mb-1"
             v-model="elementSearch"
             type="search"
             placeholder="Search"
             aria-label="Search">
      <ul v-if="this.selectedCategory != undefined" class="list-group">
        <li v-for="elem in this.categories[this.selectedCategory].elements">
          <a href="#details"
             v-if="elem.includes(this.elementSearch)"
             class="list-group-item list-group-item-action"
             :class="{active : elem == this.selectedElement}"
             v-on:click="this.selectedElement = elem">
            {{ elem }}
          </a>
        </li>
      </ul>
    </div>
    <div id="details" class="pt-1 col-12 col-md-4">
      <h4 class="mb-1">Dettagli</h4>
      {{ this.selectedElement }}
    </div>
  </div>
</template>

<script>
export default {

  name: 'BackOfficeTab',
  props: ['categories', 'elementType'],
  data () {
    return {
      selectedCategory: undefined,
      selectedElement: undefined,
      categorySearch: '',
      elementSearch: '' 
    }
  },
}
</script>

<style>
h4 {
  text-align: left;
}

li {
  text-align: left;
  list-style-type: none;
}
</style>
