<template lang="pug">
  #barraAdmin
    nav#menuAdmin 
      ul
        li 
          a.button.is-rounded#btnInicio(v-show="tipoUs!='Técnico'" @click="metodInicio(),enCambio('inicio')" style="boxShadow:5px 5px 6px black;") 
            span.icon.is-small
              i.fas.fa-home
            span Servicio
        li  
          .reparaciones
            a.button.is-rounded#btnReparaciones(@click="metodReparaciones(),enCambio('reparaciones')") 
              span.icon.is-small
                i.fas.fa-briefcase
              span Reparaciones
        li
          a.button.is-rounded#btnUsarios(v-show="tipoUs=='Técnico'" @click="metodUsuarios(),enCambio('usuarios')") 
            span.icon.is-small
              i.fas.fa-users
            span Usuarios
        //- li
        //-   .reportes
        //-     a.button.is-rounded#btnReportes(@click="metodReportes(),enCambio('reportes')") 
        //-       span.icon.is-small
        //-           i.fas.fa-book-open
        //-       span Reportes
    hr

</template>

<script>

export default {
  name: 'barraAdmin',
  props:['tipoUs'],
  ready:function () {
    
  },
  data () {
    return {
      // bolTipo:false,
    }
  },
  methods:{
    verTipo(tipo)
    {
      if(tipo=='Técnico'){
      this.bolTipo=true;
    }
    },
    enCambio(subModulo){
      // location.reload();
      this.$emit('cambiando',subModulo);

    },
    quitarSombras(ev){
      var btnInicio = document.getElementById("btnInicio");
      // var btnReportes = document.getElementById("btnReportes");
      var btnReparaciones = document.getElementById("btnReparaciones");
      var btnUsarios = document.getElementById("btnUsarios");
      btnReparaciones.style.boxShadow="";
      btnInicio.style.boxShadow="";
      // btnReportes.style.boxShadow="";
      btnUsarios.style.boxShadow="";
      var subModulo = document.getElementById(ev);
      subModulo.style.boxShadow="5px 5px 6px black";
    },
    metodInicio(){
      this.quitarSombras("btnInicio");
    },
    metodReparaciones(){
      this.quitarSombras("btnReparaciones");
      },
      
    metodUsuarios(){
      this.quitarSombras("btnUsarios");
    }
  }

}
</script>

<style lang="scss">
  @import '../scss/main.scss';
  

.txtReportes{
  background: peru;
}
.column a{
  list-style: none;
  color: white;
}
.imgModulo{
    height: 33px;
}
#menuAdmin li a{
  background: $button-hover-border-color;
  height:23px;
}
.estar{
  box-shadow: 5px 5px 6px black;
  background: red;
}
</style>
