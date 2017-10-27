'use strict';
let mysql = require('mysql'),
    db_config = {
        host: '172.30.0.2',
        user: 'root',
        password: '12345',
        database: 'inventory',
        port: '3307'
    },
    myConn = mysql.createConnection(db_config);

    myConn.connect(function(err){
      return (err)? console.log(`conexión fallida ${err.stack}`) : console.log(`conectado a la base de datos` );
    });

module.exports = myConn;