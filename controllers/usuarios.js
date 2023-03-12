const { response, request } = require('express');

//importando modelo usuario
const Usuarios = require('../models/usuarios');
const Roles = require('../models/roles');

//importando para la encriptacion
const bcryptjs = require('bcryptjs');
const { Carritos } = require('../models');

//get 01
const usuariosGet = async(req, res = response ) => {
    try {
        // tarea hacer una validacion si envian una letra
        //show all users
        // Se borra del attributes valores que no deseo mostrar
        const usuarios= await Usuarios.findAll({
            include:[{
                model: Roles,
                as: 'rols',
                attributes:['rol']
            }],
            attributes: ['id_usuario','nombre', 'apellido', 'password', 'correo', 'img', 'id_rol'],
        });
        //all users 
        const total =  usuarios.length;
    
        res.json({
            total,
            usuarios,
        }); 
        
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }


};

// post- creacion 
const usuariosPost = async(req, res = response) => {
    
        let total = 0;    
        // una forma de enviar todo {google, ...resto
        const { id_usuario, ...resto} = req.body;

        const rol = resto.rol;
        
        // Establesco rol en "b" sacando de DB
        const existeRol = await Roles.findOne({where: {rol}})
        const id_rol = existeRol.dataValues.id_rol;
        
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( resto.password, salt );
        
        // Variables envio por defecto estado: true
        const userNew = {
            nombre: resto.nombre,
            apellido: resto.apellido,
            correo: resto.correo,
            password: resto.password,
            img: resto.img,
            id_rol
        };
        
        //creando instancia de usuario
        const usuario = new Usuarios( userNew );
    
        //guardar en DB
        await usuario.save();

        //Post Carrito
        const carNew = {
            total,
            id_usuario : usuario.dataValues.id_usuario,
        }

        //creando instancia de carrito
        const carrito = new Carritos( carNew );

        //guardar en DB
        await carrito.save();

        //Post Carrito End

        //show user create
        res.json({
            usuario,
            carrito
        });  

}

//put - Actualizar
const usuariosPut = async(req = request, res = response) => {  

        //desustructurar (estado no se puede cambiar)
        const { id_usuario } = req.params;

        const { ...updates } = req.body;

        // Validación de update para no modificar id_usuario
        if(updates.id_usuario){
            throw new Error( `No se puede modificar el id` );
        }

        // Manejo de Roles mediante DB
        // Validación de update para no modificar el rol ADMIN ROL
        // if(updates.rol === 'ADMIN-ROL'){
        //     throw new Error( `No se puede modificar el rol` );
        // }
        
        const rol = updates.rol;
        // Para encontrar el rol y id
         // Establesco rol en "id_rol" sacando de DB
        const existeRol = await Roles.findOne({where: {rol}})
        const id_rol = existeRol.dataValues.id_rol;

        // asignando id_rol
        updates.id_rol = id_rol;

        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        updates.password = bcryptjs.hashSync( updates.password, salt );
        
        // Localizo usuario por Id
        await Usuarios.update( updates, { where: { id_usuario } });

        res.status(500).json({
            updates,   
        });

};

//delete
const usuariosDelete = async(req, res) => {
  
    const { id_usuario } = req.params;
    
    // Elimina todos los registros de la tabla "carritos" que están relacionados con el usuario con id 1
    Carritos.destroy({ where: { id_usuario } })
        .then(() => {
            // Ahora puedes eliminar el usuario con id 1
            return Usuarios.destroy({ where: { id_usuario } })
    })
    .then(() => {
        console.log('El usuario y sus carritos relacionados han sido eliminados')
    })
    .catch((error) => {
        console.error('Error al eliminar el usuario y sus carritos relacionados', error)
    });

    res.json({
        msg: `El usuario de id ${id_usuario} eliminado`,
    });

};

//patch - Actualizar -parcialmente
const usuariosPatch = async(req = request, res = response) => {
    
    const { id_usuario } = req.params;

    const { nombre, apellido, correo } = req.body;
    
    await Usuarios.findOne( { where: {id_usuario} });

    // Localizo usuario por Id
    await Usuarios.update( {nombre, apellido, correo}, { where: { id_usuario } });

    res.status(500).json({
        nombre,
        apellido,
        correo   
    });

};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};