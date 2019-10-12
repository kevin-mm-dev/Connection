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
        .field
          .control
            label.label Correo Electronico :
              input.input(v-model="usuarios.email" name="email" type="email" placeholder="" )
        .columns
          .column.is-half
            .field
              .control
                label.label Contraseña :
                  input.input(v-model="usuarios.contrasena" name="contrasena" type="password" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
          .column
            .field
              .control
                label.label Confirmar Contraseña :
                  input.input(v-model="confContrasena" name="contrasena2" type="password" placeholder="" )
                  p.help.is-danger(v-if="campoCompleto") Este campo es obligatorio
                  p.help.is-danger(v-if="campoIgual") Este campo no concuerda con el anterior
      br
      .btnAceptar
        button.button.is-success.btnCien.btnAceptar(type='submit' name='submit' value='guardar' )  
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
      campoIgual:false,
      campoCompleto:false,
      confContrasena:'',
      usuarios:{
        email: '',
        contrasena: '',
      }
    }
  },
  methods:{
    onchange: function(ev) {
      
      },
    metSubmit() {
      // alert('enviando...!')
      if (this.confContrasena!=this.usuarios.contrasena) {
        console.log("No es igual");
        this.campoIgual=true;
      }else
      {
        console.log("Todo bien");
        this.campoIgual=false;
        this.$emit('agregando',this.usuarios);
      }
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

// .guardarUsuario{
//   width: 100%;
// }

#registroUsuario
{
    // text-align: center;
    // // display: flex;
    justify-content: center;
    align-items: center; 
    background-image: url("../assets/fondo.png");
    background-size: cover;

}

.imgFooter{
  width: 85px;
  
}

</style>
