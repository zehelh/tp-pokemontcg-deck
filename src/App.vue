<template>
  <navbar-app></navbar-app>
  <router-view></router-view>
</template>

<script>
import NavbarApp from './components/UI/NavbarApp'

export default {
  name: 'App',
  components: {
    NavbarApp,
  }
}
</script>

<style lang="scss">
body {
  font-family: 'Raleway', sans-serif;
}
</style>
