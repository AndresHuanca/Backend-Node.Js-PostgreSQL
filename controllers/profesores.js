const { response } = require('express');

const { Facultades, Alumnos } = require('../models');
const Profesores = require('../models/profesores');

// obtener todos los alumnos
const profesoresGet = async( req, res= response ) => {

    try {
        // Busco los profesores en DB
        const profesores= await Profesores.findAll({
            attributes: ['id_profesor', 'nombre', 'apellido', 'email', 'telefono'],
        });
        //all users 
        const total =  profesores.length;
        
        res.json({
            total,
            profesores,
        });

    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    
    }

};

const profesoresPost = async( req, res= response)  => {
    try {
    
        // una forma de enviar todo {google, ...resto
        const { id_profesores,...resto} = req.body;
        
        
        // Variables envio por defecto estado: true
        const teacherNew = {
            nombre: resto.nombre,
            apellido: resto.apellido,
            email: resto.email,
            telefono: resto.telefono,
        };

        // creator user of studentNew - Muestra el usuario que creo el alumno
        const postUser = req.usuario.dataValues.codusuario;
        
        //creando instancia de usuario
        const profesor = new Profesores( teacherNew );
    
        //guardar en DB
        await profesor.save();

        //show user create
        res.json({
            profesor,
            postUser
            
        });
        
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }

    }

};

// actualizarCategoria nombre
const ProfesoresPut = async( req, res ) => {

    try {

        const { id_profesor } = req.params;
    
        // id_desestructurar creado para hacerlo más simple la actualización de variables
        const { id_desescructurar, ...updates } = req.body;
    
        // Validación de update para no modificar id_alumno
        if(updates.id_profesor){
            throw new Error( `No se puede modificar el id` );
        }
    
        //establecer usuario que hizo ultima modificacion
        //creator user of studentNew - Muestra el usuario que actualizo el alumno
        const updateUser = req.usuario.dataValues.codusuario;
    
        // Para encontrar el alumno
        const existeIdProfesor = await Profesores.findByPk(id_profesor);
    
        // Localizo usuario por Id
        await Profesores.update( updates, { where: { id_profesor } });
    
        res.status( 500 ).json({
            existeIdProfesor,
            updateUser
        });
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }


};

// Eliminar un Alumno
const profesoresDelete  = async( req, res ) => {

    const { id_profesor } = req.params;

    // borrar fisicamente
    await Profesores.destroy({where: { id_profesor }}, { truncate: true });

    //establecer usuario que hizo ultima modificacion
    //deleteUser - Muestra el usuario que elimino el alumno
    const deleteUser = req.usuario.dataValues.codusuario;

    res.json({
        msg: `El Profesor de id ${id_profesor} eliminado`,
        deleteUser
    });

};


module.exports = {
    profesoresPost,
    profesoresGet,
    ProfesoresPut,
    profesoresDelete
};