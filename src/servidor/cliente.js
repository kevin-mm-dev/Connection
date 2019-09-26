const MYSQL = require("mysql");
class Cliente {
    constructor(oconfig) {
        this.oconfig = oconfig;
    }

    /***
     * Recive cliente y celular
     */
    agregarUsuario(nombre, celular) {
        var con = mysql.createConnection(this.oconfig)
        con.connect(function(error) {

            try {
                if (error) {
                    console.log("Error al intentar conectar");

                } else {
                    console.log("Conexión Exitosa!");
                    con.query("SELECT COUNT(*) AS USUARIO FROM USUARIOS", function(error, res, campo) {
                        if (error) {
                            console.log("Error en select BD -- " + console.error());


                        } else {
                            console.log();
                            console.log("Usuarios no encontrados: " + res[0].usario);
                            if (parseInt(res[0].usario) == 0) {
                                con.query(`INSERT INTO usuarios (nombre,celular) values('${nombre}','${celuar}')`, function(error, res, campo) {
                                    if (error) {
                                        console.log("Error en select BD -- " + console.error());


                                    } else {
                                        console.log("Nuevo Usuario registrado  ");
                                    }
                                });
                            }

                        }
                    });
                }


            } catch (e) {
                console.log("Clientes.agregarUsuario.connect --Error-- " + e);


            }
        })
    }
}

module.exports = Cliente;