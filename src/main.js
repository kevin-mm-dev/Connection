import Vue from 'vue'
import App from './App.vue'


// import VueFire from 'vuefire'

// Vue.use(VueFire);

new Vue({
    el: '#app',
    render: h => h(App)
})



// import Firebase from 'firebase';
// import config from './config';
// let app = Firebase.initializeApp(config);
// let db = app.database();
// let usuariosRef = db.ref('usuarios');

// firebase:{
//   usuarios : usuariosRef
// }