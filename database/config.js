const { Sequelize } = require('sequelize')

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
    // logging: false,
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