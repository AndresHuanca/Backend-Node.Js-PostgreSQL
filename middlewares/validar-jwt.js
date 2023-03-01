const { response, request } = require('express');
const jwt = require('jsonwebtoken');

//validación  para la DB
const Usuarios = require('../models/usuarios'); 



const validarJWT = async( req=request, res=response, next ) => {
    // leer de los headers
    const token = req.header('x-token');
    
    //si no envian token validacion
    if( !token ) {
        return res.status( 401 ).json({ 
            msg:'No hay token en la petición'
        });
    }

    try {
        // verifica el jwt
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer usuario que corresponde al uid 
        const usuario = await Usuarios.findByPk( uid );

        // colocar en la req
        req.usuario = usuario; 

        // para extraer uid y regrabar en la req
        // req.uid = uid;

        // Validar que el usuario exista en la DB
        if ( !usuario ) {
            return res.status( 401 ).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }

        // para que continue con lo que sigue
        next();
        
    } catch (error) {

        console.log(error);
        res.status( 401 ).json({ 
            msg:'Token no valido'
        });
        
    }   
    
};

module.exports = {
    validarJWT
};