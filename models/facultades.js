const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');

// Modelo de Uusuario
const Facultades = db.define ( 'facultades', { 
    id_facultad: { 
    
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    telefono: {  
        type: DataTypes.STRING, 
        unique: true,
        // required: [ true, 'La contraseña es obligatorio'],
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
    
});


// //sobreescribir funcion toJSON para no enviar el password y el _vv y el _id en el postman
// ProductoSchema.methods.toJSON = function() {

//     const {__v, estado, ...data } = this.toObject();
//     data.usuario.uid = data.usuario._id;
//     delete data.usuario._id;
//     return data;

// };
module.exports = Facultades;