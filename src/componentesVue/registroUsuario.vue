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
    
    form.bd-content(style ="width:100%;" @submit.prevent="metSubmit")
      .marco.marco1
        .columns
          .column.is-half
            .field
              .control
                label.label Usuario :
                  input.input.is-rounded(v-model="usuarios.usuario" name="usuario" type="text" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
          .column
            .field
              .control
                label.label Contraseña :
                  input.input(v-model="usuarios.contrasena" name="contrasena" type="password" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
        .field
          .control
            label.label Nombre :
              input.input(v-model="usuarios.nombre" name="name" type="text" placeholder="" )
      br
      .btnAceptar
        button.button.is-success.guardarUsuario(type='submit' name='submit' value='guardar' )  
          span.icon.is-small
            i.fas.fa-check
            //-  @click="metSubmit"
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
      campoCompleto:false,
      usuarios:{
        nombre: '',
        contrasena: '',
        usuario: ''
      }
    }
  },
  methods:{
    onchange: function(ev) {
      
      },
    metSubmit() {
      // alert('enviando...!')
      this.$emit('agregando',this.usuarios);
    }

        
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

.guardarUsuario{
  width: 100%;
}
</style>
