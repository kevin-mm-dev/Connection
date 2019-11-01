<template lang="pug">
  #registroUsuario
    .fondoTitulo
    h1.txtTitulo Usuarios
    hr.txtTitulo
    br
    a.button.is-rounded.btnMostrarUsu(v-show="bolMostrar"  @click="mostrarUsuarios")
      span.icon.is-small
        i.fas.fa-arrow-left
      span
        b Mostrar todos
    a.button.is-rounded.btnMostrarUsu(v-show="bolRegistrar" @click="mostrarUsuarios") 
      span.icon.is-small
        i.fas.fa-arrow-left
      span
        b Registrar Usuario
    form.bd-content(style ="width:100%;" @submit.prevent="metSubmit" v-show="registrar")
      h2.txtSubTitulo Registro de usuarios 
      br
      .marco.marco2
        .columns
          .column.is-two-thirds
            .field
              .control
                label.label Usuario :
                  input.input(v-model="usuarios.usuario" name="text" type="text" placeholder="" )
                  p.help.is-danger(v-if="campoIncompletoUs") Este campo es obligatorio
          .column
            .field
              .control
                h3 Tipo:
                .select
                  select(v-model="usuarios.tipo")
                    option Gerente
                    option Técnico
        .columns
          .column.is-half
            .field
              .control
                label.label Contraseña :
                  input.input(v-model="usuarios.contrasena" name="contrasena" type="password" placeholder="" )
                  p.help.is-danger(v-if="campoIncompletoCont1") Este campo es obligatorio
          .column
            .field
              .control
                label.label Confirmar Contraseña :
                  input.input(v-model="confContrasena" name="contrasena2" type="password" placeholder="" )
                  p.help.is-danger(v-if="campoIncompletoCont2") Este campo es obligatorio
                  p.help.is-danger(v-if="campoIgual") Este campo no concuerda con el anterior
      br
      .btnAceptar
        button.button.is-success.btnCien.btnAceptar(type='submit' name='submit' value='guardar' )  
          span.icon.is-small
            i.fas.fa-check
          span Guardar 
    //- br                
    //- br                
    //- br                
    .divTabla
      table.table.is-hoverable.marco2(v-show="!registrar")
        thead
          tr
            th Usuario
            th Contraseña
            th Tipo
            th Opciones
        tbody
          tr(v-for="us in usuariosReg")
            th {{us.usuario}}
            th {{us.contrasena}}
            th {{us.tipo}}
            th.tablaOpciones 
              //- button#btnLista.button.is-danger(@click="seleccionarUs(us.key)") Borrar                
              //- button#btnLista.button.is-info(@click="seleccionarUs(us.key)") Editar 
              p.buttons
                a.button.is-info(data-target="modalEditar" @click="abrirModal(us)")
                  span.icon.is-small
                    i.far.fa-edit
                a.button.is-danger(@click="borrarUsuario(us)")
                  span.icon.is-small
                    i.fas.fa-trash-alt
                
    br
    br                
    br
    br
    br                
    img.imgFooter(src="../assets/celular.png")
    footer.footer
      .content.has-text-centered
        p
    #modalEditar.modal.is-close
      .modal-background
      .modal-card
        header.modal-card-head
          p.modal-card-title Editar Usuario
          button.delete(aria-label='close' @click="cerrarModal")
        section.modal-card-body
          .content
            .field
              .control
                input.input.is-info(placeholder="usuario" v-model="usuarioEdit.nuevoUsuario")
            .field
              .control
                input.input.is-info(placeholder="contraseña" v-model="usuarioEdit.nuevaContrasena")
            .field
              .control
                h3 Tipo:
                .select
                  select(v-model="usuarioEdit.nuevoTipo")
                    option Gerente
                    option Técnico
            h3 Nota
            blockquote
              | Recuerda notificarle al usuario que su perfil a sido editado.
        footer.modal-card-foot
          button.button.is-success(@click="actualizarUsuario") Guardar
          button.button(@click="cerrarModal") Cancelar

    
</template>

<script>
// import './assets/scss/main.scss'


export default {
  name: 'registroUsuario',
  props:['usuariosReg'],
  data () {
    return {
      mensaje: 'Que pasa mi amigo',
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
        estatus: 1,
      }
    }
  },
  methods:{
    onchange: function(ev) {
      
      },
    metSubmit() {
      // alert('enviando...!')
      // alert(`Eres tipo ${this.usuarios.tipo}`);
        if(this.camposVacios(this.usuarios.usuario,this.usuarios.contrasena,this.confContrasena))
        {
          if (this.confContrasena!=this.usuarios.contrasena) {
           this.campoIgual=true;
           }
          else{
          console.log("Todo bien");
          this.campoIgual=false;
          this.$emit('agregando',this.usuarios);
          this.confContrasena="";
          this.usuarios={
            usuario: '',
            contrasena: '',
            tipo: 'Gerente',
            estatus: 1,
          }
        }
      }
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
    actualizarUsuario(){
      var usuarioEditado=this.usuarioEdit;
      console.log(`Quieres actualizar a ${usuarioEditado.usuario}`);  
      console.log(`Key: ${usuarioEditado.key}`);  
      this.$emit('actualizarUsuarios',this.usuarioEdit);
      this.$emit('mostrarUsuarios');
      this.cerrarModal();
      this.usuarioEdit={
        actKey:'',
        nuevoUsuario: '',
        nuevaContrasena: '',
      }
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
    mostrarUsuarios(){
      if (this.bolMostrar) {
        this.bolRegistrar=true;
      this.bolMostrar=false;
      this.registrar=false;
      }else{
        this.bolRegistrar=false;
      this.bolMostrar=true;
      this.registrar=true;
      }
        this.$emit('mostrarUsuarios');
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


#registroUsuario
{
  
    justify-content: center;
    align-items: center; 
    background-image: url("../assets/fondo.png");
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
