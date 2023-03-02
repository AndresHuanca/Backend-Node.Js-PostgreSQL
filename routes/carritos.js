const { Router } = require('express');

const { check } = require('express-validator');

// Middlewares
const { validarJWT, 
        validarCampos } = require('../middlewares');

// import controllers
const { pro_x_facPut,
        pro_x_facDelete,
        notasPost, 
        notasGet,
        notasPut,
        notasDelete,
        carritoGet,
        carritoPut} = require('../controllers');

const { existeProfesor_x_facultadPorId, 
        existeAlumnoPorId,
        existeCursoPorId,
        existeNotaPorId} = require('../helpers');

const router = Router();

// GET
router.get( '/', carritoGet );

// PUT
router.put( '/:id_nota', [
    validarJWT,
    check( 'id_nota' ).custom( existeNotaPorId ),
    validarCampos
], carritoPut );


module.exports = router;