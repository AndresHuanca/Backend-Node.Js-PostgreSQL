const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');

// Modelo de Uusuario
const Productos = db.define ( 'productos', { 
    id_producto: { 
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {  
        type: DataTypes.STRING, 
    },
    descripcion: { 
        type: DataTypes.STRING, 
    },
    precio: { 
        type: DataTypes.DOUBLE, 
        unique: true, //correo unico
    },
    img: { 
        type: DataTypes.STRING, 
        unique: true, //correo unico
    },
    disponible: { 
        type: DataTypes.BOOLEAN, 
        unique: true, //correo unico
    },
    id_categoria:{
        type: DataTypes.UUID,
        references: {
            model: 'categorias',
            key: 'id_categoria'
        },
    },
    },{timestamps: false},    
);

// sobreescribir funcion toJSON para no enviar el password- codusuario-id_rol
// Facultades.prototype.toJSON = function () {
//     let values = Object.assign({}, this.get());

//     // delete values.id_facultad;
//     // delete values.codusuario;
//     delete values.id_tipo;
//     return values;
// }
module.exports = Productos;
