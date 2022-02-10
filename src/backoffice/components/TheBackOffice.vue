<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link"
         v-on:click="updateTab(0)"
         :class="{active : isActive[0] || (!loggedIn && isActive[2])}"
         :aria-current="page = isActive[0] || (!loggedIn && isActive[2])"
         href="#">Inventario</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" 
         v-on:click="updateTab(1)"
         :class="{active : isActive[1]}"
         :aria-current="page = isActive[1]"
         href="#">Noleggi</a>
    </li>
    <li class="nav-item" v-if="loggedIn">
      <a class="nav-link"
         v-on:click="updateTab(2)"
         :class="{active : isActive[2]}"
         :aria-current="page = isActive[2]"
         href="#">Clienti</a>
    </li>
  </ul>
  <div v-if="this.isActive[0]">
    <TheInventory :test="this.test" :products="this.products"/>
  </div>
  <div v-else-if="this.isActive[1]">
    <TheOrders/>
  </div>
  <div v-else-if="this.isActive[2] && this.loggedIn">
    <TheClients/>
  </div>
</template>

<script>

import TheInventory from './TheInventory.vue'

export default {
  name: 'TheBackOffice',
  components: {
    TheInventory
  },
  props: ['products', 'test', 'loggedIn'],
  data () {
    return {
      isActive: [true, false, false]
    }
  },
  methods: {
    updateTab : function(tab) {
      for(let i = 0; i < this.isActive.length; i++) this.isActive[i] = false
      this.isActive[tab] = true
    }
  }
}
</script>

<style>
</style>
