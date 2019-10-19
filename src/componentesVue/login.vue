<template lang="pug">
  #login
    form.bd-content(style ="width:100%;" @submit.prevent="metSubmit")
      .marcoLogin
        .field
          .control.has-icons-left
            input.input.is-medium(v-model="usuarios.email" type='email' placeholder='Email')
            span.icon.is-left
              i.fas.fa-envelope
              
        .field
          .control.has-icons-left
            input.input.is-medium(v-model="usuarios.contrasena" type='password' placeholder='Contraseña')
            span.icon.is-left
              i.fas.fa-lock
      br
      button.button.is-success.btnIngresar(type='submit' name='submit' value='guardar' style="boxShadow:0px 1px 5px black;")
        span.icon.is-medium
          i.fas.fa-arrow-circle-right
        span Ingresar

        //- button.button.is-success.btnCien(type='submit' name='submit' value='guardar' )  
        //-   span.icon.is-medium
        //-     i.fas.fa-check
        //-     //-  @click="metSubmit"
        //-   span Guardar 
   
</template>

<script>
// import './assets/scss/main.scss'


export default {
  name: 'login',
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
    // onchange: function(ev) {
      
    //   },
    metSubmit() {
        console.log("Todo bien");
        this.campoIgual=false;
        this.$emit('iniciandoSesion',this.usuarios);
      // }
    }
  }
}
</script>

<style lang="scss">
  @import '../scss/main.scss';
html{
  background: $grey-lighter;
}
.btnIngresar{

    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    align-items:center;
    align-content: space-around;
    width: 31vw;
    margin: auto;
}
#login
{
  height: 100vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center; 
    background-image: url("../assets/login_fondo.jpg");
    background-size: cover;

}
.marcoLogin{
  height: 30%;
  margin: auto;
    // margin-top: 4rem;
    padding: 25px;
    width: 35vw;
}
</style>
