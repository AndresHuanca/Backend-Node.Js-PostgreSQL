const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const { db } = require('../database/config');

// Modelo de Uusuario
const Cursos = db.define ( 'cursos', { 
    id_curso: { 
    
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    nombre: {  
        type: DataTypes.STRING,
        unique: true,
 
    },
    descripcion: { 
        type: DataTypes.STRING, 
    }
    
});

module.exports = Cursos;
