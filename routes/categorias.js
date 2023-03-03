const { Router } = require('express');

const { check } = require('express-validator');

// Middlewares
const { validarJWT, 
        validarCampos } = require('../middlewares');

// import controllers
const { cursosPost,
        cursosGet,
        cursosPut,
        cursosDelete,
        categoriasPost,
        categoriasDelete,
        categoriasGet,
        categoriasPut} = require('../controllers');

const { existeCursoPorId, existeCategoriaPorId } = require('../helpers');

const router = Router();

// Obtener todos los cursos - publico
router.get( '/', categoriasGet );

// Crear una categoria - privado - cualquier persona with a token validate
router.post( '/', [ 
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'estado', 'El Estado es obligatorio').not().isEmpty(),
    check( 'estado', 'El Estado es obligatorio').isBoolean(),
    validarCampos
], categoriasPost );

// Actualizar 
router.put( '/:id_categoria', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'estado', 'El estado es obligatorio').not().isEmpty(),
    check( 'estado', 'El estado es boolean').isBoolean(),
    check( 'id_categoria' ).custom( existeCategoriaPorId ),
    validarCampos
], categoriasPut );

// Delete categoria
router.delete( '/:id_categoria', [
    // validarJWT,
    check( 'id_categoria' ).custom( existeCategoriaPorId ),
    validarCampos
], categoriasDelete );


module.exports = router;