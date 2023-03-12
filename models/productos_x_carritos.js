const { DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const { db } = require("../database/config");

const Productos_x_Carritos = db.define('productos_x_carritos', {
    id_producto_x_carrito: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {
        type: DataTypes.DOUBLE,
    },
    subtotal: {
        type: DataTypes.DOUBLE,
    },
    id_producto: {
    type: DataTypes.UUID,
    references: {
        model: "productos", 
        key: 'id_producto'
    }
    },
    id_carrito: {
    type: DataTypes.UUID,
    references: {
        model: "carritos", 
        key: 'id_carrito'
    }
    },
},{ timestamps: false }
);

module.exports = Productos_x_Carritos;
