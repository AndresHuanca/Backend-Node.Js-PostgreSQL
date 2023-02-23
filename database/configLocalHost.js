const { Sequelize } = require('sequelize')

// Para activar Db Local activar y cambiar nombre a config.js


// CONFIG Local Host
// credenciales en el .env
const db =new Sequelize(
    process.env.NAME_DB_POSTGRESQL,
    process.env.USERNAME_DB_POSTGRESQL,
    process.env.PASSWORD_DB_POSTGRESQL,
    
    {
    host: process.env.HOST_DB_POSTGRESQL,
    dialect: process.env.DIALECT_DB_POSTGRESQL,
    define: {
        timestamps: false
    }
});
// Se exporta db a los modelos

const dbConection = async () => {
    try {
        await db.authenticate();
        console.log("Data Base Online")
    
    } catch ( error ) {
        throw new Error( error );
    }

}

module.exports = {
    dbConection,
    db
};