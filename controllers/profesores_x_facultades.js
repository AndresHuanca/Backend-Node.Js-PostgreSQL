const { response } = require('express');
const { proFacExiste } = require('../helpers');

const { Profesores, Profesores_x_Facultades, Facultades } = require('../models');


//POST
const pro_x_facPost = async( req, res = response ) => {
        
        // en el body debe venir: id
        const { id_facultad, id_profesor } = req.params;

        // Establezco id_profesor en "a" sacando de DB
        const existeProfesor = await Profesores.findOne({where: {id_profesor}})
        const a = existeProfesor.dataValues.id_profesor;
        
        // Establezco id_facultad en "b" sacando de DB
        const existeFacultad = await Facultades.findByPk(id_facultad)
        const b = existeFacultad.dataValues.id_facultad;

        //Crear nueva facultad 
        const pro_x_facNew = {
            id_profesor: a,
            id_facultad: b
        };
    
        // creator user of studentNew - Muestra el usuario que creo el alumno
        const postUser = req.usuario.dataValues.codusuario;

        // -------Validación de existencia unica de Profesores x Facultad-----------------INICIO
        // Busco la columna por id_profersor y el id_facultad
        existeProFacFull = await Profesores_x_Facultades.findOne( { where: {id_profesor, id_facultad} })

        // Si existen los dos datos envía error 
        if(existeProFacFull){
            throw new Error( `El Profesor x facultad  ${ id_profesor } - ${ id_facultad } ya esta registrado`)
        }
        // -------Validación de existencia unica de Profesores x Facultad-----------------FIN
        
        // Crear profesores_x_facultades
        const pro_x_fac = new Profesores_x_Facultades( pro_x_facNew );

        // Guardar en DB
        await pro_x_fac.save();

        // proFacFull: en res.status: Es un ejemplo de concatenación de valores del modelo

        // msg
        res.status(201).json({
            pro_x_fac,
            postUser,

        });

};

// GET
const pro_x_facGet = async ( req, res ) => {

    try {
        //show all profesores_x_facultad
        const pro_x_fac= await Profesores_x_Facultades.findAll({
            attributes: ['id_profesor_x_facultad', 'id_profesor', 'id_facultad'],
        });
        //all users 
        const total =  pro_x_fac.length;
    
        res.json({
            total,
            pro_x_fac,
        }); 
        
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }
};

// PUT
const pro_x_facPut = async( req, res ) => {


        const { id_profesor_x_facultad } = req.params;
    
        // id_desestructurar creado para hacerlo más simple la actualización de variables
        const { id_desescructurar, ...updates } = req.body;
    
        // Validación de update para no modificar id_alumno
        if(updates.id_profesor_x_facultad){
            throw new Error( `No se puede modificar el id` );
        }
    
        //establecer usuario que hizo ultima modificacion
        //creator user of studentNew - Muestra el usuario que actualizo el alumno
        const updateUser = req.usuario.dataValues.codusuario;
    
        // Para encontrar el alumno
        const existeIdProfesor_x_Facultad = await Profesores_x_Facultades.findByPk(id_profesor_x_facultad);
        
        // -------Validación de existencia unica de Profesores x Facultad-----------------INICIO
        // Extraigo datos del body
        const id_profesor =updates.id_profesor;
        const id_facultad =updates.id_facultad;
        // Busco la columna por id_profesor y el id_facultad
        existeProFacFull = await Profesores_x_Facultades.findOne( { where: {id_profesor, id_facultad} })

        // Si existen los dos datos envía error 
        if(existeProFacFull){
            throw new Error( `El Profesor x facultad  ${ id_profesor } - ${ id_facultad } La actualización requiere datos diferentes`)
        }
        // -------Validación de existencia unica de Profesores x Facultad-----------------FIN
        
        // Localizo usuario por Id
        const updateProFac = await Profesores_x_Facultades.update( updates, { where: { id_profesor_x_facultad } });

        res.status( 500 ).json({
            updates,
            updateUser
        });

}

// DELETE
const pro_x_facDelete  = async( req, res ) => {

    const { id_profesor_x_facultad } = req.params;

    // borrar fisicamente
    await Profesores_x_Facultades.destroy({where: { id_profesor_x_facultad }}, { truncate: true });

    //establecer usuario que hizo ultima modificacion
    //deleteUser - Muestra el usuario que elimino el alumno
    const deleteUser = req.usuario.dataValues.codusuario;

    res.json({
        msg: `El Profesor_x_facultad de id ${id_profesor_x_facultad} eliminado`,
        deleteUser
    });

};

module.exports = {
    pro_x_facPost,
    pro_x_facGet,
    pro_x_facPut,
    pro_x_facDelete
};