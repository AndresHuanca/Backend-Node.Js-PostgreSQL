const { Router } = require('express');

const { check } = require('express-validator');

// Middlewares
const { validarJWT, 
        validarCampos } = require('../middlewares');

// import controllers
const { cursosPost,
        cursosGet,
        cursosPut,
        cursosDelete} = require('../controllers');

const { existeCursoPorId } = require('../helpers');

const router = Router();

// Obtener todos los cursos - publico
router.get( '/', cursosGet );

// Crear una categoria - privado - cualquier persona with a token validate
router.post( '/', [ 
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], cursosPost );

// Actualizar - privado - cualquier persona with a token validate
// minimo venga el nombre
router.put( '/:id_curso', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check( 'id_curso' ).custom( existeCursoPorId ),
    validarCampos
], cursosPut );

// Delete an teacher
router.delete( '/:id_curso', [
    validarJWT,
    check( 'id_curso' ).custom( existeCursoPorId ),
    validarCampos
], cursosDelete );


module.exports = router;