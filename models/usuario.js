const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');

// Modelo de Uusuario
const Usuarios = db.define ( 'usuarios', { 
    id: { 
        
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        // required: [ true, 'El nombre es obligatorio'],
    },
    nombre: { 
        
        type: DataTypes.STRING,
        // required: [ true, 'El nombre es obligatorio'],
    },
    password: {  
        type: DataTypes.STRING, 
        
        // required: [ true, 'La contraseña es obligatorio'],
    },
    email: { 
        type: DataTypes.STRING, 
        // required: [ true, 'El correo es obligatorio'],
        unique: true, //correo unico
    },
    estado: { 
        type: DataTypes.BOOLEAN,  
        default: true
    },

});

//sobreescribir funcion toJSON para no enviar el password y el _vv y el _id
Usuarios.toJSON = function() {
    // en postgres es sin el methods
    const {__v, password, _id, ...usuario } = this.toObject();
    // cambia nombre de _id a uid
    usuario.uid = _id;
    return usuario;

};

module.exports = Usuarios;