
<template lang="pug">
  #subAgregar
    .fondoTitulo
    h1.txtTitulo Reparaciones Técnico
    hr.txtTitulo
    br
    br
    br
    br
    .buscar
      form.columns(@submit.prevent="mostrar('nombreCliente',clienteBuscar)")
        .column.is-three-quarters.divBarraBuscar
          .field
            .control
              input.input.is-primary.txtBuscar(v-model="clienteBuscar" placeholder="Cliente")
        .column
          .field
            .control
              button.button.is-success(type="submit ") BUSCAR

    br
    br
    button.button.is-info(@click="mostrar('','')") Mostrar Reparaciones
    etqTabla(v-bind:listaReportes="repar"  v-on:tablaEditar="editarReporte")
    //- table.table.is-hoverable.marco2
    //-   thead
    //-     tr
    //-       th Cliente
    //-       th Celular
    //-       th Fallas
    //-       th Fecha
    //-       th Opciones
    //-   tbody
    //-     tr(v-for="re in repar")
    //-       th {{re.nombreCliente}}
    //-       th {{re.celularCliente}}
    //-       th {{re.fallas}}
    //-       th {{re.fecha}}
    //-       th.tablaOpciones 
    //-         p.buttons
    //-           a.button.is-info(@click="editarReporte(re)")
    //-             span.icon.is-small
    //-               i.far.fa-edit
    //-           a.button.is-danger()
    //-             span.icon.is-small
    //-               i.fas.fa-trash-alt
    
    form.paginaReporte(v-if="bolEditar")
      br
      br
      br
      h2.txtSubTitulo Cliente 
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
                  label.label IMEI o (SIM) :
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
              label.label Modelo :
                input.input(v-model="reportes.modelo" name="modelo" type="text" placeholder="")
              label.label Condiciones del Equipo :
                textarea.textarea(v-model="reportes.cond" name="condiciones" type="text" placeholder="")
              label.label Fallas del Equipo :
                textarea.textarea(v-model="reportes.fallas" name="condiciones" type="text" placeholder="")      
    
      br
      .btnAceptar
        a.button.is-success.btnCien.btnAceptar()  
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
</template>

<script>
import tablaReportes from './tablaReportesTec.vue'

export default {
  name: 'subRepar',
  props:['repar'],
  data (){
    return {
      clienteBuscar:'',
      filtro :new Object(),
      campoCompleto:'',
      listaReportes:[],
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
      // setTimeout(heredarReportes(),3000);
      
      // this.limpiarReporte();
    },
    
    filtrar()
    {
      // alert(`hola ${this.clienteBuscar}`);
      
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
      alert(`Hoy es ${fec}`);
      this.reportes=re;
    },
    fechaHoy:function(){
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        

        return dd+'/'+mm+'/'+yyyy;
    }
  },
  components:{
    etqTabla:tablaReportes
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
</style>