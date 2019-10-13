<template lang="pug">
  #app
    nav#principal
        h1 Connection
        button#btncerrarSesion.button(v-if="bolBarraAdmin" @click="cerrarSesion")

        //- Cerrar Sesión
    //- table.table
    //-   thead
    //-     tr
    //-       th Usuario
    //-       th us.nombre
    //-   tbody
    //-     tr(v-for="us in usuarios")
    //-       th {{us.nombre}}
    //-       th 
    //-         button.button.is-danger(@click="eliminar()") hey!
    //- ul.list-group
    //-   li(v-for='tarea in usuarios')
    //-     p {{tarea.nombre}}
    //-     //- p.lead(:class='{completado: tarea.completado}')
    //-     button.button.is-danger(@click='eliminar(tarea.nombre)')
        //- input(v-model='tarea.titulo' v-show='editandoTarea === $index' @blur='editandoTarea = null, editarTarea(tarea)' type='text')
        //- div(v-show='tarea.uid === usuarioActivo.uid')

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
  // import db from '@/firebase'
let app = Firebase.initializeApp(config);
let db = app.database();
//db.ref('usuarios');

var admin = require("firebase");

// Get a database reference to our posts
var db2 = admin.database();
var ref = db2.ref("usuarios");


let sesion=true;
// let saludar= function(){
//   alert("Saluda desde fuera");
// }

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
    console.log(`Inicio usuario, key: ${uid}`);
    
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
let perfecto={};
export default {
  name: 'app',
  data () {
    return {
      usuarios:[
        {nombre:'kevin', edad:20},
        {nombre:'Risas', edad:25},
        {nombre:'Tenari', edad:26},
      ],
      mensaje: 'Que pasa mi amigo',
      vacio:"",
      bolBarraAdmin:true,
      bolLogin:false,
      bolForm:true,
      bolRegistrarUsuario:false,
      bolReparaciones:false,
      bolReportes:false,
    }
  },
  methods:{
    buscarFireBase(){
    const SELF =this;
    ref.on("value", function(snapshot) {
      console.log("Leyendo ref");
      console.log(snapshot.val());
      var objeto= snapshot.val();
      for(var propiedad in objeto)
      {
        SELF.usuarios.unshift({
          '.key':propiedad,
          nombre:objeto[propiedad].nombre,
          contrasena:objeto[propiedad].contrasena,

      }); 

      }
      }, 
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    },
    fnParametro:function(indice){
      console.log("Hola "+indice );
    },
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
      Firebase.createUserWithEmailAndPassword(usuario.email, usuario.contrasena)
      .then(function(data){
        // this.verificar();
        console.log(`Creaste un usuario ${data.val()}`);
        
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
      console.log(`Llego padre ${usuario} y ${usuario.email} `);
      console.log(`Llego key: ${usuario.uid}`);
      const SELF= this;
      Firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.contrasena)
      .then(function(data){
        console.log(`Entrando ${data}`);
        
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
