const { response } = require('express');
const { proFacExiste } = require('../helpers');

const { Profesores_x_Facultades, Facultades, Alumnos, Cursos, Notas } = require('../models');

//POST
const notasPost = async( req, res = response ) => {

        // Extraigo id_alumno ... de params
        const { nota } = req.body;

        // Extraigo id_alumno ... de params
        const { id_alumno, id_curso } = req.params;

        // Establezco id_alumno en "a" sacando de DB
        const existeAlumno = await Alumnos.findOne({where: {id_alumno}})
        const a = existeAlumno.dataValues.id_alumno;
        
        // Establezco id_curso en "b" sacando de DB
        const existeCurso = await Cursos.findByPk(id_curso)
        const b = existeCurso.dataValues.id_curso;

        //Crear nueva Nota 
        const noteNew = {
            nota,
            id_alumno: a,
            id_curso: b
        };
    
        // creator user of studentNew - Muestra el usuario que creo el alumno
        const postUser = req.usuario.dataValues.codusuario;

        // -------Validación de existencia unica de Profesores x Facultad-----------------INICIO
        // Busco la columna por id_profersor y el id_facultad
        existeNota = await Notas.findOne( { where: {id_alumno, id_curso} })

        // Si existen los dos datos envía error 
        if(existeNota){
            throw new Error( `La nota   ${ id_alumno } - ${ id_curso } ya esta registrado`)
        }
        // -------Validación de existencia unica de Profesores x Facultad-----------------FIN
        
        // Crear notas
        const notas = new Notas( noteNew );

        // Guardar en DB
        await notas.save();

        // msg
        res.status(201).json({
            notas,
            postUser,

        });

};

// GET
const notasGet = async ( req, res ) => {

    try {
        //show all notas
        const notas = await Notas.findAll({
            attributes: ['id_nota', 'nota', 'id_alumno', 'id_curso'],
        });
        //all notes 
        const total =  notas.length;
    
        res.json({
            total,
            notas,
        }); 
        
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }
};

// PUT
const notasPut = async( req, res ) => {
   
        // Extraigo id_alumno ... de params
        const { id_nota } = req.params;
    
        // id_desestructurar creado para hacerlo más simple la actualización de variables
        const { id_desescructurar, ...updates } = req.body;
    
        // Validación de update para no modificar id_alumno
        if(updates.id_nota){
            throw new Error( `No se puede modificar el id` );
        }
    
        //establecer usuario que hizo ultima modificacion
        //creator user of studentNew - Muestra el usuario que actualizo el alumno
        const updateUser = req.usuario.dataValues.codusuario;
    
        // Para encontrar La nota
        await Notas.findByPk(id_nota);
        
        // -------Validación de existencia unica de Notas-----------------INICIO
        // Extraigo datos del body
        const id_alumno =updates.id_alumno;
        const id_curso =updates.id_curso;
        const nota = updates.nota;

        // Busco la columna por id_alumno y el id_curso
        existeNotas = await Notas.findOne( { where: {id_alumno, id_curso, nota} })

        // Si existen los dos datos envía error 
        if( existeNotas ){
            throw new Error( `La nota ${ nota } de  ${ id_alumno } - ${ id_curso } La actualización requiere datos diferentes`)
        }
        // -------Validación de existencia unica de Notas-----------------FIN
        
        // Localizo nota por Id
        await Notas.update( updates, { where: { id_nota } });

        res.status( 500 ).json({
            updates,
            updateUser
        });

}

// DELETE
const notasDelete  = async( req, res ) => {

    const { id_nota } = req.params;

    // borrar fisicamente
    await Notas.destroy({where: { id_nota }}, { truncate: true });

    //establecer usuario que hizo ultima modificacion
    //deleteUser - Muestra el usuario que elimino el alumno
    const deleteUser = req.usuario.dataValues.codusuario;

    res.json({
        msg: `La nota de  id ${ id_nota } eliminado`,
        deleteUser
    });

};

module.exports = {
    notasPost,
    notasGet,
    notasPut,
    notasDelete
};