import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'

Vue.use(VueFire);

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
// },



//   export default {
//     apiKey: "AIzaSyA_ifjdVJn6nYYJdl7jXgAmQ5DNz4ImJ14",
//     authDomain: "bdconnection-3ddda.firebaseapp.com",
//     databaseURL: "https://bdconnection-3ddda.firebaseio.com",
//     projectId: "bdconnection-3ddda",
//     storageBucket: "bdconnection-3ddda.appspot.com",
//     messagingSenderId: "703721978062",
//     appId: "1:703721978062:web:b803a3bed46bf30c62b89f"
// }