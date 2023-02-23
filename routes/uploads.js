const { Router } = require('express');

const { check } = require('express-validator');

const { cargarArchivos, 
    actualizarImagen, 
    mostrarImagen, 
    actualizarImagenCloudinary, 
    } = require('../controllers/uploads');

const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir, validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//POST - carga de archivos - validar mdinate midelwares token minimo
router.post( '/', [
    validarJWT,
    validarArchivoSubir
], cargarArchivos );

// PUT - actualizar Archivo
router.put( '/:coleccion/:id', [
    validarJWT,
    validarArchivoSubir,
    check( 'id', 'No es un Id Valido' ).isUUID(),
    check( 'coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'alumnos' ]) ),
    validarCampos
], actualizarImagenCloudinary);
// ], actualizarImagen );

// GET - Display Image
router.get( '/:coleccion/:id', [
    validarJWT,
    check( 'id', 'No es un Id Valido' ).isUUID(),
    check( 'coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'alumnos' ]) ),
    validarCampos
], mostrarImagen );
// ], mostrarImagenCloudinary );


module.exports = router;