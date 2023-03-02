const { response } = require('express');
const { proFacExiste } = require('../helpers');

const { Profesores_x_Facultades, Facultades, Alumnos, Cursos, Notas, Carrito, Compras } = require('../models');



// GET
const carritoGet = async ( req, res ) => {

    try {
        //show all notas
        const carrito = await Carrito.findAll({
            include:[{
                model: Compras,
                as: 'users_x_shopping',
                attributes:['id_usuario']
            }],
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
const carritoPut = async( req, res ) => {
   
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


module.exports = {
    carritoGet,
    carritoPut,
};