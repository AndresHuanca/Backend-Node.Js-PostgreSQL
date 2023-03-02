// const { Router } = require('express');

// const { check } = require('express-validator');

// // Middlewares
// const { validarJWT, 
//         validarCampos } = require('../middlewares');

// // import controllers
// const { alumnosPost, 
//         obtenerCategoria, 
//         alumnosGet,
//         alumnosPut,
//         alumnosDelete } = require('../controllers');

// const { existeFacultadPorId,
//         existeAlumnoPorId } = require('../helpers');


// const router = Router();

// // {{url}}/api/categorias

// // Obtener todas las categorias - publico
// router.get( '/', alumnosGet );

// // Obtener una categoria by id - publico
// // validar si el id existe
// // router.get( '/:id', [
// //     check( 'id', 'No es un Id Valido' ).isMongoId(),
// //     check( 'id' ).custom( existeCategoriaPorId ),
// //     validarCampos

// // ], obtenerCategoria );

// // Crear una categoria - privado - cualquier persona with a token validate
// router.post( '/:id_facultad', [ 
//     validarJWT,
//     check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
//     check( 'apellido', 'El apellido es obligatorio').not().isEmpty(),
//     check( 'email', 'El email no es valido' ).isEmail(), //validacion que sea email
//     check( 'telefono', 'El telefono es obligatorio' ).not().isEmpty(),
//     check( 'telefono', 'El numero de telefono es numerico' ).isNumeric(),
//     check( 'telefono', 'El numero de debe tener 9 numeros' ).isLength({min :9, max:9}),
//     check( 'id_facultad' ).custom( existeFacultadPorId ),
//     validarCampos
// ], alumnosPost );

// // Actualizar - privado - cualquier persona with a token validate
// // minimo venga el nombre
// router.put( '/:id_alumno', [
//     validarJWT,
//     check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
//     check( 'apellido', 'El apellido es obligatorio').not().isEmpty(),
//     check( 'email', 'El email no es valido' ).isEmail(), //validacion que sea email
//     check( 'telefono', 'El telefono es obligatorio' ).not().isEmpty(),
//     check( 'telefono', 'El numero de telefono es numerico' ).isNumeric(),
//     check( 'telefono', 'El numero de debe tener 9 numeros' ).isLength({min :9, max:9}),
//     check( 'id_alumno' ).custom( existeAlumnoPorId ),
//     validarCampos
// ], alumnosPut );

// // Delete an categoria - Admin
// // que sea un id de mongo
// router.delete( '/:id_alumno', [
//     validarJWT,
//     check( 'id_alumno' ).custom( existeAlumnoPorId ),
//     validarCampos
// ], alumnosDelete );


// module.exports = router;