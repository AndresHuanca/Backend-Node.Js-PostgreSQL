const { Router } = require('express');

const { check } = require('express-validator');

// Middlewares
const { validarJWT, 
        validarCampos } = require('../middlewares');

// import controllers
const { pro_x_carPost, pro_x_carDelete, pro_x_carPatch } = require('../controllers/productos_x_carritos');


const {  
        existeProductoPorId,
        existeCarritoPorId,
        existeProducto_x_CarritoPorId} = require('../helpers');

const router = Router();

// Obtener todas los profesores_x_facultad - publico
// router.get( '/', pro_x_facGet );


// POST
router.post( '/', [ 
    // validarJWT,
    check( 'cantidad', 'La cantidad es numero' ).isNumeric(), //validacion que sea email
    check( 'id_producto' ).custom( existeProductoPorId ),
    check( 'id_carrito' ).custom( existeCarritoPorId ),
    validarCampos
], pro_x_carPost );

// PATCH
router.patch( '/:id_producto_x_carrito', [
    // validarJWT,
    check( 'id_producto_x_carrito', 'No es un Id Valido' ).isUUID(),
    check( 'cantidad', 'Cantidad es un numero' ).isNumeric(), 
    check( 'id_producto_x_carrito' ).custom( existeProducto_x_CarritoPorId ),
    validarCampos
], pro_x_carPatch );

// DELETE
router.delete( '/:id_producto_x_carrito', [
    // validarJWT,
    check( 'id_producto_x_carrito' ).custom( existeProducto_x_CarritoPorId ),
    validarCampos
], pro_x_carDelete );


module.exports = router;