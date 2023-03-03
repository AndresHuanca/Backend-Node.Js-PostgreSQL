const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');

// Modelo de Uusuario
const Categorias = db.define ( 'categorias', { 
    id_categoria: { 
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    nombre: {  
        type: DataTypes.STRING,
        unique: true,
    },
    estado: { 
        type: DataTypes.BOOLEAN, 
    },
},{timestamps: false}
);

module.exports = Categorias;
