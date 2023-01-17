const Facultades = require("./facultades");
const Roles = require("./roles");
const Tipos_de_Facultades = require("./tipos_de_facultades");
const Usuarios = require("./usuarios");

// ROLES 1 -------N USUARIOS
// Uno a muchos, 1 a N
// Roles va a tener muchos Usuarios o users
// Se añade una clave id_rol a la tabla Usuarios
Roles.hasMany( Usuarios, {as:'users', foreignKey:'id_rol'});

// Se añade una clave id_rol a la tabla Usuarios
Usuarios.belongsTo( Roles, {as: 'rols', foreignKey:'id_rol'} );

// TIPOS_DE_FACULTADES 1 -------N FACULTADES
// Uno a muchos, 1 a N
// Tipos_de_facultades va a tener muchas facultades
// Se añade una clave id_tipo a la tabla Facultades
Tipos_de_Facultades.hasMany(Facultades, {as:'faculties', foreignKey:'id_tipo'});

// Se añade una clave id_rol a la tabla Usuarios
Facultades.belongsTo( Tipos_de_Facultades, {as: 'types', foreignKey:'id_tipo'} );

// USUARIOS 1 -------N FACULTADES
// Uno a muchos, 1 a N
// Usuarios va a tener muchas facultades
// Se añade una clave codusuario a la tabla Facultades
Usuarios.hasMany(Facultades, {as:'users_x_faculties', foreignKey:'codusuario'});

// Se añade una clave id_rol a la tabla Usuarios
Facultades.belongsTo( Usuarios, {as: 'faculties_x_users', foreignKey:'codusuario'} );

