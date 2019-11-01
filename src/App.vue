<template lang="pug">
  #app
    nav#principal
        h1(v-model="tituloH") Connection
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

    etqbarraAdmin(v-if="bolBarraAdmin" v-bind:tipoUs="usuarioTipo" v-on:cambiando="cambiarEtiqueta")
    etqLogin(v-if="bolLogin" v-on:iniciandoSesion="metAppIniciarSesion")
    etqFormulario(v-if="bolForm" v-on:agregando="metAppAgregarReporte")
    etqReparacion(v-if="bolReparaciones" v-bind:usuarioKey="usuarioKey" v-bind:coti="coti" v-bind:usuarios="usuarios" v-bind:repar="reportes" v-on:ensenarUsuarios="metAppMostrarUsuarios" v-on:actualizarReparaciones="metAppActualizarReparaciones" v-on:mostrarReparaciones="metAppMostrarReparaciones" v-on:mostrarCoti="metAppMostrarCoti")
    etqReparacionTec(v-if="bolReparacionesTec" v-bind:repar="reportes" v-bind:usuarios="usuarios"  v-on:mostrarReparaciones="metAppMostrarReparaciones" v-on:ensenarUsuarios="metAppMostrarUsuarios" v-on:coti="metAppCotizar")
    //- etqReparacion(v-if="bolReparaciones")
    etqRegistroUsuario(v-if="bolRegistrarUsuario" v-bind:usuariosReg="usuarios" v-on:agregando="metAppAgregarUsuario"
    v-on:mostrarUsuarios="metAppMostrarUsuarios" v-on:actualizarUsuarios="metAppActualizarUsuarios" v-on:borrarUsuarios="metAppBorrarUsuarios")

    //- .columns
    //- .column.is-half A la mera mitad


</template>

<script>

//////////////------ COMPONENTES
import barraAdmin from './componentesVue/barraAdmin.vue'
import subAgregar from './componentesVue/subAgregar.vue'
import subReparTec from './componentesVue/subReparTec.vue'
import subRepar from './componentesVue/subRepar.vue'
import registroUsuario from './componentesVue/registroUsuario.vue'
import login from './componentesVue/login.vue'

import toastr from 'toastr';
import jsPDF from 'jspdf';
// import Firebase from 'firebase';
import fire from './firebase.js';
let usuarioActivo;

