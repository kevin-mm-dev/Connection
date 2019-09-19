<!--
    img(src="./assets/logo.png")
    h1 {{mensaje}}
-->


<template lang="pug">
  #app
    nav#principal
      h1 Connection
      button Log Out
    nav#menuAdmin 
      ul
          li 
            a Inicio
          li  
            a Reparaciones
          li
            a Reportes
          li
            a Usuarios
    hr
    section
      h1.txtTitulo Agregar reparación
      .fondo
      hr#lnSubtitulo
</template>

<script>
// import './assets/scss/main.scss'
export default {
  name: 'app',
  data () {
    return {
      mensaje: 'Que pasa mi amigo'
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
</style>
