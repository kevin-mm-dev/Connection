<template lang="pug">
  #subReparTec
    .fondoTitulo
    h1.txtTitulo Reparaciones Técnico
    hr.txtTitulo
    br
    br
    etqCotizar(v-show="bolCotizar" v-on:cotizar="mandarCotizar" v-on:cerrarCotizar="cerrarCotizar")
    .divTabla(v-show="bolTabla")
      br
      br
      br
      form.columns(@submit.prevent="mostrar('nombreCliente',clienteBuscar)")
        .column.is-three-quarters.divBarraBuscar
          .field
            .control
              input.input.is-primary#txtBuscar(v-model="clienteBuscar" placeholder="Cliente")
        .column
          .field
            .control
              button.button.is-success(type="submit") BUSCAR
      button.button.is-info( @click="mostrar('','')") Mostrar Reparaciones
    .select(v-show="bolTabla")
      select(id="selctUsuarios" v-if="usuarios!=''" v-model="reporDeUsuario").opcionesUsuarios
        option( v-for="us in usuarios") {{us.usuario}}
    button.button.is-success(v-show="bolTabla" @click="filtrarRepor") Filtrar
    .select(v-show="1<0")
      button.button.is-success Select de usuarios
      select(id="selctLlaves" v-if="usuarios!=''" v-model="reporDeUsuario").opcionesUsuarios
        option( v-for="us in usuarios") {{us.key}} 
    etqTabla(v-show="bolTabla" v-bind:listaReportes="repar" v-on:verReporte="verReporte" v-on:cotizarReporte="cotizarReporte" v-on:marcarReparado="marcarReparado" v-on:mostrarCoti="mostrarCoti")
    
    form.paginaReporte(v-show="bolReporte")
      a.button.is-rounded.btnMostrarUsu(@click="cerrarverReporte")
        span.icon.is-small
          i.fas.fa-3x.fa-arrow-circle-left
      
      .divReporte
        h2.txtSubTitulo Cliente 
        br
        .marco.marco2
          .columns
            .column.is-half
              .field
                .control.control
                  label.label Celular :
                    input.input(v-model="reportes.celularCliente" name="cel" type="tel" placeholder="" disabled="true")
                    p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
            .column.is-half
              .field
                .control.control
                  label.label.telefono Telefono de Casa :
                    input.input(v-model="reportes.telefonoCliente" name="tel" type="tel" placeholder="" disabled="true")
                    p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
          .control
            label.label Nombre :
              .control
                input.input(v-model="reportes.nombreCliente" name="name" type="text" placeholder="" disabled="true")
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
                      input.input(v-model="reportes.chip" name="marca" type="text" placeholder="" disabled="true")
                      p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
                    label.label Marca :
                      input.input(v-model="reportes.marca" name="modelo" type="text" placeholder="" disabled="true")
              .column.is-half
                .field
                  .control
                    label.label Accesorios :
                      textarea.textarea(v-model="reportes.acces" name="accesorios" placeholder="..." disabled="true")
            .field
              .control
                label.label Modelo y Color:
                  input.input(v-model="reportes.modelo" name="modelo" type="text" placeholder="" disabled="true")
                label.label Condiciones del Equipo :
                  textarea.textarea(v-model="reportes.cond" name="condiciones" type="text" placeholder="" disabled="true")
                label.label Fallas del Equipo :
                  textarea.textarea(v-model="reportes.fallas" name="condiciones" type="text" placeholder="" disabled="true")      
      
        br
        .btnAceptar
          a.button.is-info.btnCien.btnAceptar(@click="cotizarReporte()")  
            span.icon.is-small
              i.fas.fa-check
            span Cotizar   
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
            textarea.textarea(v-model="cot.obser" disabled)
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
</template>

<script>
import tablaReportes from './tablaReportesTec.vue'
import compCotizar from './cotizar.vue'

export default {
  name: 'subRepar',
  props:['repar','usuarios','coti'],
  data (){
    return {
      clienteBuscar:'',
      datosUsuario:[],
      bolCotizar:false,
      bolReporte:false,
      bolTabla:true,
      filtro :new Object(),
      campoCompleto:'',
      reporDeUsuario:'',
      listaReportes:new Object(),
      bolEditar:true,
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
      // alert('enviando...!')
      this.filtro.tipo=tipo;
      this.filtro.valor=valor;

      this.$emit('mostrarReparaciones',this.filtro);
      this.$emit('ensenarUsuarios',this.usuarios);
      // this.listaReportes=new Object();
      // this.listaReportes=this.repar;
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
        key:'',
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
    verReporte(re)
    {
      this.reportes=re;
      this.limpiarComps();
      this.bolReporte=true;
    },
    cerrarverReporte(){
      this.limpiarComps();
      this.bolTabla=true;

    },
    fechaHoy:function(){
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        return dd+'/'+mm+'/'+yyyy;
    },
    mandarCotizar(coti)
    {
      coti.repoKey=this.reportes['key'];
      this.limpiarComps();
      this.$emit('coti',coti);
      this.limpiarReporte();
      this.bolTabla=true;
      this.mostrar('','');
    },
    mostrarCoti(re)
    {
      this.$emit('mostrarCoti',re.key);
      this.abrirModal();
    },
    marcarReparado(re,ind)
    {
      var key=re['key'];
      this.limpiarComps();
      this.$emit('marcarReparado',key,ind);
      this.limpiarReporte();
      this.bolTabla=true;
      this.mostrar('','');
    },
    limpiarComps()
    {
      this.bolCotizar=false;
      this.bolEditar=false;
      this.bolReporte=false;
      this.bolTabla=false;
    },
    cotizarReporte(re)
    {
      if(re!=undefined)
      {
        this.reportes=re;
      }
      this.limpiarComps();
      this.bolCotizar=true;
      // alert(`Quieres editar a ${re.nombreCliente}`);
      // var fec=this.fechaHoy();
      // alert(`Hoy es ${fec}`);
      
    },
    filtrarRepor()
    {
      // alert("Buscando reportes de... "+this.reporDeUsuario.Remove(0,));
      // var mensaje;
      // var opcion = confirm("Clicka en Aceptar o Cancelar");
      // if (opcion == true) {
      //   // mensaje = "Has clickado OK";
      // } else {
      //   // mensaje = "Has clickado Cancelar";
      // }
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
    cerrarCotizar()
    {
      // alert("se quien esres tabla");
      this.limpiarComps();
      this.bolTabla=true;

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
      
    }
  },
  components:{
    etqTabla:tablaReportes,
    etqCotizar:compCotizar
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
#subReparTec
{
  
    justify-content: center;
    align-items: center; 
    background-image: url("../assets/papel.jpg");
    // background-size: cover;

}
.imgFooter{
  width: 85px;
  
}
#txtBuscar{
    display: flex;
    // height: 30px;
    width: 57vw;
    margin-left: 14.5rem;
    
}

.table thead th {
    border-width: 0 0 2px;
    font-size: 1.5rem;
    color: #363636;
    
}
.opcionesUsuarios
{
  width: 8rem;
}
</style>