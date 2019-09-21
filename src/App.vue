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
    etqAgregar
    //- .columns
    //-   .column.is-half A la mera mitad

</template>

<script>
// import './assets/scss/main.scss'
import jsPDF from 'jspdf'
import subAgregar from './componentesVue/subAgregar.vue'
export default {
  name: 'app',
  data () {
    return {
      mensaje: 'Que pasa mi amigo',
      tablaImprimir:[
        {titulo:'titulo 1', mensaje:'desc1'},
        {titulo:'titulo 2', mensaje:'desc2'},
      ]
    }
  },
  methods:{
    saludar(){
      alert("Esto es un metodo");
    },
    //  exportar(){
       
    //   const SELF=this;
    //   var columnas=[
    //     {titulo:"aquiTitulo", datakey:"titukey"},
    //     {titulo:"mensajes", datakey:"menskey"}
    //   ];
    //   var doc=new jsPDF('p','pt');
    //   doc.autoTable(columnas, SELF.tablaImprimir);
    //   doc.save('aquitudoc.pdf');

    // }
  },
  components:{
    etqAgregar:subAgregar
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
</style>
