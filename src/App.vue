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
          a.button.is-rounded#btnInicio(@click="metodInicio" style="boxShadow:5px 5px 6px black;") Inicio
        li  
          .reparaciones
            a.button.is-rounded#btnReparaciones(@click="metodReparaciones") Reparaciones
        li
          .reportes
            a.button.is-rounded#btnReportes(@click="metodReportes") Reportes
        li
          a.button.is-rounded#btnUsarios(@click="metodUsuarios") Usuarios
    hr
    etqReporte(v-if="bolAgregar" v-on:agregando="metAppAgregarReporte")
    etqRegistroUsuario(v-if="bolRegistrarUsuario" v-on:agregando="metAppAgregarUsuario")
    //- .columns
    //-   .column.is-half A la mera mitad

</template>

<script>
// import './assets/scss/main.scss'

import Firebase from 'firebase';
import config from './config';
let app = Firebase.initializeApp(config);
let db = app.database();
let usuariosRef = db.ref('usuarios');
let reportesRef = db.ref('reportes');

import jsPDF from 'jspdf'
import subAgregar from './componentesVue/subAgregar.vue'
import registroUsuario from './componentesVue/registroUsuario.vue'


export default {
  name: 'app',
  data () {
    return {
      mensaje: 'Que pasa mi amigo',
      medidasSobra:"5px 5px 6px black",
      bolAgregar:true,
      usarongo:{
        nombre:"joel",
        usuario:"usuarioDe pRuebas",
        contrasena:"123"
      },
      bolRegistrarUsuario:false,
      tablaImprimir:[
        {titulo:'titulo 1', mensaje:'desc1'},
        {titulo:'titulo 2', mensaje:'desc2'},
      ]
    }
  },
  methods:{
    metodInicio(){
      var btnInicio = document.getElementById("btnInicio");
      btnInicio.style.boxShadow="5px 5px 6px black";
      this.bolAgregar=true;
      this.bolRegistrarUsuario=false;

      var btnReportes = document.getElementById("btnReportes");
      btnReportes.style.boxShadow="";

      var btnReparaciones = document.getElementById("btnReparaciones");
      btnReparaciones.style.boxShadow="";

      var btnUsarios = document.getElementById("btnUsarios");
      btnUsarios.style.boxShadow="";
    },
    metodReparaciones(){
      var btnInicio = document.getElementById("btnInicio");
      var btnReportes = document.getElementById("btnReportes");
      var btnReparaciones = document.getElementById("btnReparaciones");
      var btnUsarios = document.getElementById("btnUsarios");
      btnReparaciones.style.boxShadow="5px 5px 6px black";
      btnInicio.style.boxShadow="";
      btnReportes.style.boxShadow="";
      btnUsarios.style.boxShadow="";
    },
    metodReportes(){
      var btnInicio = document.getElementById("btnInicio");
      var btnReportes = document.getElementById("btnReportes");
      var btnReparaciones = document.getElementById("btnReparaciones");
      var btnUsarios = document.getElementById("btnUsarios");
      btnReportes.style.boxShadow="5px 5px 6px black";
      btnInicio.style.boxShadow="";
      btnReparaciones.style.boxShadow="";
      btnUsarios.style.boxShadow="";
    },
    metodUsuarios(){
      var btnInicio = document.getElementById("btnInicio");
      var btnReportes = document.getElementById("btnReportes");
      var btnReparaciones = document.getElementById("btnReparaciones");
      var btnUsarios = document.getElementById("btnUsarios");
      this.bolRegistrarUsuario=true;
      this.bolAgregar=false;
      btnReportes.style.boxShadow="";
      btnInicio.style.boxShadow="";
      btnReparaciones.style.boxShadow="";
      btnUsarios.style.boxShadow="5px 5px 6px black";
    },
    metAppAgregarUsuario:function(usuario){
      usuariosRef.push(usuario);
    },
    metAppAgregarReporte:function(reporte) {
      reportesRef.push(reporte);
      // console.log(`Quieres un reporte para ${reporte.nombre}?`);
      
    }

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
    etqReporte:subAgregar,
    etqRegistroUsuario:registroUsuario
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
//  #app{
//   background: url("fondo.jpeg");

//  }



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
.estar{
  box-shadow: 5px 5px 6px black;
  background: red;
}
</style>
