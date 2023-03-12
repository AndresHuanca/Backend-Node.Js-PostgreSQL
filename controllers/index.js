//optmizando importaciones 

const usuariosCont = require('./usuarios');
const authCont = require('./auth');
const comprasCont = require('./compras');
const carritos = require('./carritos');
const productosCont = require('./productos');
// const profesoresCont = require('./profesores');
const productos_x_carritoCont = require('./productos_x_carritos');
const categorias = require('./categorias');


module.exports = {
    ...usuariosCont,
    ...authCont,
    ...comprasCont,
    ...productosCont,
    // ...profesoresCont,
    productos_x_carritoCont,
    ...carritos,
    ...categorias,
};