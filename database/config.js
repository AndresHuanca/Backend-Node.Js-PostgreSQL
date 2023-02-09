const { Sequelize } = require('sequelize')

// Para activar DB en Railway activar y cambiar nombre a config.js
// https://railway.app/project/d498fe66-fd6a-420d-8416-7c256b3cbbc2/plugin/716eea3b-c60b-4624-8940-b48868c2fd18/Variables

// CONFIG URI CLOUD
// Otra forma de conectar db
const db =  new Sequelize( process.env.URI_CLOUD_DB_RAILWAY_POSTGRESQL);

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