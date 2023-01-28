//optmizando importaciones 

const usuariosCont = require('./usuarios');
const authCont = require('./auth');
const facultadesCont = require('./facultades');
const alumnosCont = require('./alumnos');
const profesoresCont = require('./profesores');
const profesores_x_facultadesCont = require('./profesores_x_facultades');



module.exports = {
    ...usuariosCont,
    ...authCont,
    ...facultadesCont,
    ...alumnosCont,
    ...profesoresCont,
    ...profesores_x_facultadesCont
};