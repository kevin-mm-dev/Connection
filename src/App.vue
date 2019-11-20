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
    etqReparacion(v-if="bolReparaciones" v-bind:usuarioKey="usuarioKey" v-bind:coti="coti" v-bind:usuarios="usuarios" v-bind:repar="reportes" v-on:ensenarUsuarios="metAppMostrarUsuarios" v-on:actualizarReparaciones="metAppActualizarReparaciones" v-on:mostrarReparaciones="metAppMostrarReparaciones" v-on:mostrarCoti="metAppMostrarCoti" v-on:descargarPdf="metAppDescargarPdf" v-on:eliminarReporte="metAppEliminarReporte")
    etqReparacionTec(v-if="bolReparacionesTec" v-bind:repar="reportes" v-bind:coti="coti" v-bind:usuarios="usuarios"  v-on:mostrarReparaciones="metAppMostrarReparaciones" v-on:ensenarUsuarios="metAppMostrarUsuarios" v-on:coti="metAppCotizar" v-on:marcarReparado="metAppMarcarReparado" v-on:mostrarCoti="metAppMostrarCoti")
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
      usuarioTipo:'',
      bolBarraAdmin:false,
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
      // // var doc = new jsPDF();
      // //               //  Espacio Izq, espacio Top
      // // // doc.text(this.usuarioTipo, 50, 10);
      // // // doc.text(this.mensaje, 10, 10);
      // // doc.save('Exito.pdf');
      
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
          SELF.msgError('');
          }
        else {
          SELF.msgGuardado('');
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
          SELF.msgError('');
          }
        else {
          SELF.msgGuardado('');
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
          SELF.msgError('');
          }
        else {
          SELF.msgGuardado('');
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
      var auxRepo=SELF.reportes;
      fire.mostrarReparaciones(filtro,function(params) {
          SELF.reportes=params;
      });
    },
    metAppEliminarReporte(repoKey){
      const SELF=this
      fire.eliminarReporte(repoKey,function(error){
        if (error) {
          SELF.msgError('');
          }
        else {
          SELF.msgGuardado('');
        }
      })
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
    metAppActualizarReparaciones(reporte){
      
      const SELF= this;
      fire.actualizarReparaciones(reporte,function(error){
        if (error) {
          SELF.msgError('');
          }
        else {
          SELF.msgGuardado('');
        }
      })
    },
    metAppMarcarReparado(key,ind)
    {
      const SELF=this;
      fire.marcarReparadoReporte(key,ind,function(error){
              if (error) {
                  SELF.msgError('');
                }
                else {
                  SELF.msgGuardado('');
                  var filtro=new Object();
                  filtro.tipo='';
                  filtro.valor='';
                  fire.mostrarReparaciones(filtro,function(params) {
                  SELF.reportes=params;
                });
              }
            });
    },
    metAppIniciarSesion: function (usuario) {
      const SELF= this;
       fire.iniciarSesionAuth(usuario,
        function saleBien(key,tipo) {
          SELF.usuarioKey=key;
          SELF.usuarioTipo=tipo;
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
    },
    metAppAgregarReporte:function(reporte) {
      const SELF = this;
      reporte.usuario=this.usuarioKey;
      fire.agregarReporte(reporte,function(error){
        if (error) {
          SELF.msgError('');
          }
        else {
          SELF.msgGuardado('');
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
          SELF.msgError('');
          }
        else {
          SELF.msgGuardado('');
            fire.marcarCotizadoReporte(coti.repoKey,function(error){
              if (error) {
                }
              else {
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
    msgAcualizado(){
      toastr.success('La tabla fue actualizada! ');
    },
    msgGuardado(msg){
      toastr.success('Se realizo exitosamente!! '+msg);
    },
    msgError(msg)
    {
      toastr.error(`Hubo un error al intentar la operación --
        ${msg}` );
    },
    metAppDescargarPdf(exped,costo,obser,re,fechaHoy)
    {
      // var doc = new jsPDF('p','mm','letter');
      // var logo = new Image();
      // logo.src = 'k.jpg';
      // doc.addImage(logo, 'JPEG', 15, 40,148,210);
      // doc.save('Prueba.pdf');
      // // Use http://dataurl.net/#dataurlmaker

      
      
      var imgData = 'data:image/jpeg;base64,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';
      var doc = new jsPDF()

      //////// HEADER
      doc.addImage(imgData, 'JPEG',3, 3, 95, 30)
      doc.rect(130, 3, 70, 30)
      doc.setFontSize(13)
      doc.text(158, 10, 'FECHA')
      doc.line(200, 13, 130, 13) 
      doc.setFontSize(18)
      doc.setTextColor(95, 125, 250)
      doc.text(145, 25, re.fecha)
      ////////// TITULO
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(18)
      doc.text(5, 45, 'CALLE PINO SUAREZ #221 B OTE. PASANDO DONATO GUERRA')
      doc.text(40, 55, 'DURANGO, DURANGO. CEL: (618)164-74-74')

      ///////// FORMULARIO CLIENTE
      doc.setDrawColor(0)
      doc.setFillColor(255, 255, 255)

      doc.roundedRect(10, 65, 190, 30, 3, 3, 'FD')
      doc.setFontSize(12)
      doc.text(15, 75, 'NOMBRE:')
      doc.line(40, 78, 190, 78) 
      var nombre=re.nombreCliente;
      doc.setTextColor(95, 125, 250)
      doc.text(40, 75, nombre)
      doc.setTextColor(0)
      doc.text(15, 88, 'TEL. CASA:')
      doc.line(40, 91, 100, 91) 
      var tel=re.telefonoCliente;
      doc.setTextColor(95, 125, 250)
      doc.text(40, 88, tel)
      doc.setTextColor(0)
      doc.text(108, 88, 'CEL:')
      doc.line(120, 91, 190, 91) 
      var cel=re.celularCliente;
      doc.setTextColor(95, 125, 250)
      doc.text(120, 88, cel)

      doc.setTextColor(0)
      doc.text(15, 105, 'MARCA:')
      doc.line(33, 107, 100, 107) 
      var marca=re.marca;
      doc.setTextColor(95, 125, 250)
      doc.text(35, 105, marca)

      doc.setTextColor(0)
      doc.text(15, 118, 'MODELO:')
      doc.line(35, 120, 100, 120) 
      var modelo=re.modelo;
      doc.setTextColor(95, 125, 250)
      doc.text(38, 118, modelo)


      doc.setDrawColor(0)
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(115, 98, 85, 30, 3, 3, 'FD')
      doc.setTextColor(0)
      doc.text(118, 105, 'ACCESORIOS:')
      doc.setTextColor(95, 125, 250)
      var accesorios=re.acces;
      var splitTitle = doc.splitTextToSize(accesorios, 80);
      doc.text(118, 113, splitTitle);
      doc.setTextColor(0)
      doc.text(15, 135, 'IMEI o (S/N):')
      doc.line(43, 138, 200, 138) 
      var imei=re.chip;
      doc.setTextColor(95, 125, 250)
      doc.text(45, 135, imei)

      doc.setTextColor(0)
      doc.text(15, 148, 'CONDICIONES DE EQUIPO:')
      doc.line(73, 150, 200, 150) 
      var condSplit = doc.splitTextToSize(re.cond, 120);
      doc.setTextColor(95, 125, 250)
      doc.text(75, 148, condSplit)


      doc.setDrawColor(0)
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(15, 156, 185, 25, 3, 3, 'FD')
      doc.setTextColor(0)
      doc.text(20, 163, 'FALLA(S):')
      doc.setTextColor(95, 125, 250)
      var fall=re.fallas;
      var fallas = doc.splitTextToSize(fall, 180);
      doc.text(20, 169, fallas)

      doc.setDrawColor(0)
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(15, 183, 185, 20, 3, 3, 'FD')
      doc.setTextColor(0)
      doc.text(20, 190, 'REPARACIÓN Y OBSERVACIONES:')
      doc.setTextColor(95, 125, 250)
      var obs=obser;
      var observacion = doc.splitTextToSize(obs, 180);
      doc.text(20, 195, observacion);
      doc.setTextColor(0)

      doc.setDrawColor(0)
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(15, 205, 95, 10, 3, 3, 'FD')
      //doc.setTextColor(0)
      doc.text(20, 212, 'FECHA DE ENTREGA:')
      doc.setTextColor(95, 125, 250)
      doc.text(70, 212,exped)
      doc.setDrawColor(0)
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(135, 205, 65, 10, 3, 3, 'FD')
      doc.setTextColor(0)
      doc.text(140, 212, 'TOTAL:')
      doc.setTextColor(95, 125, 250)
      doc.setFontSize(15)
      doc.text(158, 212,'$'+ costo)


      doc.setDrawColor(0)
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(15, 218, 185, 38, 3, 3, 'FD')
      doc.setTextColor(0)
      doc.setFontSize(10)
      doc.text(18, 223, '1.- SIN ORDEN DE SERVICIO NO SE ENTREGA EQUIPO.')
      doc.text(18, 228, '2.- DESPUÉS DE 15 DIAS DE ENTREGADO SU EQUIPO PERDERA LA GARANTÍA.')
      doc.text(18, 233, '3.- SOLO SE HARÁ GARANTÍA SOBRE LA MISMA FALLA DEL EQUIPO.')
      doc.text(18, 238, '4.- DESPUÉS DE 45 DÍAS DE NO RECOGER SU EQUIPO NO NOS HACEMOS RESPONSABLES DE EL.')
      doc.text(18, 243, '5.- AL EXTRAVIAR SU NOTA SOLO PODRA RECOGER EL EQUIPO EL TITULAR CON PREVIA ')
      doc.text(18, 248, ' IDENTIFICACIÓN.')
      doc.text(18, 253, '6.- EQUIPOS MOJADOS NO CUENTAN CON GARANTÍA.')
      doc.text(25, 283, 'FIRMA DE RECIBIDO DE CONFORMIDAD')
      doc.text(125, 283, 'FIRMA DE ENTREGA A SERVICIO')
      doc.line(18, 278, 100, 278) 
      doc.line(115, 278, 195, 278) 
      doc.save(`Reporte ${fechaHoy}.pdf`);
      
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
