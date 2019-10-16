// // // import { firestore } from "firebase";
import firebase from 'firebase';
let config = {
    apiKey: "AIzaSyA_ifjdVJn6nYYJdl7jXgAmQ5DNz4ImJ14",
    authDomain: "bdconnection-3ddda.firebaseapp.com",
    databaseURL: "https://bdconnection-3ddda.firebaseio.com",
    projectId: "bdconnection-3ddda",
    storageBucket: "bdconnection-3ddda.appspot.com",
    messagingSenderId: "703721978062",
    appId: "1:703721978062:web:b803a3bed46bf30c62b89f"
}

firebase.initializeApp(config);

var auth = firebase.auth();
// var db = firebase.firestore();
var admin = require("firebase");
var db = admin.database();
var reportesRef = db.ref("reportes");
var usuariosRef = db.ref("usuarios");
// // var reportesRefe = firebase.initializeApp(config).ref('reportes');

export default new Vue({
    data: {
        varFire: 'Hola desde Fire'
    },
    methods: {
        status(callback) {
            auth.onAuthStateChanged(function(user) {
                // var varUsuario = [];
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;

                    console.log(`ESTAS DENTRO`);
                    // ...
                } else {
                    console.log(`No estas logeado`);
                }
                callback(user);

            })
        },
        agregarReporte(reporte, callback) {
            reportesRef.push(reporte, function(error) {
                callback(error);
            });
        },
        crearUsuario(usuario, callback) {
            usuariosRef.push(usuario, function(error) {
                callback(error);
            });
        },
        mostrarUsuarios: function() {
            alert("Ya pidio usuarios");
            new Promise((resolver, rechazar) => {
                console.log('Inicial');

                resolver();
            })
            .then(() => {
                throw new Error('Algo falló');
                    
                console.log('Haz esto');
            })
            // usuariosRef.on("value", function(snapshot) {
            //     var objeto = snapshot.val();
            //     var usuarios = [];
            //     for (var propiedad in objeto) {
            //         usuarios.unshift({
            //             '.key': propiedad,
            //             nombre: objeto[propiedad].nombre,
            //             contrasena: objeto[propiedad].contrasena,

            //         });
            //     }
            // })
        },
        iniciarSesion(usuario) {
            // console.log(`FIREBASE.js ${usuario.email} con ${usuario.contrasena} `);

            return auth.signInWithEmailAndPassword(usuario.email, usuario.contrasena);
        },
        cerrarSesion() {
            return auth.signOut();
        }
    }
})