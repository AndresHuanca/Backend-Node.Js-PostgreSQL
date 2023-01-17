const { Router } = require('express');

//importando para la validacion
const { check } = require('express-validator');

//importando db-validators
const { existeCategoriaPorId, 
        esFacultadValido,
        emailNoExiste} = require('../helpers/db-validators');

//Middlewares 
const { validarJWT,
        validarCampos, 
        esAdminRole} = require('../middlewares');

// Import controllers
const { facultadesPost, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto,
        eliminarProducto} = require('../controllers/facultades');

const router = Router();

// {{url}}/api/productos
// GET obtener todos los productos publico
router.get( '/', obtenerProductos );

// Obtener una categoria by id - publico
// validar si el id existe
router.get( '/:id', [
    check( 'id', 'No es un Id Valido' ).isMongoId(),
    validarCampos
], obtenerProducto );

// Crear una categoria - privado - cualquier persona with a token validate
router.post( '/', [
    check( 'facultad', 'La Facultad es obligatorio' ).not().isEmpty(),
    check( 'facultad').custom( esFacultadValido ),
    validarCampos

], facultadesPost );

// Actualizar - privado - cualquier persona with a token validate
// minimo venga el nombre
router.put( '/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'id', 'No es un Id Valido' ).isMongoId(),
    validarCampos

], actualizarProducto );


// Delete an categoria - Admin
// que sea un id de mongo
router.delete( '/:id', [
    validarJWT,
    esAdminRole,
    check( 'id', 'No es un Id Valido' ).isMongoId(),
    validarCampos

], eliminarProducto );

module.exports = router;