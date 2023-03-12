//optmizando importaciones 

const  validarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  validarRoles = require('../middlewares/validar-roles');
const validarArchivoSubir  = require('../middlewares/validar-archivo');
const validarMuchaSolicitudes  = require('../middlewares/muchas-solicitudes');



module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarMuchaSolicitudes,
    ...validarArchivoSubir,
};