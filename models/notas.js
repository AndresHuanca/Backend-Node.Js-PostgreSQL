const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const { db } = require("../database/config");

const Notas = db.define('notas', {
    id_nota: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    nota: {
        type: DataTypes.DOUBLE,
    },
    id_alumno: {
    type: DataTypes.UUID,
    references: {
        model: "alumnos", // 'Movies' would also work
        key: 'id_alumno'
    }
    },
    id_curso: {
    type: DataTypes.UUID,
    references: {
        model: "cursos", // 'Actors' would also work
        key: 'id_curso'
    }
    },
    
});

module.exports = Notas;
