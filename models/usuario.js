const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');

// Modelo de Uusuario
const Usuario = sequelize.define ( 'Usuario', { 
    nombre: { 
        type: DataTypes.STRING,
        required: [ true, 'El nombre es obligatorio'],
    },
    password: {  
        type: DataTypes.STRING, 
        required: [ true, 'La contraseña es obligatorio'],
    },
    correo: { 
        type: DataTypes.STRING, 
        required: [ true, 'El correo es obligatorio'],
        unique: true, //correo unico
    },
    estado: { 
        type: DataTypes.BOOLEAN,  
        default: true
    },

});

//sobreescribir funcion toJSON para no enviar el password y el _vv y el _id
// UsuarioSchema.methods.toJSON = function() {

//     const {__v, password, _id, ...usuario } = this.toObject();
//     // cambia nombre de _id a uid
//     usuario.uid = _id;
//     return usuario;

// };

module.exports = Usuario;