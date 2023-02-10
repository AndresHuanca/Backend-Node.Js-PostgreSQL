const { response } = require('express');
// para validar la contraseña 
const bcryptjs = require('bcryptjs'); 

//para validar se utiliza imortar el modelo del usuario
const {Usuarios, Roles} = require('../models');
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
                msg: 'Email no se encuentra en la base de datos'
            });
        }

        //verificar si el usuario esta activo
        // if( !usuario.estado ) {
        //     return res.status(400).json({ 
        //         msg: 'Cuenta en estado false: "Hable con el administrador"'
        //     });
        // }
        
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
// Se necesita npm install google-auth-library --save

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        // const googleUser = await googleVerify(id_token);
        // console.log(googleUser);
        const { nombre, img, email, jti } = await googleVerify(id_token);

        let usuario = await Usuarios.findOne({ where: {email} } )

        if( !usuario ) {
            // Si usuario no existe crear uno nuevo
            const existeRol = await Roles.findOne( { where: {rol:'USER-ROL'} } );
            const a = existeRol.dataValues.id_rol;

            const data = {
                nombre,
                password: jti,
                email,
                google: true,
                img,
                id_rol: a,
            };
            //encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            data.password = bcryptjs.hashSync( data.password, salt );

        usuario = new Usuarios(data);
        //guardar en DB
        await usuario.save();
        }

        // Generar JWT
        const token = await generarJWT( usuario.codusuario );

        
        res.json({
            usuario,
            token
        });
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
        
    }


};

// Renueva el token para el fronten una vez iniciado sesión
const renovarToken = async( req, res = response) => {

    const { usuario } = req;
     // Generar el JWT
    const token = await generarJWT( usuario.id );

    res.json({
        usuario,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renovarToken
};