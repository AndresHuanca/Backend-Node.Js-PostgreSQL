const { response } = require('express');

const { Facultades, Tipos_de_Facultades } = require('../models');

//POST- Create Product 
const facultadesPost = async( req, res = response ) => {
    try {
        
        // en el body debe venir: telefono y web
        const { id_facultad, codusuario, id_tipo, ...resto } = req.body;
    
        const facultad = resto.facultad;
        // Establesco id_tipo en "b" sacando de DB
        const existeFacultad = await Tipos_de_Facultades.findOne({where: {facultad}})
        const b = existeFacultad.dataValues.id_tipo;
        
        // Establesco codusuario en "a" sacando del JWT 
        const a = req.usuario.dataValues.codusuario;

        //Crear nueva facultad 
        const facultadNew = {
            telefono: resto.telefono,
            web: resto.web,
            codusuario: a,
            id_tipo: b
        };

        // Crear Facultad
        const facultades = new Facultades( facultadNew );
    
        // Guardar en DB
        await facultades.save();

        // msg
        res.status(201).json({
            facultades
        });

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }

};

// GET Display All
const facultadesGet = async ( req, res ) => {

    try {
        // tarea hacer una validacion si envian una letra
        //show all users
        // Se borra del attributes valores que no deseo mostrar
        const facultades= await Facultades.findAll({
            include:[{
                model: Tipos_de_Facultades,
                as: 'types',
                attributes:['facultad']
            }],
            attributes: ['telefono', 'web'],
        });
        //all users 
        const total =  facultades.length;
    
        res.json({
            total,
            facultades,
        }); 
        
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }
};

//PUT - Update product 
const facultadesPut = async( req, res ) =>{
    try {    
        //para dinamico
        const { id_facultad } = req.params;
        //desustructurar (estado no se puede cambiar)
        const { codusuario, id_tipo, ...updates } = req.body;
        
        // Colocar en mayusculas facultad
        updates.facultad = updates.facultad.toUpperCase();
        
        // Validación de update para no modificar id_facultad
        if(updates.id_facultad){
            throw new Error( `No se puede modificar el id` );
        }
        
        const facultad = updates.facultad;
        // Para encontrar el rol y id
        const existeIdFacultad = await Tipos_de_Facultades.findOne({   
            where:{ facultad }
            });

        // para utilizar el id_tipo
        const a = existeIdFacultad.dataValues.id_tipo;
        updates.id_tipo = a;

        // para utilizar el id_codusuario
        const b = req.usuario.dataValues.codusuario;
        updates.codusuario = b;

        // Localizo usuario por Id
        await Facultades.update( updates, { where: { id_facultad } });

        res.status(500).json({
            updates,   
        });

    } catch (error) {

        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }

};

// DELETE - Admin Role
const facultadesDelete = async ( req, res ) => {

    try {
        const { id_facultad } = req.params;
    
        // borrar fisicamente
        await Facultades.destroy({where: { id_facultad }}, { truncate: true });
    
        const usuarioAutenticado = req.usuario;

        res.json({
            msg: `La Facultad de id ${id_facultad} eliminada`,
            usuarioAutenticado
        });

    } catch (error) {

        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
        
    }

};

module.exports = {
    facultadesPost,
    facultadesGet,
    facultadesPut,
    facultadesDelete
};