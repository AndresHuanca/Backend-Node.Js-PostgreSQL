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

// sobreescribir funcion toJSON para no enviar el password- codusuario-id_rol
Usuarios.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());

    values.uid = values.codusuario
    delete values.password;
    delete values.codusuario;
    delete values.id_rol;
    return values;
}

module.exports = Usuarios;