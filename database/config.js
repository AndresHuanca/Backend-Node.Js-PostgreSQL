const { Sequelize } = require('sequelize')


const db =new Sequelize('test', 'postgres', '123456*', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    }
    // logging: false,
});


const dbConection = async () => {
    try {
        await db.authenticate();
        console.log("Data Base Online")
    
    } catch ( error ) {
        throw new Error( error );
    }

}


module.exports = {
    dbConection
};