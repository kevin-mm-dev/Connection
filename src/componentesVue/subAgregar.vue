
<template lang="pug">
  #subAgregar
    .fondoTitulo
    h1.txtTitulo Inicio
    hr.txtTitulo
    h2.txtSubTitulo.subCliente Cliente
    br
    .paginaReporte
      .marco.marco1
        .bd-content(style ="width:100%;")
          .columns
            .column.is-half
              .field
                label.label Celular
                .control
                  input.input.is-rounded(v-model="celular" name="cel" type="tel" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
            .column
              .field
                label.label Telefono de Casa
                .control
                  input.input(v-model="telefono" name="tel" type="tel" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
          .columns
            .column
              .field
                label.label Nombre
                .control
                  input.input(v-model="nombre" name="name" type="text" placeholder="" )
      br
      br
      br
      h2.txtSubTitulo.subEquipo Equipo
      .marco.marco2
        .bd-content(style ="width:100%;")
          .columns
            .column.is-half
              .field
                label.label IMEI o (SIM)
                .control
                  input.input(v-model="celular" name="marca" type="text" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
                //- br
                label.label Marca
                .control
                  input.input(v-model="nombre" name="modelo" type="text" placeholder="")
                //- br
                //- label.label IMEI o (SIM)
                //- .control
                //-   input.input(v-model="nombre" name="modelo" type="text" placeholder="")  
            .column.is-half
              .field
                label.label Accesorios
                .control
                  textarea.textarea.is-warning(v-model="acces" name="accesorios" placeholder="...")
          .columns
            .column.is-full
              .field
                label.label Modelo
                .control
                  input.input(v-model="nombre" name="modelo" type="text" placeholder="")
          .columns
            .column.is-full
              .field
                label.label Condiciones del Equipo
                .control
                  textarea.textarea(v-model="cond" name="condiciones" type="text" placeholder="")
          .columns
            .column.is-full
              .field
                label.label Fallas del Equipo
                .control
                  textarea.textarea(v-model="cond" name="condiciones" type="text" placeholder="")      
    
    br
    .guardar
      a.button.is-success.guardar  
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
      nombre:"",
      celular:"",
      campoCompleto:false
    }
  },
  methods:{
    validar(){
      if (this.campoCompleto) {
        this.campoCompleto=false
      }else{
        this.campoCompleto=true
      }
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
body
{
    // text-align: center;
    // // display: flex;
    justify-content: center;
    align-items: center; 
    background-image: url("../assets/fond.png");
    background-size: cover;
}
.pound{
  
  
}
.marco1{
  // margin: auto;
    // position: relative;
    // position: absolute;
    height: 14rem;
    width: 45rem;
    // margin-left: 10rem;
    margin: auto;
    margin-top: 8rem;
    padding: 25px;
}
.marco2{
    height: 41rem;
    width: 45rem;
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