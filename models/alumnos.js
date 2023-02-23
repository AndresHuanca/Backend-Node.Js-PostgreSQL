const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');

// Modelo de Uusuario
const Alumnos = db.define ( 'alumnos', { 
    id_alumno: { 
    
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
    email: { 
        type: DataTypes.STRING, 
        unique: true, //correo unico
    },
    telefono: { 
        type: DataTypes.STRING, 
        unique: true, //correo unico
    },
    id_facultad:{
        type: DataTypes.UUID,
        references: {
            model: 'facultades',
            key: 'id_facultad'
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
module.exports = Alumnos;
