const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usuarios:                   '/api/usuarios',
            auth:                       '/api/auth',
            compras:                    '/api/compras',
            carritos:                   '/api/carritos',
            productos:                  '/api/productos',
            buscar:                     '/api/buscar',
            categorias:                  '/api/categorias',
            // profesores:             '/api/profesores',
            productos_x_carritos:         '/api/productos_x_carritos',
            uploads:                     '/api/uploads',
        };

        // Conectar a base de datos
        this.conectarDB();   
        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    // DB
    async conectarDB() {
        await dbConection();
    }

    // MIddlewares es una funcion que se ejecuta antes de llamar un controlador o un modelo
    middlewares() {
        
        const whitelist = ['http://localhost:3000', 'https://login-api-nodejspostgresql-production.up.railway.app'];

        //cors
        this.app.use( cors({origin: whitelist}) );

        //lectura y parseo del body recibir de json
        this.app.use( express.json() );

        // directorio publico
        this.app.use( express.static('public') );

        //FileUpload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true //crea las carpetas donde guardar archivos automaticamente
        })); 

    }

    //siguiente ruta(get- put- post- delete)
    routes() {
        
        this.app.use(  this.paths.auth,                    require('../routes/auth') );
        this.app.use(  this.paths.productos,               require('../routes/productos') );
        this.app.use(  this.paths.buscar,                  require('../routes/buscar') );
        this.app.use(  this.paths.categorias,              require('../routes/categorias') );
        this.app.use(  this.paths.compras,                 require('../routes/compras') );
        this.app.use(  this.paths.carritos,                require('../routes/carritos') );
        // this.app.use(  this.paths.profesores,              require('../routes/profesores') );
        this.app.use(  this.paths.productos_x_carritos,     require('../routes/productos_x_carritos') );
        this.app.use(  this.paths.usuarios,                require('../routes/usuarios') );
        this.app.use(  this.paths.uploads,                 require('../routes/uploads') );

    }

    listen() {
        
        this.app.listen( this.port, () => {
        console.log('Hello World', this.port );
        });
    }

}

module.exports = Server;