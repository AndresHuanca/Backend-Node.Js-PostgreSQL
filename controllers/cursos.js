const { response } = require('express');

const { Cursos } = require('../models');

// obtener todos los alumnos
const cursosGet = async( req, res= response ) => {

    try {
        // Busco los cursos en DB
        const cursos= await Cursos.findAll({
            attributes: ['id_curso', 'nombre', 'descripcion'],
        });
        //all users 
        const total =  cursos.length;
        
        res.json({
            total,
            cursos,
        });

    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    
    }

};

const cursosPost = async( req, res= response)  => {
    try {
    
        // una forma de enviar todo {google, ...resto
        const { id_curso,...resto} = req.body;
        
        // Variables envio por defecto estado: true
        const courseNew = {
            nombre: resto.nombre,
            descripcion: resto.descripcion,
        };

        // creator user of studentNew - Muestra el usuario que creo el alumno
        const postUser = req.usuario.dataValues.codusuario;
        
        //creando instancia de curso
        const curso = new Cursos( courseNew );
    
        //guardar en DB
        await curso.save();

        //show user create
        res.json({
            curso,
            postUser
            
        });
        
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }

    }

};

// actualizarCategoria nombre
const cursosPut = async( req, res ) => {

        const { id_curso } = req.params;
    
        // id_desestructurar creado para hacerlo más simple la actualización de variables
        const { id_desescructurar, ...updates } = req.body;
    
        // Validación de update para no modificar id_curso
        if(updates.id_curso){
            throw new Error( `No se puede modificar el id` );
        }
    
        //establecer usuario que hizo ultima modificacion
        //creator user of studentNew - Muestra el usuario que actualizo el alumno
        const updateUser = req.usuario.dataValues.codusuario;
    
        // Para encontrar el curso
        await Cursos.findByPk(id_curso);
    
        // Localizo usuario por Id
        await Cursos.update( updates, { where: { id_curso } });
    
        res.status( 500 ).json({
            updates,
            updateUser
        });

};

// Eliminar un Alumno
const cursosDelete  = async( req, res ) => {

    const { id_curso } = req.params;

    // borrar fisicamente
    await Cursos.destroy({where: { id_curso }}, { truncate: true });

    //establecer usuario que hizo ultima modificacion
    //deleteUser - Muestra el usuario que elimino el alumno
    const deleteUser = req.usuario.dataValues.codusuario;

    res.json({
        msg: `El Curso de id ${id_curso} eliminado`,
        deleteUser
    });

};


module.exports = {
    cursosPost,
    cursosGet,
    cursosPut,
    cursosDelete
};