//optmizando importaciones 

const usuariosCont = require('./usuarios');
const authCont = require('./auth');
const facultadesCont = require('./facultades');
const alumnosCont = require('./alumnos');
const profesoresCont = require('./profesores');



module.exports = {
    ...usuariosCont,
    ...authCont,
    ...facultadesCont,
    ...alumnosCont,
    ...profesoresCont
};