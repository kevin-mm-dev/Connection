<template lang="pug">
  #app
    nav#principal
        h1 Connection
        button#btncerrarSesion.button(v-if="bolBarraAdmin" @click="cerrarSesion") 
       
        //- Cerrar Sesión
    etqbarraAdmin(v-if="bolBarraAdmin" v-on:cambiando="cambiarEtiqueta")
    etqLogin(v-if="bolLogin" v-on:iniciandoSesion="metAppIniciarSesion")
    etqFormulario(v-if="bolForm" v-on:agregando="metAppAgregarReporte")
    etqRegistroUsuario(v-if="bolRegistrarUsuario" v-on:agregando="metAppAgregarUsuario")
    //- .columns
    //- .column.is-half A la mera mitad
    

</template>

<script>
// import './assets/scss/main.scss'
//////////////------ COMPONENTES
import barraAdmin from './componentesVue/barraAdmin.vue'
import subAgregar from './componentesVue/subAgregar.vue'
import registroUsuario from './componentesVue/registroUsuario.vue'
import login from './componentesVue/login.vue'

import toastr from 'toastr';
import Firebase from 'firebase';
import config from './config';

let app = Firebase.initializeApp(config);
let db = app.database();
let usuariosRef = db.ref('usuarios');
let reportesRef = db.ref('reportes');
let sesion=true;
let saludar= function(){
  alert("Saluda desde fuera");
}
// import jsPDF from 'jspdf'



function observador(){
  Firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    console.log(`Estas adentro ${email}`);
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    var contenido = document.getElementById('contenido');
    sesion=true;
    // ...
  } else {
    console.log(`No estas logeado`);
    sesion=false;
    
    // User is signed out.
    // ...
  }
});
}
observador();
// saludar();

export default {
  name: 'app',
  data () {
    return {
      mensaje: 'Que pasa mi amigo',
      medidasSobra:"5px 5px 6px black",
      vacio:"",
      bolBarraAdmin:true,
      bolLogin:false,
      bolForm:true,
      bolRegistrarUsuario:false,
      bolReparaciones:false,
      bolReportes:false,
      tablaImprimir:[
        {titulo:'titulo 1', mensaje:'desc1'},
        {titulo:'titulo 2', mensaje:'desc2'},
      ]
    }
  },
  methods:{
    cambiarEtiqueta(modulo){
      switch(modulo)
      {
        case 'inicio':
          this.limpiarEtiquetas();
          this.bolForm=true;

          break;
        case 'reparaciones':
          this.limpiarEtiquetas();
          this.bolReparaciones=true;
          
          break;
        case 'reportes':
          this.limpiarEtiquetas();
          this.bolReportes=true;
          
          break;
        case 'usuarios':
          this.limpiarEtiquetas();
          this.bolRegistrarUsuario=true;
          // alert("Que haciendo");
          
          break;
      }
    },
    limpiarEtiquetas(){
      this.bolLogin=false;
      this.bolForm=false;
      this.bolRegistrarUsuario=false;
      this.bolReparaciones=false;
      this.bolReportes=false;
    },
    ingresar(){
      this.bolLogin=true;  
      this.bolBarraAdmin=true;
    },
    cerrarSesion(){
      // saludar=function(){
      //   alert("Cambiado");
      // }
      // saludar();
      this.limpiarEtiquetas();
      this.bolLogin=true;
      this.bolBarraAdmin=false;
      Firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Saliendo...");
        
      }).catch(function(error) {
        console.log("Error en la salida --"+error.message);
        // An error happened.
      });
      
    },
    metAppAgregarUsuario:function(usuario){
      const SELF=this;    
      Firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.contrasena)
      .then(function(){
        this.verificar();
        SELF.msgGuardado();
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        SELF.msgError(errorMessage);
        // ...
      });
    },
    metAppIniciarSesion:function (usuario) {
      console.log(`Llego padre ${usuario.email} y ${usuario.contrasena} `);
      const SELF= this;
      Firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.contrasena)
      .then(function(){
        SELF.bolForm=true;

        SELF.bolBarraAdmin=true;

        SELF.bolLogin=false;
      })
      .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      SELF.msgError(errorMessage);
    });
    },
    metAppAgregarReporte:function(reporte) {
      reportesRef.push(reporte);
      this.msgGuardado();
    },
    msgGuardado(){
      toastr.success('Guardado exitosamente!!');
    },
    msgError(msg)
    {
      toastr.error(`Hubo un error al intentar la operación --
        ${msg}` );
    },
    // validar(){
    //   var user = firebase.auth().currentUser;
    //   user.sendEmailVerification().then(function() {
    //     // Sign-out successful.
    //     console.log("Enviando correo");
        
    //   }).catch(function(error) {
    //     // An error happened.
    //     console.log(`Erro en enviar verificacion ${error}`);
        
    //   });
    // },
  },
  components:{
    etqFormulario:subAgregar,
    etqRegistroUsuario:registroUsuario,
    etqLogin:login,
    etqbarraAdmin:barraAdmin,
  },
  firebase:{
  usuarios : usuariosRef
  },



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
#btncerrarSesion{
  border-style: none;
  background: url("./assets/cerrar.png");
  background-size: 100%;
  width: 52px;
  height: 52px;
}
// #menuAdmin li a{
//   background: $button-hover-border-color;
//   height:23px;
// }
// .estar{
//   box-shadow: 5px 5px 6px black;
//   background: red;
// }
</style>
