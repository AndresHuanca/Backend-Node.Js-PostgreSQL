const express = require('express');
const cors = require('cors');
// const fileUpload = require('express-fileupload');

const { dbConection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:                   '/api/auth',
            alumnos:                '/api/alumnos',
            buscar:                 '/api/buscar',
            cursos:                 '/api/cursos',
            facultades:             '/api/facultades',
            notas                   :'/api/notas',
            profesores:             '/api/profesores',
            profesores_x_facultades:'/api/profesores_x_facultades',
            usuarios:               '/api/usuarios',
            uploads:                '/api/uploads'
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
        //cors
        this.app.use( cors() );

        //lectura y parseo del body recibir de json
        this.app.use( express.json() );

        // directorio publico
        this.app.use( express.static('public') );

        //FileUpload - carga de archivos
        // this.app.use(fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/',
        //     createParentPath: true //crea las carpetas donde guardar archivos automaticamente
        // })); 

    }

    //siguiente ruta(get- put- post- delete)
    routes() {
        
        this.app.use(  this.paths.auth,                    require('../routes/auth') );
        this.app.use(  this.paths.alumnos,                 require('../routes/alumnos') );
        // this.app.use(  this.paths.buscar,                  require('../routes/buscar') );
        this.app.use(  this.paths.cursos,                  require('../routes/cursos') );
        this.app.use(  this.paths.facultades,              require('../routes/facultades') );
        this.app.use(  this.paths.notas,                   require('../routes/notas') );
        this.app.use(  this.paths.profesores,              require('../routes/profesores') );
        this.app.use(  this.paths.profesores_x_facultades, require('../routes/profesores_x_facultades') );
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