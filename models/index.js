//optmizando importaciones 

const Alumnos = require('./alumnos');
const Roles = require('./roles');
const Server = require('./server');
const Usuarios = require('./usuarios');
const Facultades = require('./facultades');
const Asociaciones = require('./asociaciones');
const Tipos_de_Facultades = require('./tipos_de_facultades');
const Profesores_x_Facultades = require('./profesores_x_facultades');
const Profesores = require('./profesores')



module.exports = {
    Alumnos,
    Facultades,
    Roles,
    Server,
    Usuarios,
    Asociaciones,
    Tipos_de_Facultades,
    Profesores_x_Facultades,
    Profesores
};