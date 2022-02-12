<template>
  <button type="button"
    class="btn btn-primary"
    v-on:click="this.$emit('logging-in')">
    Login</button>
</template>

<script>
export default {
  name: 'LoginButton'
}
</script>
