const { Router } = require('express');

const { check } = require('express-validator');

// Middlewares
const { validarJWT, 
        validarCampos } = require('../middlewares');

// import controllers
const { 
        productosGet,
        productosPost,
        productosPut, 
        productosDelete} = require('../controllers');

const {  
        existeProductoPorId,
        esCategoriaValido } = require('../helpers');


const router = Router();

// GET ALL
router.get( '/', productosGet );

// Obtener una categoria by id - publico
// validar si el id existe
// router.get( '/:id', [
//     check( 'id', 'No es un Id Valido' ).isMongoId(),
//     check( 'id' ).custom( existeCategoriaPorId ),
//     validarCampos

// ], obtenerCategoria );


// POST
router.post( '/', [ 
    // validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check( 'precio', 'El precio es obligatorio').not().isEmpty(),
    check( 'img', 'La img es obligatorio').not().isEmpty(),
    check( 'disponible', 'Disponible es obligatorio' ).not().isEmpty(), //validacion que sea email
    check( 'precio', 'El precio es numerico' ).isNumeric(),
    check( 'disponible', 'El precio es numerico' ).isBoolean(),
    check( 'categoria' ).custom( esCategoriaValido ),
    validarCampos
], productosPost );

// PUT
router.put( '/:id_producto', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check( 'precio', 'El precio es obligatorio').not().isEmpty(),
    check( 'precio', 'El precio debe ser un numero').isNumeric(),
    check( 'img', 'La imagen es obligatoria' ).not().isEmpty(),
    check( 'disponible', 'El numero de telefono es numerico' ).isBoolean(),
    check( 'categoria' ).custom( esCategoriaValido ),
    check( 'id_producto' ).custom( existeProductoPorId ),
    validarCampos
], productosPut );

// DELETE
router.delete( '/:id_producto', [
    // validarJWT,
    check( 'id_producto' ).custom( existeProductoPorId ),
    validarCampos
], productosDelete );


module.exports = router;