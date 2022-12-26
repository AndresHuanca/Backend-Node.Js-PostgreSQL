const { response, request } = require('express');

//importando modelo usuario
const Usuarios = require('../models/usuario');


//importando para la encriptacion
const bcryptjs = require('bcryptjs');


//get 01
const usuariosGet = async(req, res = response ) => {
    
    // tarea hacer una validacion si envian una letra
    //show all users
    const usuarios= await Usuarios.findAll({
        attributes: ['nombre', 'password', 'email', 'estado'],
    });
    //all users 
    const total =  usuarios.length;
  
    res.json({
        total,
        usuarios,
    });

};

//put - Actualizar
const usuariosPut = async(req, res) => {
    //para dinamico
    const { id } = req.params;

    //desustructurar
    const { _id, password, google, correo, estado, ...resto } = req.body;

    if ( password ) {
         //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true} );

    res.status(500).json({
        msg: 'put API - controlador',
        usuario
    });
};

// post- creacion 
const usuariosPost = async(req, res = response ) => {

   
    // una forma de enviar todo {google, ...resto
    const { nombre, correo, password, rol } = req.body;

    //creando instancia de usuario
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // //verificar si el correo existe
    // const existeEmail =  await Usuario.findOne( { correo } );
    // if( existeEmail ) {
    //     return res.status( 400 ).json({
    //         msm: 'Este correo ya esta registrado'
    //     });
    // }

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //guardar en DB
    await usuario.save();

    res.json({
        usuario
    });

};

//patch
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });

};

//delete
const usuariosDelete = async(req, res) => {

    const { id } = req.params;

    // extraer uid
    // const uid = req.uid;

    // borrar fisicamente
    // const usuario =  await Usuario.findByIdAndDelete( id );

    const usuario =  await Usuario.findByIdAndUpdate( id, { estado:false } );

    // muestra usuario autenticado
    // const usuarioAuntenticado = req.usuario;

    res.json({
        usuario
        // usuarioAuntenticado,
        // uid
    });

};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};