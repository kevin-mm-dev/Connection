
<template lang="pug">
  #subAgregar
    .fondoTitulo
    h1.txtTitulo Agregar Reparaciones
    hr.txtTitulo
    h2.txtSubTitulo Cliente
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
    h2.txtSubTitulo Equipo
    .marco.marco2
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
.txtTitulo {
    color: $fondoBarra;
    font-size: 2.4rem;
    margin-left: 10px;
    position: absolute;
    top:110px;
}

.fondoTitulo {
    position: absolute;
    width: 280px;
    height: 39px;
    left: -34px;
    top: 135px;
    background: #C6FFCB;
    filter: blur(9px);
}
hr.txtTitulo {
    height: .2rem;
    background: #4D4A4A;
    margin: 0%;
    width: 290px;
    top: 11rem;
}




//////////////////////////  EXTRAS
.marco{
    border-radius: 4px;
    border: solid;
}
.txtSubTitulo{
  margin-left: 215px;
    top: 13rem;
    position: absolute;
    background: #a7ff8a;
    padding: 10px;
    font-size: 20px;
    font-family: sans-serif;
    border: solid;
    border-radius: 5px;
}
.marco1{
    height: 14rem;
    width: 45rem;
    margin-left: 10rem;
    margin-top: 8rem;
    padding: 25px;
}
.marco2{
    height: 34rem;
    width: 45rem;
    margin-left: 10rem;
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


// rem o px
// imprimir PDF
// como obtener el id de un elemento en la tabla

</style>