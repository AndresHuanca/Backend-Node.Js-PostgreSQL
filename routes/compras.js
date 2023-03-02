const { Router } = require('express');

//importando para la validacion
const { check } = require('express-validator');

//importando db-validators
const { existeCompraPorId } = require('../helpers');

//Middlewares 
const { validarJWT,
        validarCampos } = require('../middlewares');

// Import controllers
const { comprasPost,
        comprasGet,
        comprasPut,
        comprasDelete } = require('../controllers');

const router = Router();

// GET
router.get( '/', comprasGet );

// POST
// router.post( '/', [
//     validarJWT,
//     check( 'fecha', 'La fecha es obligatoria' ).notEmpty(),
//     check( 'hora', 'El telefono es obligatorio' ).not().isEmpty(),
//     check( 'fecha', 'La fecha es date' ).isDate(),
//     validarCampos
// ], comprasPost );

// PUT
// router.put( '/:id_compra', [
//     validarJWT,
//     check( 'id_compra', 'No es un Id Valido' ).isUUID(),
//     check( 'fecha', 'El telefono es obligatorio' ).not().isEmpty(),
//     check( 'hora', 'El telefono es obligatorio' ).not().isEmpty(),
//     check( 'fecha', 'La fecha es date' ).isDate(),
//     check( 'id_compra' ).custom(existeCompraPorId),
//     validarCampos
// ], comprasPut );

// DELETE
router.delete( '/:id_compra', [
    validarJWT,
    check( 'id_compra', 'No es un Id Valido' ).isUUID(), 
    check( 'id_compra' ).custom(existeCompraPorId),
    validarCampos
], comprasDelete );

module.exports = router;