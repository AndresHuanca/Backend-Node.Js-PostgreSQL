//optmizando importaciones 

const Productos = require('./productos');
const Roles = require('./roles');
const Server = require('./server');
const Usuarios = require('./usuarios');
const Compras = require('./compras');
const Asociaciones = require('./asociaciones');
// const Tipos_de_Facultades = require('./tipos_de_facultades');
const Profesores = require('./profesores');
const Productos_x_Carritos = require('./productos_x_carritos');
const Carritos = require('./carritos');
const Categorias = require('./categorias');



module.exports = {
    Server,
    Usuarios,
    Roles,
    Compras,
    Carritos,
    Productos,
    Asociaciones,
    // Tipos_de_Facultades,
    Productos_x_Carritos,
    Profesores,
    Categorias,
    
};