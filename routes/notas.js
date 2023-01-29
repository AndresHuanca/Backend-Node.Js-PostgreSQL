const { Router } = require('express');

const { check } = require('express-validator');

// Middlewares
const { validarJWT, 
        validarCampos } = require('../middlewares');

// import controllers
const { pro_x_facPut,
        pro_x_facDelete,
        notasPost } = require('../controllers');

const { existeFacultadPorId,
        existeProfesorPorId,
        existeProfesor_x_facultadPorId, 
        existeAlumnoPorId,
        existeCursoPorId} = require('../helpers');

const router = Router();

// Obtener todas los profesores_x_facultad - publico
// router.get( '/', notasGet );


// Crear una categoria - privado - cualquier persona with a token validate
router.post( '/:id_alumno/:id_curso', [ 
    validarJWT,
    check( 'nota', 'La nota es obligatoria' ).not().isEmpty(),
    check( 'nota', 'La nota es numerica' ).isNumeric(),
    check( 'nota', 'La nota debe tener maximo 2 numeros' ).isLength({min :0, max:2}),
    check( 'id_alumno' ).custom( existeAlumnoPorId ),
    check( 'id_curso' ).custom( existeCursoPorId ),
    validarCampos
], notasPost );

// Actualizar - privado - cualquier persona with a token validate
// minimo venga el nombre
router.put( '/:id_profesor_x_facultad', [
    validarJWT,
    check( 'id_profesor_x_facultad' ).custom( existeProfesor_x_facultadPorId ),
    validarCampos
], pro_x_facPut );

// Delete an categoria - Admin
// que sea un id de mongo
router.delete( '/:id_profesor_x_facultad', [
    validarJWT,
    check( 'id_profesor_x_facultad' ).custom( existeProfesor_x_facultadPorId ),
    validarCampos
], pro_x_facDelete );


module.exports = router;