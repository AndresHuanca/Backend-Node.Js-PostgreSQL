const Carritos = require("./carritos");
const Categorias = require("./categorias");
const Productos = require("./productos");
const Productos_x_Carritos = require("./productos_x_carritos");
const Roles = require("./roles");
const Usuarios = require("./usuarios");

// ROLES 1 -------N USUARIOS
// Uno a muchos, 1 a N
// Roles va a tener muchos Usuarios o users
// Se añade una clave id_rol a la tabla Usuarios
Roles.hasMany( Usuarios, {as:'users', foreignKey:'id_rol'});
// Se añade una clave id_rol a la tabla Usuarios
Usuarios.belongsTo( Roles, {as: 'rols', foreignKey:'id_rol'} );


// CATEGORIAS 1 -------N PRODUCTOS
Categorias.hasMany( Productos, {as:'category_x_product', foreignKey:'id_categoria'});
Productos.belongsTo( Categorias, {as: 'product_x_category', foreignKey:'id_categoria'} );


// CATEGORIAS------CATEGORIAS "Recursividad"
Categorias.hasMany( Categorias, { as: 'categorias_hijas', foreignKey: 'id_categoria_padre' });
Categorias.belongsTo( Categorias, { as: 'categoria_padre', foreignKey: 'id_categoria_padre' });

// Usuario 1 ............... 1 CARRITO
Usuarios.hasOne(Carritos, { as:'car', foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Carritos.belongsTo(Usuarios, { as: 'user', foreignKey: 'id_usuario' });

// NaN PRODUCTOS N.................... CARRITOS
// otherKey asigna el fk especifico que se implementa en la DB
Productos.belongsToMany( Carritos, { through: "productos_x_carritos" , foreignKey:'id_producto', otherKey: 'id_producto',onDelete: 'CASCADE' });
Carritos.belongsToMany( Productos, { through: "productos_x_carritos" , foreignKey:'id_carrito', otherKey: 'id_carrito'})

// CARRITOS 1------N  PRODUCTOS_X_CARRITO
Carritos.hasMany( Productos_x_Carritos, { as: 'cars', foreignKey: 'id_carrito', onDelete: 'CASCADE' });
Productos_x_Carritos.belongsTo( Carritos, { as: 'productsCars', foreignKey: 'id_carrito' });

// PRODUCTOS 1------N  PRODUCTOS_X_CARRITO
Productos.hasMany( Productos_x_Carritos, { as: 'products', foreignKey: 'id_producto', onDelete: 'CASCADE' });
Productos_x_Carritos.belongsTo( Productos, { as: 'productsProducts', foreignKey: 'id_producto' });


