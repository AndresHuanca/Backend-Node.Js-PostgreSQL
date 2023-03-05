const Carritos = require("./carritos");
const Categorias = require("./categorias");
const  Compras  = require("./compras");
const Productos = require("./productos");
// const Alumnos = require("./alumnos");
// const Facultades = require("./facultades");
// const Profesores = require("./profesores");
const Roles = require("./roles");
const Usuarios = require("./usuarios");

// ROLES 1 -------N USUARIOS
// Uno a muchos, 1 a N
// Roles va a tener muchos Usuarios o users
// Se añade una clave id_rol a la tabla Usuarios
Roles.hasMany( Usuarios, {as:'users', foreignKey:'id_rol'});

// Se añade una clave id_rol a la tabla Usuarios
Usuarios.belongsTo( Roles, {as: 'rols', foreignKey:'id_rol'} );

// USUARIOS 1 -------N FACULTADES
// Uno a muchos, 1 a N
// Usuarios va a tener muchas facultades
// Se añade una clave codusuario a la tabla Facultades
Usuarios.hasMany( Compras, {as:'shopping_x_users', foreignKey:'id_usuario'});

// Se añade una clave id_rol a la tabla Usuarios
Compras.belongsTo( Usuarios, {as: 'users_x_shopping', foreignKey:'id_usuario'} );

// USUARIOS 1 -------N FACULTADES
// Uno a muchos, 1 a N
// Usuarios va a tener muchas facultades
// Se añade una clave codusuario a la tabla Facultades
Carritos.hasMany( Compras, {as:'shopping_x_cart', foreignKey:'id_carrito'});

// Se añade una clave id_rol a la tabla Usuarios
Compras.belongsTo( Carritos, {as: 'cart_x_shopping', foreignKey:'id_carrito'} );

// NaN
// El usuario pertenezca a varias bandas
// Esto crear una nueva tabla en la base de datos llamada profesores_x_facultades
// user.addBand user.getBands...etc.

// otherKey asigna el fk especifico que se implementa en la DB
Usuarios.belongsToMany(Carritos, { through: "cart_x_users" , foreignKey:'id_usuario', otherKey: 'id_usuario'});
Carritos.belongsToMany(Usuarios, { through: "cart_x_users" , foreignKey:'id_carrito', otherKey: 'id_carrito' });

// CATEGORIAS 1 -------N PRODUCTOS
Categorias.hasMany( Productos, {as:'category_x_product', foreignKey:'id_categoria'});

Productos.belongsTo( Categorias, {as: 'product_x_category', foreignKey:'id_categoria'} );

