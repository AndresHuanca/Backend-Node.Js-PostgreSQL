const { response } = require('express');

const { Categorias } = require('../models');

// obtener todos los alumnos
const categoriasGet = async( req, res= response ) => {

        const categorias = await Categorias.findAll({
            attributes: ['id_categoria', 'nombre', 'estado'],
        });
        //all users 
        const total =  categorias.length;
        
        res.json({
            total,
            categorias,
        });

};

const categoriasPost = async( req, res= response)  => {

        // una forma de enviar todo {google, ...resto
        const { id_categoria,...resto} = req.body;
        // categorias en mayusculas 
        const nombre = resto.nombre.toUpperCase();

        // Variables envio por defecto estado: true
        const categoryNew = {
            nombre,
            estado: resto.estado,
        };
        
        //creando instancia de curso
        const categoria = new Categorias( categoryNew );
    
        //guardar en DB
        await categoria.save();

        //show user create
        res.json({
            categoria,            
        });

};

// actualizarCategoria nombre
const categoriasPut = async( req, res ) => {

        const { id_categoria } = req.params;
    
        // id_desestructurar creado para hacerlo más simple la actualización de variables
        const { id_desescructurar, ...updates } = req.body;
    
        // Validación de update para no modificar id_curso
        if(updates.id_categoria){
            throw new Error( `No se puede modificar el id` );
        }
        // a mayusculas
        updates.nombre = updates.nombre.toUpperCase();
    
        // Para encontrar la categoria
        await Categorias.findByPk(id_categoria);
    
        // Localizo usuario por Id
        await Categorias.update( updates, { where: { id_categoria } });
    
        res.status( 500 ).json({
            updates,
        });

};

// Eliminar un Alumno
const categoriasDelete  = async( req, res ) => {

    const { id_categoria } = req.params;

    // borrar fisicamente
    await Categorias.destroy({where: { id_categoria }}, { truncate: true });

    res.json({
        msg: `El Curso de id ${id_categoria} eliminado`,
    });

};


module.exports = {
    categoriasPost,
    categoriasGet,
    categoriasPut,
    categoriasDelete
};