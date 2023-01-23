const { Router } = require('express');

//importando para la validacion
const { check } = require('express-validator');

//importando db-validators
const { existeCategoriaPorId, 
        esFacultadValido,
        existeFacultadPorId,
        emailNoExiste} = require('../helpers/db-validators');

//Middlewares 
const { validarJWT,
        validarCampos, 
        esAdminRole} = require('../middlewares');

// Import controllers
const { facultadesPost, 
        eliminarProducto,
        facultadesGet,
        facultadesPut} = require('../controllers/facultades');

const router = Router();

// {{url}}/api/productos
// GET obtener todos los productos publico
router.get( '/', facultadesGet );

// Crear una categoria - privado - cualquier persona with a token validate
router.post( '/', [
    validarJWT,
    check( 'facultad', 'La Facultad es obligatoria' ).notEmpty(),
    check( 'facultad').custom( esFacultadValido ),
    check( 'telefono', 'El telefono es obligatorio' ).not().isEmpty(),
    check( 'telefono', 'El numero de telefono es numerico' ).isNumeric(),
    check( 'telefono', 'El numero de debe tener 9 numeros' ).isLength({min :9, max:9}),
    check( 'web', 'La web es obligatoria' ).not().isEmpty(),
    check( 'web', 'La web es String' ).isString(),
    validarCampos
], facultadesPost );

// Actualizar - privado - cualquier persona with a token validate
// minimo venga el nombre
router.put( '/:id_facultad', [
    validarJWT,
    check( 'telefono', 'El telefono es obligatorio' ).not().isEmpty(),
    check( 'telefono', 'El numero de telefono es numerico' ).isNumeric(),
    check( 'telefono', 'El numero de debe tener 9 numeros' ).isLength({min :9, max:9}),
    check( 'id_facultad', 'El id_facultad es obligatorio' ).not().isEmpty(),
    check( 'id_facultad' ).custom(existeFacultadPorId),
    check( 'facultad').custom( esFacultadValido ),
    validarCampos
], facultadesPut );


// Delete an categoria - Admin
// que sea un id de mongo
router.delete( '/:id', [
    validarJWT,
    esAdminRole,
    check( 'id', 'No es un Id Valido' ).isMongoId(),
    validarCampos

], eliminarProducto );

module.exports = router;