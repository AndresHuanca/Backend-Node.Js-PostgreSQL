//optmizando importaciones 

const usuariosCont = require('./usuarios');
const authCont = require('./auth');
const facultadesCont = require('./facultades');

module.exports = {
    ...usuariosCont,
    ...authCont,
    ...facultadesCont
};