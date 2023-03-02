// const { Sequelize, DataTypes } = require('sequelize');
// // const sequelize = new Sequelize('sqlite::memory:');

// const { db } = require('../database/config');

// // Modelo de Uusuario
// const Profesores = db.define ( 'profesores', { 
//     id_profesor: { 
    
//         type: DataTypes.UUID,
//         primaryKey: true,
//         autoIncrement: true,
//         unique: true,
//     },
//     nombre: {  
//         type: DataTypes.STRING, 
//     },
//     apellido: { 
//         type: DataTypes.STRING, 
//     },
//     email: { 
//         type: DataTypes.STRING, 
//         unique: true, //correo unico
//     },
//     telefono: { 
//         type: DataTypes.STRING, 
//         unique: true, //correo unico
//     },
    
// });

// // sobreescribir funcion toJSON para no enviar el password- codusuario-id_rol
// // Facultades.prototype.toJSON = function () {
// //     let values = Object.assign({}, this.get());

// //     // delete values.id_facultad;
// //     // delete values.codusuario;
// //     delete values.id_tipo;
// //     return values;
// // }
// module.exports = Profesores;
