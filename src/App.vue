<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('paintings/setToken', token)
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
