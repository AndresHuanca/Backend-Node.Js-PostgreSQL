const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos, validarJWT} = require('../middlewares');

//importar 
const { login, googleSignIn, renovarToken } = require('../controllers/auth');

const router = Router();

//post - validaciones- Login
router.post('/login',[
    check('email', 'El email no es valido').isEmail(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check( 'password', 'La contraseña es obligatoria' ).notEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

//post - validaciones - google
router.post('/google',[
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn );

// Validar el ingreso al Login con JWT
router.get('/', validarJWT, renovarToken );


module.exports = router;