const Alumnos = require("./alumnos");
const Facultades = require("./facultades");
const Profesores = require("./profesores");
const Profesores_x_Facultades = require("./profesores_x_facultades");
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

// FACULTADES 1 -------N ALUMNOS
// Uno a muchos, 1 a N
// Facultades va a tener muchas alumnos
// Se añade una clave id_facultad a la tabla Alumnos
Facultades.hasMany(Alumnos, {as:'faculties_x_students', foreignKey:'id_facultad'});

// Se añade una clave id_rol a la tabla Usuarios
Alumnos.belongsTo( Facultades, {as: 'students_x_faculties', foreignKey:'id_facultad'} );

// NaN
// El usuario pertenezca a varias bandas
// Esto crear una nueva tabla en la base de datos llamada profesores_x_facultades
// user.addBand user.getBands...etc.

Profesores.belongsToMany(Facultades, { through: "profesores_x_facultades" , foreignKey:'id_profesor', otherKey: 'id_profesor' });
Facultades.belongsToMany(Profesores, { through: "profesores_x_facultades" , foreignKey:'id_facultad', otherKey: 'id_facultad'});

// Profesores.belongsToMany(Facultades, { through: "profesores_x_facultades" , sourceKey: 'id_profesor', targetKey: 'id_facultad'});
// Facultades.belongsToMany(Profesores, { through: "profesores_x_facultades" , sourceKey: 'id_facultad', targetKey: 'id_profesor' });


// Profesores.belongsToMany(Facultades, { through: Profesores_x_Facultades });
// Facultades.belongsToMany(Profesores, { through: Profesores_x_Facultades });

// Facultades.belongsToMany(Profesores, { through: "profesores_x_facultades"});
// Facultades.belongsToMany(Profesores, { through: "profesores_x_facultades"})