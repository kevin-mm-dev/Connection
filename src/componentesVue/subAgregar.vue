
<template lang="pug">
  #subAgregar
    .fondoTitulo
    h1.txtTitulo Inicio
    hr.txtTitulo
    h2.txtSubTitulo.subCliente Cliente
    br
    form.paginaReporte
      .marco.marco1
        //- .bd-content(style ="width:100%;")
        .field
          .columns
            .column.is-half
              .field
                .control.control
                  label.label Celular :
                    input.input(v-model="reportes.celular" name="cel" type="tel" placeholder="" )
                    p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
            .column.is-half
              .field
                .control.control
                  label.label.telefono Telefono de Casa :
                    input.input(v-model="reportes.telefono" name="tel" type="tel" placeholder="" )
                    p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
          .control
            label.label Nombre :
              .control
                input.input(v-model="reportes.nombre" name="name" type="text" placeholder="" )
      br
      br
      h2.txtSubTitulo.subEquipo Equipo 
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
        a.button.is-success.guardar(@click="metSubmit")  
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
        p
          
          //- strong Bulma
          //- |  by 
          //- a(href='https://jgthms.com') Jeremy Thomas
          //- | . The source code is licensed
          //- a(href='http://opensource.org/licenses/mit-license.php') MIT
          //- | . The website content
          //- |       is licensed 
          //- a(href='http://creativecommons.org/licenses/by-nc-sa/4.0/') CC BY NC SA 4.0
          //- | .

          //- .control
            button.button(@click="validar" type="submit") valer
            h1


          //- form
          //-   label(for="celular") Celular:
          //-   input.datosCliente(name="celular" type="text" placeholder="000-000-00-00" )
          //-   label(for="name") Nombre:
          //-   input.lblNombre(name="name" type="password" placeholder="")

            //- .column.is-half
            //-   h3(v-model="cel") Nombre:


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
        nombre:'',
        celular:'',
        telefono:'',
        chip:'',
        marca:'',
        modelo:'',
        fallas:'',
        cond:'',
        acces:'',
        campoCompleto:false
        }
    }
  },
  methods:{
    validar(){
      if (this.campoCompleto) {
        this.campoCompleto=false
      }else{
        this.campoCompleto=true
      }
    },
    metSubmit() {
      alert('enviando...!')
      this.$emit('agregando',this.reportes);
    }
  },
  components:{},

}
</script>

<style lang="scss">
@import '../scss/main.scss';
// @import '../../node_modules/bulma/bulma.sass';
html{
  background: $grey-lighter;
}

//////////////////////////  EXTRAS
.marco{
  border-radius: 4px;
    border: solid;
    background: hsl(0, 0%, 94%);
    
}
.cliente{
  display: flex;
  // flex-wrap: 10px;
  justify-content: space-between;
  align-content: flex-start; 
  margin: auto;
  // margin-right: 1rem;
}
body
{
    // text-align: center;
    // // display: flex;
    justify-content: center;
    align-items: center; 
    background-image: url("../assets/fond.png");
    background-size: cover;

}

.marco1{
    // height: 11rem;
    width: 65vw;
    // margin-left: 10rem;
    margin: auto;
    margin-top: 8rem;
    padding: 25px;
}
.marco2{
    // height: 37rem;
    width: 65vw;
    margin: auto;
    padding: 25px;
    
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