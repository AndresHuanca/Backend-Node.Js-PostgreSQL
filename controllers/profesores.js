const { response } = require('express');

const { Facultades, Alumnos } = require('../models');
const Profesores = require('../models/profesores');

// obtener todos los alumnos
const profesoresGet = async( req, res= response ) => {

    try {
        // Busco los alumnos en DB
        const alumnos= await Alumnos.findAll({
            include:[{
                model: Facultades,
                as: 'students_x_faculties',
                attributes:['id_facultad']
            }],
            attributes: ['id_alumno', 'nombre', 'apellido', 'email', 'telefono'],
        });
        //all users 
        const total =  alumnos.length;
        
        res.json({
            total,
            alumnos,
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
const alumnosPut = async( req, res ) => {

    try {

        const { id_alumno } = req.params;
    
        // desestructurar
        const { id_facultad, ...updates } = req.body;
    
        // Validación de update para no modificar id_alumno
        if(updates.id_alumno){
            throw new Error( `No se puede modificar el id` );
        }
    
        //establecer usuario que hizo ultima modificacion
        //creator user of studentNew - Muestra el usuario que actualizo el alumno
        const updateUser = req.usuario.dataValues.codusuario;
    
        // Para encontrar el alumno
        const existeIdAlumno = await Alumnos.findByPk(id_alumno);
    
        // Localizo usuario por Id
        await Alumnos.update( updates, { where: { id_alumno } });
    
        res.status( 500 ).json({
            existeIdAlumno,
            updateUser
        });
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }


};

// Eliminar un Alumno
const alumnosDelete  = async( req, res ) => {

    const { id_alumno } = req.params;

    // borrar fisicamente
    await Alumnos.destroy({where: { id_alumno }}, { truncate: true });

    //establecer usuario que hizo ultima modificacion
    //deleteUser - Muestra el usuario que elimino el alumno
    const deleteUser = req.usuario.dataValues.codusuario;

    res.json({
        msg: `El Alumno de id ${id_alumno} eliminado`,
        deleteUser
    });

};


module.exports = {
    profesoresPost,
    profesoresGet,
    alumnosPut,
    alumnosDelete
};