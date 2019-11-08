<template lang="pug">
  #cotizarReporte
    .fondoTitulo
    h1.txtTitulo Reparaciones Técnico
    hr.txtTitulo
    br
    br
    a.button.is-rounded.btnMostrarUsu(@click="cerrarCotizar")
      span.icon.is-small
        i.fas.fa-3x.fa-arrow-circle-left
    form.bd-content(style ="width:100%;" @submit.prevent="metSubmit" v-show="registrar")
      h2.txtSubTitulo Cotización de Reparación 
      br
      .marco.marco2
        .columns
          .column.is-two-thirds
            .field
              .control
                label.label Observaciónes :
                  textarea.textarea(v-model="coti.obser" name="text" type="text" placeholder="" )
                  p.help.is-danger(v-if="campoIncompletoObs") Este campo es obligatorio
          .column
            .field
              .control
                label.label Precio :
                  input.input(v-model="coti.precio" name="text" type="number" placeholder="" )
                  p.help.is-danger(v-if="campoIncompletoPrecio") Este campo es obligatorio
            .field
              .control
                label.label Fecha Entrega :  
                  input.input.date(v-model="coti.fecha" type="date" name="fecha" min="2018-03-25" max="2030-12-25")
                  p.help.is-danger(v-if="campoIncompletoFecha") Este campo es obligatorio
                  
      br
      .btnAceptar
        button.button.is-success.btnCien.btnAceptar(@click="enviarCoti" type='submit' name='submit' value='guardar' )  
          span.icon.is-small
            i.fas.fa-check
          span Añadir 
          
    

    
</template>

<script>



export default {
  name: 'cotizarReporte',
  props:['usuariosReg'],
  data () {
    return {
      mensaje: 'Que pasa mi amigo',
      fechaHoy: '2019-03-25',
      coti:new Object(),
      campoIgual:false,
      registrar:true,
      bolMostrar:true,
      bolRegistrar:false,
      campoIncompletoObs:false,
      campoIncompletoPrecio:false,
      campoIncompletoFecha:false,
      confContrasena:'',
      usuarioEdit:{
        actKey:'',
        nuevoUsuario: '',
        nuevaContrasena: '',
        nuevoTipo: '',
      },
      usuarios:{
        usuario: '',
        contrasena: '',
        tipo: 'Gerente',
      }
    }
  },
  methods:{
    onchange: function(ev) {
      
      },
    metSubmit() {
      // alert('enviando...!')
      // alert(`Eres tipo ${this.usuarios.tipo}`);
      //   if(this.camposVacios(this.usuarios.usuario,this.usuarios.contrasena,this.confContrasena))
      //   {
      //     if (this.confContrasena!=this.usuarios.contrasena) {
      //      this.campoIgual=true;
      //      }
      //     else{
      //     console.log("Todo bien");
      //     this.campoIgual=false;
      //     this.$emit('agregando',this.usuarios);
      //     this.confContrasena="";
      //     this.usuarios={
      //       usuario: '',
      //       contrasena: '',
      //       tipo: 'Gerente',
      //     }
      //   }
      // }

      // this.$emit('cotizar',this.coti);
      // alert("Ya te lo envio");
    },
    
    cerrarModal(){
      console.log("Nada por?");
      var modal= document.getElementById("modalEditar");
      modal.classList.remove('is-active');
      modal.classList.add('is-close');
      
      this.usuarioEdit={
        actKey:'',
        nuevoUsuario: '',
        nuevaContrasena: '',
      }
    },
    camposVacios(us,cont1,cont2){
      if(us==='' || us==undefined)
      {
        this.campoIncompletoObs=true;
      }else{
        this.campoIncompletoObs=false;
        if(cont1==='' || cont1==undefined)
          {
            this.campoIncompletoPrecio=true;
          }else{
            this.campoIncompletoPrecio=false;
            if(cont2==='' || cont2==undefined)
              { 
                this.campoIncompletoFecha=true;
                return false;
                }else{
                this.campoIncompletoFecha=false;
                return true;
              }
            }
          }
    },
    borrarUsuario(us){
      this.$emit('borrarUsuarios',us.key);
      this.$emit('mostrarUsuarios');
    },
    enviarCoti(){
      
      
      if(this.camposVacios(this.coti.obser,this.coti.precio,this.coti.fecha))
        {
          
          this.$emit('cotizar',this.coti);
          this.coti=new Object();
        }



    },
    abrirModal(us){
      
      this.usuarioEdit.actKey=us.key;
      this.usuarioEdit.nuevoUsuario=us.usuario;
      this.usuarioEdit.nuevaContrasena=us.contrasena;
      this.usuarioEdit.nuevoTipo=us.tipo;
      var modal= document.getElementById("modalEditar");
      
      modal.classList.remove('is-close');
      modal.classList.add('is-active');
    },
    cerrarCotizar(){
        this.$emit('cerrarCotizar');
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
.btnMostrarUsu{
  margin-top: 6rem;
  margin-left: 3rem;
  background-color: #a7ff8a;
}


#cotizarReporte
{
    justify-content: center;
    align-items: center; 
    // background-image: url("../assets/fondo.png");
    background-size: cover;
}
.imgFooter{
  width: 85px;
}
.divTabla{
  height: 10%;
}
.table thead th {
    border-width: 0 0 2px;
    font-size: 1.5rem;
    color: #363636;
}

</style>
