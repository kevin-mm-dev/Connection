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
var cotiRef = db.ref("cotizaciones");
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
        marcarCotizadoReporte(keyRepo, callback) {
            reportesRef.child(keyRepo).update({
                cotizado: 1,
            }, function(error) {
                callback(error);
            });
        },
        marcarReparadoReporte(keyRepo, ind, callback) {

            reportesRef.child(keyRepo).update({
                reparado: ind,
            }, function(error) {
                callback(error);
            });
        },
        agregarCoti(coti, callback) {
            cotiRef.push(coti, function(error) {
                callback(error);
            });
        },
        crearUsuario(usuario, callback) {
            usuariosRef.push(usuario, function(error) {
                callback(error);
            });
        },
        actualizarUsuario(usuarioActualizado, callback) {
            console.log("Quieres ediar a ");
            // console.log(usuarioActualizado.key);
            // console.log(usuarioActualizado.usuario);
            // console.log(usuarioActualizado.contrasena);

            usuariosRef.child(usuarioActualizado.actKey).update({
                usuario: usuarioActualizado.nuevoUsuario,
                contrasena: usuarioActualizado.nuevaContrasena,
                tipo: usuarioActualizado.nuevoTipo
            }, function(error) {
                callback(error);
            });
        },
        borrarUsuario(keyUsuario, callback) {
            console.log("Quieres borrar " + keyUsuario);
            // db.ref('usuarios/' + keyUsuario).remove(callback());
            usuariosRef.child(keyUsuario).update({
                estatus: 0
            }, function(error) {
                callback(error);
            });
        },
        eliminarReporte(repoKey, callback) {

            db.ref('reportes/' + repoKey).remove(callback());
        },
        mostrarUsuarios(usuarios, callback) {
            var usuarios = [];
            usuariosRef.on("value", function(snapshot) {
                var objeto = snapshot.val();
                for (var propiedad in objeto) {
                    if (objeto[propiedad].estatus == 1) {

                        usuarios.unshift({
                            'key': propiedad,
                            usuario: objeto[propiedad].usuario,
                            contrasena: objeto[propiedad].contrasena,
                            tipo: objeto[propiedad].tipo,
                        });
                    }
                }
                callback(usuarios);
            });
        },
        mostrarCoti(repoKey, callback) {

            var coti = [];
            cotiRef.on("value", function(snapshot) {
                var objeto = snapshot.val();
                for (var propiedad in objeto) {
                    if (objeto[propiedad].repoKey == repoKey) {
                        coti.unshift({
                            repoKey: objeto[propiedad].repoKey,
                            fecha: objeto[propiedad].fecha,
                            obser: objeto[propiedad].obser,
                            precio: objeto[propiedad].precio,
                        });
                    }
                    if (coti != "") {
                        callback(coti);
                        coti = [];
                    }
                }
            });
        },
        mostrarReparaciones(filtro, callback) {
            var consultar = true;
            reportesRef.on("value", function(snapshot) {
                var objeto = snapshot.val();
                if (consultar) {
                    // consultar = false;

                    var reportes = [];
                    for (var propiedad in objeto) {
                        switch (filtro.tipo) {
                            case 'fecha': /// && objeto[propiedad].reparado == 0
                                if (filtro.valor == objeto[propiedad].fecha) {
                                    reportes.unshift({
                                        'key': propiedad,
                                        nombreCliente: objeto[propiedad].nombreCliente,
                                        celularCliente: objeto[propiedad].celularCliente,
                                        fallas: objeto[propiedad].fallas,
                                        acces: objeto[propiedad].acces,
                                        chip: objeto[propiedad].chip,
                                        cond: objeto[propiedad].cond,
                                        cotizado: objeto[propiedad].cotizado,
                                        marca: objeto[propiedad].marca,
                                        modelo: objeto[propiedad].modelo,
                                        reparado: objeto[propiedad].reparado,
                                        telefonoCliente: objeto[propiedad].telefonoCliente,
                                        usuario: objeto[propiedad].usuario,
                                        fecha: objeto[propiedad].fecha,
                                    });
                                }
                                break;
                            case 'nombreCliente':
                                if (objeto[propiedad].nombreCliente.includes(filtro.valor)) {
                                    reportes.unshift({
                                        'key': propiedad,
                                        nombreCliente: objeto[propiedad].nombreCliente,
                                        celularCliente: objeto[propiedad].celularCliente,
                                        fallas: objeto[propiedad].fallas,
                                        acces: objeto[propiedad].acces,
                                        chip: objeto[propiedad].chip,
                                        cond: objeto[propiedad].cond,
                                        cotizado: objeto[propiedad].cotizado,
                                        marca: objeto[propiedad].marca,
                                        modelo: objeto[propiedad].modelo,
                                        reparado: objeto[propiedad].reparado,
                                        telefonoCliente: objeto[propiedad].telefonoCliente,
                                        usuario: objeto[propiedad].usuario,
                                        fecha: objeto[propiedad].fecha,
                                    });
                                }
                                break;
                            case 'keyUsuario':
                                if (filtro.valor == objeto[propiedad].usuario) {
                                    reportes.unshift({
                                        'key': propiedad,
                                        nombreCliente: objeto[propiedad].nombreCliente,
                                        celularCliente: objeto[propiedad].celularCliente,
                                        fallas: objeto[propiedad].fallas,
                                        acces: objeto[propiedad].acces,
                                        chip: objeto[propiedad].chip,
                                        cond: objeto[propiedad].cond,
                                        cotizado: objeto[propiedad].cotizado,
                                        marca: objeto[propiedad].marca,
                                        modelo: objeto[propiedad].modelo,
                                        reparado: objeto[propiedad].reparado,
                                        telefonoCliente: objeto[propiedad].telefonoCliente,
                                        usuario: objeto[propiedad].usuario,
                                        fecha: objeto[propiedad].fecha,
                                    });
                                }
                                break;
                            case 'reparado':
                                if (filtro.valor == objeto[propiedad].reparado) {
                                    reportes.unshift({
                                        'key': propiedad,
                                        nombreCliente: objeto[propiedad].nombreCliente,
                                        celularCliente: objeto[propiedad].celularCliente,
                                        fallas: objeto[propiedad].fallas,
                                        acces: objeto[propiedad].acces,
                                        chip: objeto[propiedad].chip,
                                        cond: objeto[propiedad].cond,
                                        cotizado: objeto[propiedad].cotizado,
                                        marca: objeto[propiedad].marca,
                                        modelo: objeto[propiedad].modelo,
                                        reparado: objeto[propiedad].reparado,
                                        telefonoCliente: objeto[propiedad].telefonoCliente,
                                        usuario: objeto[propiedad].usuario,
                                        fecha: objeto[propiedad].fecha,
                                    });
                                }

                                break;
                            default:
                                reportes.unshift({
                                    'key': propiedad,
                                    nombreCliente: objeto[propiedad].nombreCliente,
                                    celularCliente: objeto[propiedad].celularCliente,
                                    fallas: objeto[propiedad].fallas,
                                    acces: objeto[propiedad].acces,
                                    chip: objeto[propiedad].chip,
                                    cond: objeto[propiedad].cond,
                                    cotizado: objeto[propiedad].cotizado,
                                    marca: objeto[propiedad].marca,
                                    modelo: objeto[propiedad].modelo,
                                    reparado: objeto[propiedad].reparado,
                                    telefonoCliente: objeto[propiedad].telefonoCliente,
                                    usuario: objeto[propiedad].usuario,
                                    fecha: objeto[propiedad].fecha,
                                });
                                break;
                        }
                    }
                    callback(reportes);
                }
            });
        },
        actualizarReparaciones(reparacionActualizado, callback) {
            reportesRef.child(reparacionActualizado.key).update({
                nombreCliente: reparacionActualizado.nombreCliente,
                celularCliente: reparacionActualizado.celularCliente,
                fallas: reparacionActualizado.fallas,
                acces: reparacionActualizado.acces,
                chip: reparacionActualizado.chip,
                cond: reparacionActualizado.cond,
                cotizado: reparacionActualizado.cotizado,
                marca: reparacionActualizado.marca,
                modelo: reparacionActualizado.modelo,
                reparado: reparacionActualizado.reparado,
                telefonoCliente: reparacionActualizado.telefonoCliente,
                usuario: reparacionActualizado.usuario,
                fecha: reparacionActualizado.fecha,

            }, function(error) {
                callback(error);
            });
        },
        iniciarSesionAuth: function(usuario, callback, usuarioNoExiste) {
            return auth.signInWithEmailAndPassword('q@gmail.com', '123123').then(
                function() {
                    var usuarioInicio = [];
                    var usuarioKey = '';
                    usuariosRef.on("value", function(snapshot) {
                        var objeto = snapshot.val();
                        var tamañoArreglo = 0;
                        for (var propiedad in objeto) {
                            tamañoArreglo++;
                            if (objeto[propiedad].usuario === usuario.usuario && objeto[propiedad].contrasena === usuario.contrasena && objeto[propiedad].estatus === 1) {
                                usuarioInicio.Key = propiedad;
                                usuarioKey = propiedad;
                                usuarioInicio.tipo = objeto[propiedad].tipo;

                            }

                            // if (objeto.length == tamañoArreglo) {
                            //     callback(usuarioKey);
                            // }
                        }
                        if (usuarioKey === '') {
                            // alert("Salio for pero key esta vacio");
                            usuarioNoExiste();
                        } else {
                            // alert(`Te mandare ${usuarioInicio.Key} ${usuarioInicio.tipo}`);
                            callback(usuarioInicio.Key, usuarioInicio.tipo);
                            usuarioInicio.Key = "";
                            usuarioInicio.tipo = "";
                            // alert("Salio for pero key esta Bien");
                        }
                    });
                });
        },
        // promesa: new Promise(params),
        cerrarSesion() {
            return auth.signOut();
        }
    }
})