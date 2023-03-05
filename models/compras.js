const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');
const Usuarios = require('./usuarios');

// Modelo de Uusuario
const Compras = db.define ( 'compras', { 
    id_compra: { 
    
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    fecha: {  
        type: DataTypes.DATE, 
        unique: true,
    },
    hora: { 
        type: DataTypes.TIME, 
        unique: true, //correo unico
    },
    id_usuario:{
        type: DataTypes.UUID,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        },
    },
    id_carrito:{
        type: DataTypes.UUID,
        references: {
            model: 'carrito',
            key: 'id_carrito'
        },
    },
},{timestamps: false}
);


// sobreescribir funcion toJSON para no enviar el password- codusuario-id_rol
Compras.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());

    // delete values.codusuario;
    return values;
}
module.exports = Compras;
