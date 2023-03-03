//optmizando importaciones 

const Productos = require('./productos');
const Roles = require('./roles');
const Server = require('./server');
const Usuarios = require('./usuarios');
const Compras = require('./compras');
const Asociaciones = require('./asociaciones');
// const Tipos_de_Facultades = require('./tipos_de_facultades');
const Profesores = require('./profesores');
// const Profesores_x_Facultades = require('./profesores_x_facultades');
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
    // Profesores_x_Facultades,
    Profesores,
    Categorias,
    
};