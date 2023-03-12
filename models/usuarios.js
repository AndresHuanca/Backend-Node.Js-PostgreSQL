const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');
const Carritos = require('./carritos');

// Modelo de Uusuario
const Usuarios = db.define ( 'usuarios', { 
    id_usuario: { 
    
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: { 
        
        type: DataTypes.STRING,
    },
    apellido: { 
        
        type: DataTypes.STRING,
    },
    password: {  
        type: DataTypes.STRING, 
        
        // required: [ true, 'La contraseña es obligatorio'],
    },
    correo: { 
        type: DataTypes.STRING, 
        unique: true, //correo unico
    },
    img: { 
        type: DataTypes.STRING, 
    },
    id_rol:{
        type: DataTypes.UUID,
        references: {
            model: 'roles',
            key: 'id_rol'
        },
    },
}, {timestamps: false}
);


// sobreescribir funcion toJSON para no enviar el password- codusuario-id_rol
Usuarios.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());

    delete values.password;
    // delete values.id_rol;
    return values;
}

module.exports = Usuarios;