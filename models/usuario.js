const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');

// Modelo de Uusuario
const Usuarios = db.define ( 'usuarios', { 
    codusuario: { 
    
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: { 
        
        type: DataTypes.STRING,
        unique: true,
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
    id_rol:{
        type: DataTypes.UUID,
        references: {
            model: 'roles',
            key: 'id_rol'
        },
    }
    
});

// // sobreescribir funcion toJSON para no enviar el password y el _vv y el _id "No funciona"
// Usuarios.toJSON = function() {
//     // en postgres es sin el methods
//     const { password, codusuario, ...usuario } = this.toObject();
//     // cambia nombre de _id a uid
//     usuario.uid = codusuario;
//     return usuario;

// };

module.exports = Usuarios;