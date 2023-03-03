//optmizando importaciones 

const usuariosCont = require('./usuarios');
const authCont = require('./auth');
const comprasCont = require('./compras');
const carritos = require('./carritos');
const productosCont = require('./productos');
// const profesoresCont = require('./profesores');
// const profesores_x_facultadesCont = require('./profesores_x_facultades');
const categorias = require('./categorias');


module.exports = {
    ...usuariosCont,
    ...authCont,
    ...comprasCont,
    ...productosCont,
    // ...profesoresCont,
    // ...profesores_x_facultadesCont,
    ...carritos,
    ...categorias,
};