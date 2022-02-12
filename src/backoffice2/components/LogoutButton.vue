<template>
  <button type="button"
    class="btn btn-primary"
    v-on:click="this.$emit('logged-out')">
    Logout</button>
</template>

<script>
export default {
  name: 'LogoutButton'
}
</script>
