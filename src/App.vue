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
      //- .db-content  
      //-   .columns(style="width=100%")
      //-     .column.is-2
      //-       img.imgModulo.opcion(src="./assets/Titulo11.png")
      //-       a.txtInicio Inicio
      //-       //- .Inicio
      //-     .column.is-3.opcion
      //-       .reportes
      //-         img.imgModulo(src="./assets/Titulo11.png")
      //-         a.txtReportes Reparaciones
            
      ul
        li 
          a.button.is-rounded.txtInicio(@click="inicio") Inicio
        li  
          .reparaciones
            //- img.imgModulo.modReparaciones(src="./assets/Titulo11.png")
            a.button.is-rounded.txtReparaciones Reparaciones
          //- a Reparaciones
        li
          .reportes
            a.button.is-rounded Reportes
        li
          a.button.is-rounded Usuarios
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
    inicio(){
      alert("Estas en inicio");
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
.txtReportes{
  background: peru;
}
.column a{
  list-style: none;
  color: white;
}
.imgModulo{
    height: 33px;
}
#menuAdmin li a{
  background: $button-hover-border-color;
  height:23px;
}

</style>
