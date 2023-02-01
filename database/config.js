const { Sequelize } = require('sequelize')

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
    },
    dialectOptions: {
        ssl: {
          require: require, // This will help you. But you will see nwe error
          rejectUnauthorized: false
        }
      },
    // logging: false,
});
// Se exporta db a los modelos

// CONFIG URI CLOUD
// Otra forma de conectar db
// const db =  new Sequelize( process.env.URI_CLOUD_DB_POSTGRESQL);

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