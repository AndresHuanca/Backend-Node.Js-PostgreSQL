const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

//importar 
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

//post - validaciones- Login
router.post('/login',[
    check('email', 'El email no es valido').isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).notEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

//post - validaciones - google
router.post('/google',[
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn );


module.exports = router;