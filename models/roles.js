const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../database/config');

//debe tener el mismo nombre de la coleccion pero sin la "s"
// Modelo de Uusuario
const Roles = db.define ( 'roles', { 
    id_rol: { 
        
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: true,
    },
    rol:{
        type: DataTypes.STRING,
    }
},{timestamps: false});


module.exports = Roles;