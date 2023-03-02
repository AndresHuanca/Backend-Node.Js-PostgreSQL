const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const { db } = require("../database/config");

const Carritos = db.define('carritos', {
    id_carrito: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    total: {
        type: DataTypes.DOUBLE,
    },
},{ timestamp: false});

module.exports = Carritos;
