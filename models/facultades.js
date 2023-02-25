const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');

// Modelo de Uusuario
const Facultades = db.define ( 'facultades', { 
    id_facultad: { 
    
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    telefono: {  
        type: DataTypes.STRING, 
        unique: true,
    },
    web: { 
        type: DataTypes.STRING, 
        // required: [ true, 'El correo es obligatorio'],
        unique: true, //correo unico
    },
    codusuario:{
        type: DataTypes.UUID,
        references: {
            model: 'usuarios',
            key: 'codusuario'
        },
    },
    id_tipo:{
        type: DataTypes.UUID,
        references: {
            model: 'tipos_de_facultades',
            key: 'id_tipo'
        },
    }
},{timestamps: false}
);

// sobreescribir funcion toJSON para no enviar el password- codusuario-id_rol
Facultades.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());

    // delete values.id_facultad;
    // delete values.codusuario;
    delete values.id_tipo;
    return values;
}
module.exports = Facultades;
