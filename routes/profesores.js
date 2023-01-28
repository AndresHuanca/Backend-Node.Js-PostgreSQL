const { Router } = require('express');

const { check } = require('express-validator');

// Middlewares
const { validarJWT, 
        validarCampos } = require('../middlewares');

// import controllers
const { profesoresPost, 
        profesoresGet,
        profesoresDelete,
        profesoresPut} = require('../controllers');

const { existeAlumnoPorId, existeProfesorPorId } = require('../helpers');


const router = Router();

// {{url}}/api/categorias

// Obtener todas las categorias - publico
router.get( '/', profesoresGet );


// Crear una categoria - privado - cualquier persona with a token validate
router.post( '/', [ 
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'apellido', 'El apellido es obligatorio').not().isEmpty(),
    check( 'email', 'El email no es valido' ).isEmail(), //validacion que sea email
    check( 'telefono', 'El telefono es obligatorio' ).not().isEmpty(),
    check( 'telefono', 'El numero de telefono es numerico' ).isNumeric(),
    check( 'telefono', 'El numero de debe tener 9 numeros' ).isLength({min :9, max:9}),
    validarCampos
], profesoresPost );

// Actualizar - privado - cualquier persona with a token validate
// minimo venga el nombre
router.put( '/:id_profesor', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'apellido', 'El apellido es obligatorio').not().isEmpty(),
    check( 'email', 'El email no es valido' ).isEmail(), //validacion que sea email
    check( 'telefono', 'El telefono es obligatorio' ).not().isEmpty(),
    check( 'telefono', 'El numero de telefono es numerico' ).isNumeric(),
    check( 'telefono', 'El numero de debe tener 9 numeros' ).isLength({min :9, max:9}),
    check( 'id_profesor' ).custom( existeProfesorPorId ),
    validarCampos
], profesoresPut );

// Delete an teacher
router.delete( '/:id_profesor', [
    validarJWT,
    check( 'id_profesor' ).custom( existeProfesorPorId ),
    validarCampos
], profesoresDelete );


module.exports = router;