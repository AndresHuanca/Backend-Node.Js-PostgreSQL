const { Router } = require('express');

const { check } = require('express-validator');

// Middlewares
const { validarJWT, 
        validarCampos } = require('../middlewares');

// import controllers
const { alumnosDelete, 
        pro_x_facPut,
        pro_x_facDelete} = require('../controllers');

const { existeFacultadPorId,
        existeAlumnoPorId, 
        existeProfesorPorId,
        existeProfesor_x_facultadPorId,
        proFacExiste} = require('../helpers');
const { pro_x_facPost, pro_x_facGet } = require('../controllers/profesores_x_facultades');


const router = Router();

// {{url}}/api/categorias

// Obtener todas los profesores_x_facultad - publico
router.get( '/', pro_x_facGet );


// Crear una categoria - privado - cualquier persona with a token validate
router.post( '/:id_profesor/:id_facultad', [ 
    validarJWT,
    check( 'id_facultad' ).custom( existeFacultadPorId ),
    check( 'id_profesor' ).custom( existeProfesorPorId ),
    validarCampos
], pro_x_facPost );

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