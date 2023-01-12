const Roles = require("./role");
const Usuarios = require("./usuario");



// Uno a muchos, 1 a N
// Roles va a tener muchos Usuarios o users
// Se añade una clave id_rol a la tabla Usuarios
Roles.hasOne(Usuarios, {as:'users', foreignKey:'id_rol'});

// Se añade una clave id_rol a la tabla Usuarios
Usuarios.belongsTo( Roles, {as: 'rols', foreignKey:'id_rol'} );

