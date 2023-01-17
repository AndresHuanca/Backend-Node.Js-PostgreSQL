const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../database/config');

// Modelo de Tipos_de_Facultades
const Tipos_de_Facultades = db.define ( 'tipos_de_facultades', { 
    id_tipo: { 
        
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: true,
    },
    facultad:{
        type: DataTypes.STRING,
    }
});


module.exports = Tipos_de_Facultades;