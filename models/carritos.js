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
        type: DataTypes.FLOAT,
    },
    id_usuario:{
        type: DataTypes.UUID,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        },
    },
},{
    timestamps: false,
  },
);

module.exports = Carritos;
