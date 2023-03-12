const { Router } = require('express');

//importando para la validacion
const { check } = require('express-validator');

// Middlewares
const { validarJWT, 
        validarCampos } = require('../middlewares');

// import controllers
const { 
        carritoGet, carritoAllGet, carritoOneGet,
        } = require('../controllers');
const validarMuchaSolicitudes = require('../middlewares/muchas-solicitudes');


const router = Router();


// GET car by user
router.get( '/one/:id_usuario', [
        // validarJWT,
        check( 'id_usuario', 'No es un Id Valido' ).isUUID(),
        validarMuchaSolicitudes,
        validarCampos,
], carritoOneGet )

// GET data car by user
router.get( '/get/:id_usuario', [
        // validarJWT,
        check( 'id_usuario', 'No es un Id Valido' ).isUUID(),
        validarCampos,
], carritoGet );


module.exports = router;