//optmizando importaciones 

const usuariosCont = require('./usuarios');
const authCont = require('./auth');
const comprasCont = require('./compras');
// const alumnosCont = require('./alumnos');
// const profesoresCont = require('./profesores');
// const profesores_x_facultadesCont = require('./profesores_x_facultades');
const carritos = require('./carritos');
const cursos = require('./cursos');


module.exports = {
    ...usuariosCont,
    ...authCont,
    ...comprasCont,
    // ...alumnosCont,
    // ...profesoresCont,
    // ...profesores_x_facultadesCont,
    ...carritos,
    ...cursos,
};