<!--
    img(src="./assets/logo.png")
    h1 {{mensaje}}
-->

<template lang="pug">
  #registroUsuario
    .fondoTitulo
    h1.txtTitulo Usuarios
    hr.txtTitulo
    h2.txtSubTitulo.subCliente Registro de usuarios
    br
    .marco.marco1
        .bd-content(style ="width:100%;")
          .columns
            .column.is-half
              .field
                label.label Usuario 
                .control
                  input.input.is-rounded(v-model="celular" name="usuario" type="text" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
            .column
              .field
                label.label Contraseña
                .control
                  input.input(v-model="telefono" name="contraseña" type="password" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
          .columns
            .column
              .field
                label.label Nombre
                .control
                  input.input(v-model="nombre" name="name" type="text" placeholder="" )
    br
    .guardar
      a.button.is-success.guardar  
        span.icon.is-small
          i.fas.fa-check
        span Guardar 
    br                
    br                
    br                
    img.imgFooter(src="../assets/celular.png")
    footer.footer
      .content.has-text-centered
        p
</template>

<script>
// import './assets/scss/main.scss'


export default {
  name: 'registroUsuario',
  data () {
    return {
      mensaje: 'Que pasa mi amigo',
      
    }
  },
  methods:{
    
    
  },
  components:{
    
  }
}
</script>

<style lang="scss">
  @import '../scss/main.scss';
html{
  background: $grey-lighter;
}

</style>
