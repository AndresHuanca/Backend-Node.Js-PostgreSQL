const { response } = require('express');
// para validar la contraseña 
const bcryptjs = require('bcryptjs'); 

//para validar se utiliza imortar el modelo del usuario
const {Usuarios} = require('../models');
// import de helpers
const { generarJWT, googleVerify } = require('../helpers');

// Controller Login
const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe 
        const usuario = await Usuarios.findOne({ where: {email} });
        if( !usuario ) {
            return res.status(400).json({ 
                msg: 'Email no invalido'
            });
        }

        //verificar si el usuario esta activo
        if( !usuario.estado ) {
            return res.status(400).json({ 
                msg: 'Cuenta en estado false: "Hable con el administrador"'
            });
        }
        
        // Verificar si contraseña es correcta
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'El password no es corecto'
            });
        }
        
        // Generar JWT
        const token = await generarJWT( usuario.codusuario );

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            msg: 'Hable con el administrador'
        });
    }


};

// Controller Login Google Sign-in
const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        // const googleUser = await googleVerify( id_token );
        const { correo, nombre, img } = await googleVerify( id_token );
 
        // console.log(googleUser);

        let usuario = await Usuario.findOne({ correo });
        
        // correo no existe validacion
        if ( !usuario ) {
            // Tengo que crearlo
            const data = { 
                nombre,
                correo,
                rol: 'USER_ROLE', //Asigna un rol por default 
                password: ':p',
                img,
                google: true
            };
     
            usuario = new Usuario( data );
            await usuario.save();

        }

        // Si el usuario su estado en DB en estado de false
        if( !usuario.estado ) {
            return res.status( 401 ).json({
                msg: 'hable con el administrador, usuario en estado false'
            });
        }
        

        // Generar JWT 
        let token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
        
    }


};

module.exports = {
    login,
    googleSignIn
};