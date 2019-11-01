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
      //- span <i class="far fa-arrow-alt-circle-left"></i>
      //-   b  Regresar
    //- a.button.is-rounded.btnMostrarUsu(v-show="bolRegistrar" @click="mostrarUsuarios") 
    //-   span.icon.is-small
    //-     i.fas.fa-arrow-left
    //-   span
    //-     b Mostrar Reportes 
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
                  p.help.is-danger(v-if="campoIncompletoUs") Este campo es obligatorio
          .column
            .field
              .control
                label.label Precio :
                  input.input(v-model="coti.precio" name="text" type="number" placeholder="" )
            .field
              .control
                label.label Fecha Entrega :  
                  input.input.date(v-model="coti.fecha" type="date" name="fecha" min="2018-03-25" max="2030-12-25")
                  p.help.is-danger(v-if="campoIncompletoUs") Este campo es obligatorio
                  
      br
      .btnAceptar
        button.button.is-success.btnCien.btnAceptar(@click="enviarCoti" type='submit' name='submit' value='guardar' )  
          span.icon.is-small
            i.fas.fa-check
          span Añadir 
    //- br                
    //- br                
    //- br                
    
                
    //- br
    //- br                
    //- br
    //- br
    //- br                
    //- img.imgFooter(src="../assets/celular.png")
    //- footer.footer
    //-   .content.has-text-centered
    //-     p
    

    
</template>

<script>
// import './assets/scss/main.scss'


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
      campoIncompletoUs:false,
      campoIncompletoCont1:false,
      campoIncompletoCont2:false,
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
      if(us==='')
      {
        this.campoIncompletoUs=true;
      }else{
        this.campoIncompletoUs=false;
        if(cont1==='')
          {
            this.campoIncompletoCont1=true;
          }else{
            this.campoIncompletoCont1=false;
            if(cont2==='')
              { 
                this.campoIncompletoCont2=true;
                return false;
                }else{
                this.campoIncompletoCont2=false;
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
      // var fec=new Date('yyyy-mm-dd');
      // alert(`Hoy es ${fec}`);

      this.$emit('cotizar',this.coti);

      // var usuarioEditado=this.usuarioEdit;
      // console.log(`Quieres actualizar a ${usuarioEditado.usuario}`);  
      // console.log(`Key: ${usuarioEditado.key}`);  
      // this.$emit('actualizarUsuarios',this.usuarioEdit);
      // this.$emit('mostrarUsuarios');
      // this.cerrarModal();
      // this.usuarioEdit={
      //   actKey:'',
      //   nuevoUsuario: '',
      //   nuevaContrasena: '',
      // }
    },
    abrirModal(us){
      
      this.usuarioEdit.actKey=us.key;
      this.usuarioEdit.nuevoUsuario=us.usuario;
      this.usuarioEdit.nuevaContrasena=us.contrasena;
      this.usuarioEdit.nuevoTipo=us.tipo;
      var modal= document.getElementById("modalEditar");
      // if (modal.classList.contains('modal')) {
      //   alert("Aqui estoy");
      // }else{
      //   alert("nel");
      // }
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
