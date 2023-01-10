const { Router } = require('express');

//importando para la validacion
const { check } = require('express-validator');

//importando db-validators
const { esRoleValido, emailExiste, existeUsuarioPorId, idExiste } = require('../helpers/db-validators');


//importando middleware
const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole,
} = require('../middlewares');

const { 
        usuariosGet, 
        usuariosPut, 
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

//get
router.get('/', usuariosGet );

//get paginado "Falta Implementar"
// router.get('/', usuariosGetPag );

//post  - middleware segundo argumento , crear errores- crear
router.post('/', [
        //validaciones de los argumentos enviados en post
        check( 'nombre', 'El nombre  no es valido' ).notEmpty(), //isEmpty(¿es vacio?)(no().isEmpty 'no es correo')
        check( 'password', 'El password debe ser ma de 6 letras' ).isLength( { min: 6 } ), //tamaño mino de 6
        check( 'email', 'El email no es valido' ).isEmail(), //validacion que sea email
        check( 'email' ).custom( emailExiste ),
        validarCampos
],usuariosPost );

//put
router.put('/:codusuario',[
        validarCampos
], usuariosPut );

//delete
router.delete('/:codusuario', [
        validarCampos

], usuariosDelete );

//patch
// router.patch('/', usuariosPatch );

module.exports = router;