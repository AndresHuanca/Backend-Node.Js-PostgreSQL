const { response, request } = require('express');

//importando modelo usuario
const Usuarios = require('../models/usuarios');
const Roles = require('../models/roles');


//importando para la encriptacion
const bcryptjs = require('bcryptjs');

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
            attributes: ['nombre', 'password', 'email', 'google', 'img'],
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
        
        // una forma de enviar todo {google, ...resto
        const { google, ...resto} = req.body;
        // { Para encontrar id_rol con where
        // const [existeIdRol] = await Roles.findAll({   
            //     where:{ rol }
            //     });
        // { 
        // Para encontrar el y id enviando el rol
        const [existeIdRol]= await Usuarios.findAll({
            include:[{
                model: Roles,
                as: 'rols',
                attributes:['id_rol'],
                where:{rol: resto.rol}
            }]
        });

        // para utilizar el id_rol
        const id_rol = existeIdRol.dataValues.id_rol;
        // const a = existeIdRol.dataValues : me sirve para ver los valores
        // console.log(a);   
        
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( resto.password, salt );
        
        // Variables envio por defecto estado: true
        const userNew = {
            nombre: resto.nombre,
            apellidos: resto.apellidos,
            password: resto.password,
            email: resto.email,
            google: true,
            img: resto.img,
            id_rol
        };
        
        //creando instancia de usuario
        const usuario = new Usuarios( userNew );
    
        //guardar en DB
        await usuario.save();
        //show user create
        res.json({
            usuario,
            
        });

}

//put - Actualizar
const usuariosPut = async(req = request, res = response) => {
    
    // try {    
        //para dinamico
        const { codusuario } = req.params;
        //desustructurar (estado no se puede cambiar)
        const { google, ...updates } = req.body;

         //--Test para ver usuarios.estado
        // const user = await Usuarios.findOne( { where: { email: updates.email } })
        // if( !user.estado){
        //     return res.status(404).json({ 
        //         message:`Usuario / estado ${user.estado}`
        //     })
        // }
        // //----
        // Validación de update para no modificar codusuario
        if(updates.codusuario){
            throw new Error( `No se puede modificar el id` );
        }

        // Manejo de Roles mediante DB
        // Validación de update para no modificar el rol ADMIN ROL
        if(updates.rol === 'ADMIN-ROL'){
            throw new Error( `No se puede modificar el rol` );
        }
        
        const rol = updates.rol;
        // Para encontrar el rol y id
        const [existeIdRol] = await Roles.findAll({   
            where:{ rol }
            });
        // para utilizar el id_rol
        const id_rol = existeIdRol.dataValues.id_rol;
        updates.id_rol = id_rol;

        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        updates.password = bcryptjs.hashSync( updates.password, salt );
        
        // Localizo usuario por Id
        await Usuarios.update( updates, { where: { codusuario } });

        res.status(500).json({
            updates,   
        });

    // } catch (error) {

    //     if(error instanceof Error){
    //         return res.status(500).json({ message: error.message });
    //     }
    // }

};

//delete
const usuariosDelete = async(req, res) => {
    
    try {
        const { codusuario } = req.params;
    
        // borrar fisicamente
        await Usuarios.destroy({where: { codusuario }}, { truncate: true });
    
        // borrar mediante estado ="false"
        // Localizo usuario por Id y update estado = false
        // await Usuarios.update( {estado: false }, { where: { codusuario } });
        const usuarioAutenticado = req.usuario;
        
        res.json({
            msg: `El usuario de id ${codusuario} eliminado`,
            usuarioAutenticado
        });

    } catch (error) {

        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
        
    }

};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
};