<template lang="pug">
  #app
    img(src="./assets/logo.png")
    h1 {{mensaje}}
</template>

<script>
// import './assets/scss/main.scss'
export default {
  name: 'app',
  data () {
    return {
      mensaje: 'Que pasa mi amigo!'
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
</style>
