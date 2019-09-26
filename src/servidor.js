const cliente = require("./servidor/cliente.js");

const oCliente = new cliente({
    host: "localhost",
    user: "bdconnection",
    password: "bdconnection",
    database: "bdconnection"
});