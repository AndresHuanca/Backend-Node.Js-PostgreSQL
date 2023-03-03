const { response } = require('express');
const { where } = require('sequelize');

const { Facultades, Alumnos, Productos, Categorias } = require('../models');

// GET
const productosGet = async( req, res= response ) => {

        const productos = await Productos.findAll({
            include:[{
                model: Categorias,
                as: 'product_x_category',
                attributes:['nombre']
            }],
            attributes: ['id_producto', 'nombre', 'descripcion', 'precio', 'img', 'disponible'],
        });
        //all users
        const total =  productos.length;
        
        res.json({
            total,
            productos,
        });

};

// obtenerAlumnos x Id falta implementar
// const obtenerCategoria = async( req, res = response ) => {

//     const { id } = req.params;

//     const categoria = await Categoria.findById(id).populate('usuario', 'nombre');	

//     res.json({
//         categoria,
//     });

// };

// POST
const productosPost = async( req, res= response)  => {
    
    const { id_producto, ...resto} = req.body;

    const nombre = resto.categoria.toUpperCase();

    // Estableciendo id_categoria
    const existeIdProducto = await Categorias.findOne({where:{nombre}});
    // console.log(existeIdRol);
        
    // Asignando id_categoria a variable a
    const a = existeIdProducto.dataValues.id_categoria;

    // Variables envio por defecto estado: true
    const productNew = {
        nombre: resto.nombre.toUpperCase(),
        descripcion: resto.descripcion,
        precio: resto.precio,
        img: resto.img,
        disponible : resto.disponible,
        id_categoria: a
    };

    // creando instancia de usuario
    const producto = new Productos( productNew );
    
    //guardar en DB
    await producto.save();

    //show user create
    res.json({
        productNew,
    
    });

};

// PUT
const productosPut = async( req, res ) => {

        const { id_producto } = req.params;
    
        // desestructurar
        const { ...updates } = req.body;
    
        // Validación de update para no modificar id_alumno
        if(updates.id_producto){
            throw new Error( `No se puede modificar el id` );
        }
    
        // Para encontrar el producto
        await Productos.findByPk(id_producto);
    
        // Localizo producto por Id
        await Productos.update( updates, { where: { id_producto } });
    
        res.status( 500 ).json({
            updates,
        });

};

// DELETE
const productosDelete  = async( req, res ) => {

    const { id_producto } = req.params;

    // borrar fisicamente
    await Productos.destroy({where: { id_producto }}, { truncate: true });

    res.json({
        msg: `El Producto de id ${id_producto} eliminado`,
    });

};


module.exports = {
    productosPost,
    productosGet,
    // obtenerCategoria,
    productosPut,
    productosDelete
};