export default {
  name: 'app',
  created(){
    fire.status(function(data){
      try{
        usuarioActivo=data.email;
      }catch(e){

        if (usuarioActivo) {
          console.log(`Bienvenido ${usuarioActivo}`);
        }else{
          console.log(`usuarioActivo esta vacio`);
        }
      }
      
    });
    
  },
  data () {
    return {
      tituloH:'Hola titulo',
      usuarios:[],
      reportes:[],
      coti:[],
      mensaje: 'Que pasa mi amigo',
      vacio:"",
      usuarioKey:'',
      usuarioTipo:'Técnico',
      bolBarraAdmin:true,
      bolLogin:true,
      bolForm:false,
      bolRegistrarUsuario:false,
      bolReparaciones:false,
      bolReparacionesTec:false,
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
      // console.log("Hola fnParametro 3"+indice );
      alert("Resolviendo... 2")
      this.bolLogin=2;
      caroorongo="hola";
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
          if(this.usuarioTipo=='Técnico')
          {
            this.bolReparacionesTec=true;

          }else{
            this.bolReparaciones=true;

          }

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
      this.bolReparacionesTec=false;
      this.bolReportes=false;
    },
    limpiarComponentes(){
        this.bolLogin=true;
        this.bolBarraAdmin=false;
        this.bolReparaciones=false;
        this.bolReparacionesTec=false;
        usuarioActivo=undefined;
    },
    ingresar(){
      this.bolLogin=true;
      this.bolBarraAdmin=true;
    },
    cerrarSesion(){
      /// https://parall.ax/products/jspdf (Probar)
      /// https://rawgit.com/MrRio/jsPDF/master/docs/index.html  (Mas docu)
      // var doc = new jsPDF();
      //                Espacio Izq, espacio Top
      // doc.text(this.usuarioTipo, 50, 10);
      // doc.text(this.mensaje, 10, 10);
      // doc.save('Exito.pdf');
      const SELF = this;
      fire.cerrarSesion().then(function() {
        SELF.limpiarEtiquetas();
        SELF.bolLogin=true;
        SELF.bolBarraAdmin=false;
        usuarioActivo=undefined;
        console.log("Saliendo...");
        limpiarComponentes();
      }).catch(function(error) {
        console.log("Error en la salida --"+error.message);
      });

    },
    metAppAgregarUsuario:function(usuario){
      const SELF=this;
      if (usuarioActivo==undefined) {
        console.log("Los siento/a, no puede registrar usuarios ");
        SELF.msgError(SELF.vacio);
      }else{
        fire.crearUsuario(usuario,function(error){
        if (error) {
          SELF.msgError();
          }
        else {
          SELF.msgGuardado();
        }
      });
      }
    
    },metAppActualizarUsuarios:function(usuario){
      const SELF=this;
      
      if (usuarioActivo==undefined) {
        console.log("Los siento joven/a, no puede registrar usuarios ");
        SELF.msgError(SELF.vacio);
      }else{
        fire.actualizarUsuario(usuario,function(error){
        if (error) {
          SELF.msgError();
          }
        else {
          SELF.msgGuardado();
        }
      });
      }
    },
    metAppBorrarUsuarios(keyUsuario){
      const SELF =this;
       if (usuarioActivo==undefined) {
        console.log("Los siento joven/a, no puede borrar usuarios ");
        SELF.msgError(SELF.vacio);
      }else{
        fire.borrarUsuario(keyUsuario,function(error){
        if (error) {
          SELF.msgError();
          }
        else {
          SELF.msgGuardado();
        }
      });
      }
    },
    metAppMostrarUsuarios(){
      const SELF =this;
      fire.mostrarUsuarios(this.usuarios,function(params) {
        SELF.usuarios=params;
      });
    },
    metAppMostrarReparaciones(filtro){
      const SELF =this;
      if(filtro.tipo=='keyUsuario')
      {
        if(filtro.valor=='')
        {
          filtro.valor=this.usuarioKey;
        }
      }
      fire.mostrarReparaciones(filtro,function(params) {
          SELF.reportes=params;
      });
    },
    metAppMostrarCoti(repoKey)
    {
      const SELF= this;
      fire.mostrarCoti(repoKey,function(params) {
        SELF.coti=params;
      });
    },
    metAppEnsenarUsuarios(usuariosConReportes){
      fire.mostrarUsuarios(usuariosConReportes,function(params) {
        usuariosConReportes=params;
      });
    },
    metAppActualizarReparaciones(){
      fire.actualizarReparaciones(reporte,function(error){
        if (error) {
          SELF.msgError();
          }
        else {
          SELF.msgGuardado();
        }
      })
    },
    // validarUsuario:function (usu) {
    //   if (usu.usuario==='' && usu.contrasena==='' ) {
    //     this.msgError("El usuario no debe ser campo vacío");
    //   }else{
    //     if(us.){

    //     }
    //   }
    //   return
    // },

    metAppIniciarSesion: function (usuario) {
      const SELF= this;
       fire.iniciarSesionAuth(usuario,
        function saleBien(key,tipo) {
          SELF.usuarioKey=key;
          SELF.usuarioTipo=tipo;
          // SELF.msgGuardado(`Bienvenido ${SELF.usuarioKey} ${SELF.usuarioTipo}`);
          SELF.bolLogin=false;
          SELF.bolForm=true;
          SELF.bolBarraAdmin=true;
        },
        function noExiste() {
          SELF.msgError('El usuario no esta registrado');
          SELF.cerrarSesion();
        }
        )
        .catch(function(error) {
          SELF.cerrarSesion();
        var errorCode = error.code;
        var errorMessage = error.message;
        SELF.msgError(errorMessage);
      }); 
      // else{
    //           fire.status(function(data){
    //             usuarioActivo=data;
    //           });
    //         SELF.bolForm=true;
    //         SELF.bolBarraAdmin=true;
    //         SELF.bolLogin=false;
    //     }
    //   })
    //   .catch(function(error) {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   SELF.msgError(errorMessage);
    // });
    },
    metAppAgregarReporte:function(reporte) {
      const SELF = this;
      reporte.usuario=this.usuarioKey;
      fire.agregarReporte(reporte,function(error){
        if (error) {
          SELF.msgError();
          }
        else {
          SELF.msgGuardado();
        }
      });
    },
    metAppCotizar(coti)
    {
      const SELF= this;
      /// Avisar usuario que fue cotizado
      /// Avisar sucursal que fue cotizado 

      fire.agregarCoti(coti,function(error){
        if (error) {
          SELF.msgError();
          }
        else {
          SELF.msgGuardado();
            fire.marcarCotizadoReporte(coti.repoKey,function(error){
              if (error) {
                // SELF.msgError();
                }
              else {
                // SELF.msgGuardado();
                var filtro=new Object();
                filtro.tipo='';
                filtro.valor='';
                fire.mostrarReparaciones(filtro,function(params) {
                 SELF.reportes=params;
                });
              }
            })
            }
      });
      // alert(`Hola ${coti.obser} que key ${coti.repKey}`);
    },
    mostrarCoti(repoKey)
    {
       const SELF= this;
      /// Avisar usuario que fue cotizado
      /// Avisar sucursal que fue cotizado 
      fire.mostrarCoti(repoKey,function(params) {
        SELF.coti=params;
      });


    },
    msgGuardado(msg){
      toastr.success('Guardado exitosamente!! '+msg);
    },
    msgError(msg)
    {
      toastr.error(`Hubo un error al intentar la operación --
        ${msg}` );
    },
  },
  components:{
    etqFormulario:subAgregar,
    etqReparacion:subRepar,
    etqReparacionTec:subReparTec,
    etqRegistroUsuario:registroUsuario,
    etqLogin:login,
    etqbarraAdmin:barraAdmin,
  },



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
#btncerrarSesion{
  border-style: none;
  background: url("./assets/cerrar.png");
  background-size: 100%;
  width: 52px;
  height: 52px;
}

</style>
