
<template lang="pug">
  #subAgregar
    .fondoTitulo
    h1.txtTitulo Inicio
    hr.txtTitulo
    br
    form.paginaReporte
      br
      br
      h2.txtSubTitulo Cliente 
      br
      .marco.marco2
        //- .bd-content(style ="width:100%;")
        .field
          .columns
            .column.is-half
              .field
                .control.control
                  label.label Celular :
                    input.input(v-model="reportes.celularCliente" name="cel" type="number" placeholder="" )
                    p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
            .column.is-half
              .field
                .control.control
                  label.label.telefono Telefono de Casa :
                    input.input(v-model="reportes.telefonoCliente" name="tel" type="number" placeholder="" )
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
        a.button.is-success.btnCien.btnAceptar(@click="metSubmit")  
          span.icon.is-small
            i.fas.fa-check
          span Guardar               
    br                
    br                
    br
    .pound                
    img.imgFooter(src="../assets/celular.png")
    footer.footer
      .content.has-text-centered


</template>

<script>
// import prueba from '../../'
export default {
  name: 'subAgregar',
  props:[],
  data (){
    return {
      campoCompleto:false,
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
        reparado:0,
        cotizado:0,
        fecha:''
        }
    }
  },
  methods:{
    validarReporte(){
      
      if (this.reportes.nombreCliente=="" || this.reportes.celularCliente=="" || this.reportes.chip=="" ||
      this.reportes.marca=="" || this.reportes.modelo=="" || this.reportes.fallas=="" || this.reportes.cond=="" 
      || this.reportes.acces=="" ) {
        
        return false
      }else{
        return true
        
      }
    },
    metSubmit() {
      // alert('enviando...!')
      if(this.validarReporte())
      {this.reportes.fecha=this.fechaHoy();
      this.$emit('agregando',this.reportes);
      this.limpiarReporte();

      }else{
        alert("Asegurate de llenar todos los campos");
      }
      
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
        fecha:''
        }
    },
    fechaHoy:function(){
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        return yyyy+'-'+mm+'-'+dd;
    },
    
  }
}
</script>

<style lang="scss">
@import '../scss/main.scss';
// @import '../../node_modules/bulma/bulma.sass';

//////////////////////////  EXTRAS

.cliente{
  display: flex;
  // flex-wrap: 10px;
  justify-content: space-between;
  align-content: flex-start; 
  margin: auto;
  // margin-right: 1rem;
}
#subAgregar{
      justify-content: center;
    align-items: center;
  background-image: url("../assets/papel.jpg");
  // background-size: 30%; 
}


input.nombre{
width: 25rem;
}
// .field{
//   margin-right: 50px;
// }
.lblNombre{
  width:20rem;
}
.imgFooter{
  width: 85px;
  
}


// rem o px
// imprimir PDF
// como obtener el id de un elemento en la tabla

</style>