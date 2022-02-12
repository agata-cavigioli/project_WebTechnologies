<template>
  <h4 class="mb-1">{{ this.elementType }}</h4>
  <form class="form-inline my-2 my-lg-0">
    <input class="form-control mr-sm-2 mb-1"
           v-model="elementSearch"
           type="search"
           placeholder="Search"
           aria-label="Search">
  </form>
  <ul class="list-group">
    <li v-for="elem in Object.keys(this.elements)">
      <a href="#"
         v-if="elem.includes(this.elementSearch)"
         class="list-group-item list-group-item-action"
         :class="{active : elem == this.selectedElement}"
         v-on:click="selectedElement = elem; this.$emit(selection-changed, elem);">
        {{ elem }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FuzzySearch',
  props: ['elements', 'elementType'],
  data () {
    return {
      elementSearch: '',
      selectedElement: undefined
    }
  }
}
</script>

<style>
li {
  text-align: left;
  list-style-type: none;
}
</style>
