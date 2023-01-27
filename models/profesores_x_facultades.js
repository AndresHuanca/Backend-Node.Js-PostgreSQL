const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const { db } = require("../database/config");

const Profesores_x_Facultades = db.define('profesores_x_facultades', {
    id_profesor_x_facultad: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    id_profesor: {
    type: DataTypes.UUID,
    references: {
        model: "profesores", // 'Movies' would also work
        key: 'id_profesor'
    }
    },
    id_facultad: {
    type: DataTypes.UUID,
    references: {
        model: "facultades", // 'Actors' would also work
        key: 'id_facultad'
    }
    },
    // Example de concatenación de variables
    proFacFull: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.id_profesor}-${this.id_facultad}`;
        },
        set(value) {
            throw new Error('Do not try to set the `proFacFull` value!');
        }
    }
    
});



module.exports = Profesores_x_Facultades;
