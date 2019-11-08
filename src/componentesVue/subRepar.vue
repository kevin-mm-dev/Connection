<template lang="pug">
  #subAgregar
    .fondoTitulo
    h1.txtTitulo Reparaciones
    hr.txtTitulo
    br
    br
    .divTabla(v-show="bolTabla")
      br
      br
      br
      form.columns(@submit.prevent="mostrar('nombreCliente',clienteBuscar)")
          .column.is-three-quarters.divBarraBuscar
            .field
              .control
                input.input.is-primary.txtBuscar(v-model="clienteBuscar" placeholder="Cliente")
          .column
            .field
              .control
                button.button.is-success(type="submit") BUSCAR
      button.button.is-info( @click="mostrar('','')") Mis Reparaciones
    .select(v-show="bolTabla")
      select(id="selctUsuarios" v-if="usuarios!=''" v-model="reporDeUsuario").opcionesUsuarios
        option( v-for="us in usuarios") {{us.usuario}}
    button.button.is-success(v-show="bolTabla" @click="filtrarRepor") Filtrar
    .select(v-show="1<0")
      select(id="selctLlaves" v-if="usuarios!=''" v-model="reporDeUsuario").opcionesUsuarios
        option( v-for="us in usuarios") {{us.key}} 
    etqTabla(v-show="bolTabla" v-bind:usuarioKey="usuarioKey" v-bind:listaReportes="repar"  v-on:tablaEditar="editarReporte" v-on:mostrarCoti="mostrarCoti" v-on:imprimirReporte="imprimirReporte" v-on:eliminarReporte="eliminarReporte")
    form.paginaReporte(v-if="bolEditar")
      a.button.is-rounded.btnMostrarUsu(@click="cerrarverReporte")
          span.icon.is-small
            i.fas.fa-3x.fa-arrow-circle-left
      h2.txtSubTitulo Cliente 
      br
      br
      .marco.marco2
        .columns
          .column.is-half
            .field
              .control.control
                label.label Celular :
                  input.input(v-model="reportes.celularCliente" name="cel" type="tel" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
          .column.is-half
            .field
              .control.control
                label.label.telefono Telefono de Casa :
                  input.input(v-model="reportes.telefonoCliente" name="tel" type="tel" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
        .control
          label.label Nombre :
            .control
              input.input(v-model="reportes.nombreCliente" name="name" type="text" placeholder="" )
      br
      br
      h2.txtSubTitulo Equipo 
      br
      .marco.marco2
        .bd-content(style ="width:100%;")
          .columns
            .column.is-half
              .field
                .control
                  label.label IMEI o (S/N) :
                    input.input(v-model="reportes.chip" name="marca" type="text" placeholder="" )
                    p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
                  label.label Marca :
                    input.input(v-model="reportes.marca" name="modelo" type="text" placeholder="")
            .column.is-half
              .field
                .control
                  label.label Accesorios :
                    textarea.textarea.is-warning(v-model="reportes.acces" name="accesorios" placeholder="...")
          .field
            .control
              label.label Modelo y Color:
                input.input(v-model="reportes.modelo" name="modelo" type="text" placeholder="")
              label.label Condiciones del Equipo :
                textarea.textarea(v-model="reportes.cond" name="condiciones" type="text" placeholder="")
              label.label Fallas del Equipo :
                textarea.textarea(v-model="reportes.fallas" name="condiciones" type="text" placeholder="")      
    
      br
      .btnAceptar
        a.button.is-success.btnCien.btnAceptar(@click="actualizarReparaciones")  
          span.icon.is-small
            i.fas.fa-check
          span Guardar   
    br                
    br                
    br                
    br                
    br                
    br                
    br                
    br
    .pound                
    img.imgFooter(src="../assets/celular.png")
    footer.footer
    #modalMostrarCotizar.modal.is-close
      .modal-background
      .modal-card
        header.modal-card-head
          p.modal-card-title Cotización
          button.delete(@click="cerrarModal" aria-label='close')
        section.modal-card-body
          .content(v-for="cot in coti")
            h1 Observaciones
            textarea.textarea(v-model="cot.obser" id="obsCoti" disabled)
            .field
              .control
            label Precio:
            input.input(v-model="cot.precio" disabled) 
            .field
              .control
            label Fecha Termina:
            input.input(v-model="cot.fecha" disabled) 
        footer.modal-card-foot
          //- button.button.is-success(@click="mandarReparar") Reparar
          button.button.is-success(@click="cerrarModal") Okey
    #modalImprimir.modal.is-close
      .modal-background
      .modal-card
        header.modal-card-head
          h1.modal-card-title Preparado para Imprimir Reporte
          button.delete(@click="cerrarModalImp" aria-label='close')
        section.modal-card-body
          .content(v-for="cot in coti")
            h4 Fecha Impresión:
            .control.columns
              .column.is-half
                input.input.date(v-model="cot.fecha" type="date" id="fechaCoti" min="2018-03-25" max="2030-12-25")
            .control
              h4 Precio:
              .field
                label
                  |     Cotizacion
                  input.input(v-model="cot.precio" type="number" id="valorCoti" ) 
                  
        footer.modal-card-foot
          button.button.is-success(id="btnDescargar" @click="descargarReporte") Descargar PDF

</template>

<script>
import tablaReportes from './tablaReportes.vue'
import mostrarCoti from './mostrarCotizar.vue'

export default {
  name: 'subRepar',
  props:['repar','coti','usuarios','usuarioKey'],
  data (){
    return {
      clienteBuscar:'',
      filtro :new Object(),
      campoCompleto:'',
      reporDeUsuario:'',
      precio:'',
      fecha:'',
      listaReportes:[],
      bolEditar:false,
      bolTabla:true,
        reportes:{
        usuario:'',
        nombreCliente:'',
        celularCliente:'',
        telefonoCliente:'',
        chip:'',
        marca:'',
        modelo:'',
        fallas:'',
        cond:'',
        acces:'',
        
        }
    }
  },
  methods:{
    
    mostrar(tipo,valor) {
      
      this.filtro.tipo=tipo;
      this.filtro.valor=valor;

      this.$emit('mostrarReparaciones',this.filtro);
      this.$emit('ensenarUsuarios',this.usuarios);
      // setTimeout(heredarReportes(),3000);
      
      // this.limpiarReporte();
    },
    
    filtrar()
    {
      let reportesFiltrados=[];
      for(var repo in this.listaReportes)
      {
        if(repo.nombreCliente==this.clienteBuscar)
        {
          reportesFiltrados.push(repo);
        }
      }
      this.listaReportes=reportesFiltrados;
    },
    limpiarReporte(){
      this.reportes={
        usuario:'',
        nombreCliente:'',
        celularCliente:'',
        telefonoCliente:'',
        chip:'',
        marca:'',
        modelo:'',
        fallas:'',
        cond:'',
        acces:'',
        }
    },
    editarReporte(re)
    {
      var fec=this.fechaHoy();
      this.limpiarVistas();
      this.bolEditar=true;
      this.reportes=re;
    },
    limpiarVistas()
    {
      this.bolEditar=false;
      this.bolTabla=false;
    },
    fechaHoy:function(){
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        return yyyy+'-'+mm+'-'+dd;

    },
    mostrarCoti(re)
    {
      this.$emit('mostrarCoti',re.key);
      this.abrirModal();
      
    },
    abrirModal(){
      var modal= document.getElementById("modalMostrarCotizar");
      modal.classList.remove('is-close');
      modal.classList.add('is-active');
    },
    cerrarModal(){
      console.log("Nada por?");
      var modal= document.getElementById("modalMostrarCotizar");
      modal.classList.remove('is-active');
      modal.classList.add('is-close');
      
    },
    abrirModalImp(){
      var modal= document.getElementById("modalImprimir");
      modal.classList.remove('is-close');
      modal.classList.add('is-active');
    },
    cerrarModalImp(){
      console.log("Nada por?");
      var modal= document.getElementById("modalImprimir");
      modal.classList.remove('is-active');
      modal.classList.add('is-close');
      
    },filtrarRepor()
    {
     
      var select = document.getElementById("selctUsuarios");
      var select2 = document.getElementById("selctLlaves");
      var selected = select2.options[select.selectedIndex].text;
      // alert("Buscando reportes de... "+selected);
      this.filtro.tipo='keyUsuario';
      this.filtro.valor=selected;
      // var inicio=this.reporDeUsuario.indexOf(' ');
      // var clave=this.reporDeUsuario.substring(inicio+1);
      this.$emit('mostrarReparaciones',this.filtro);
    },
    cerrarverReporte(){
      this.mostrar('','');
      this.limpiarVistas();
      this.bolTabla=true;

    },
    descargarReporte()
    {
      this.fecha=document.getElementById("fechaCoti").value;
      this.precio=document.getElementById("valorCoti").value;
      var obser=document.getElementById("obsCoti").value;
      this.$emit('descargarPdf',this.fecha,this.precio,obser,this.reportes,this.fechaHoy());
      this.cerrarModalImp();
    },
    actualizarReparaciones()
    {
      this.$emit('actualizarReparaciones',this.reportes);
      this.cerrarverReporte();
    },
    imprimirReporte(re)
    { 
      this.reportes=re;
      this.$emit('mostrarCoti',re.key);
      this.abrirModalImp()
    },
    pasarCantidad()
    {
      var cos= document.getElementById("valorCoti");
      this.precio=cos.value;
    },
    eliminarReporte(re)
    {
      this.$emit('eliminarReporte',re.key);
    }
  },
  components:{
    etqTabla:tablaReportes,
    etcMostrarCoti:mostrarCoti
  }

}
</script>

<style lang="scss">
@import '../scss/main.scss';
// @import '../../node_modules/bulma/bulma.sass';

//////////////////////////  EXTRAS

html{
  background: $grey-lighter;
}
.btnMostrarUsu{
  margin-top: 6rem;
  margin-left: 3rem;
  background-color: #a7ff8a;
}

.divBarraBuscar{
  display: flex;
  justify-items: right;
}
#registroUsuario
{
  
    justify-content: center;
    align-items: center; 
    background-image: url("../assets/fondo.png");
    background-size: cover;

}
.imgFooter{
  width: 85px;
  
}
.txtBuscar {
    display: flex;
    width: 57vw;
    margin-left: 14.5rem;
}

.table thead th {
    border-width: 0 0 2px;
    font-size: 1.5rem;
    color: #363636;
    
}

#btnDescargar
{
  width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
}
</style>