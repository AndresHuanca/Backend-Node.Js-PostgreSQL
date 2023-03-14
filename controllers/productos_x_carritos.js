const { response } = require('express');
const { existeProductoPorId, existeCategoriaPorId, existeCarritoPorId } = require('../helpers');

const { Profesores, Profesores_x_Facultades, Facultades, Productos, Carritos, Productos_x_Carrito, Productos_x_Carritos } = require('../models');


//POST
const pro_x_carPost = async( req, res = response ) => {

        // en el body debe venir: id
        const { id_producto, id_carrito, cantidad } = req.body;
        let subtotal = 0;

        // Establezco id_producto en "a" sacando de DB
        const existeProducto = await Productos.findOne({where: {id_producto}})
        const a = existeProducto.dataValues.id_producto;
        
        // Establezco id_carrito en "b" sacando de DB
        const existeCarrito = await Carritos.findByPk(id_carrito)
        const b = existeCarrito.dataValues.id_carrito;
        
        // subTotal generado según los productos y el precio
        let precio = existeProducto.dataValues.precio;
        subtotal = precio * cantidad;
        // subTotal generado según los productos y el precio


        //Crear nueva facultad 
        const pro_x_carNew = {
            cantidad,
            subtotal,
            id_producto: a,
            id_carrito: b
        };

        // -------Añadir 1 cantidad más  Productos x Carrito-----------------INICIO
        // Busco la columna por id_producto y el id_carrito
        existeProCarFull = await Productos_x_Carritos.findOne( { where: {id_producto, id_carrito} })

        // Si existen los dos datos envía error 
        if(existeProCarFull){
            return res.status(429).json({ 
                msg:`El Producto x carrito  ${ id_producto } - ${ id_carrito } ya esta registrado`
            })
        }
        // -------Validación de existencia unica de Productos x Carrito-----------------FIN
        
        // Crear productos_x_carrito
        const pro_x_car = new Productos_x_Carritos( pro_x_carNew );

        // Guardar en DB
        await pro_x_car.save();

        // msg
        res.status(201).json({
            pro_x_car
        });


};

// GET
// const pro_x_facGet = async ( req, res ) => {

//     try {
//         //show all profesores_x_facultad
//         const pro_x_fac= await Profesores_x_Facultades.findAll({
//             attributes: ['id_profesor_x_facultad', 'id_profesor', 'id_facultad'],
//         });
//         //all users 
//         const total =  pro_x_fac.length;
    
//         res.json({
//             total,
//             pro_x_fac,
//         }); 
        
//     } catch (error) {
        
//         if(error instanceof Error){
//             return res.status(500).json({ message: error.message });
//         }
//     }
// };

// PATCH
const pro_x_carPatch = async( req, res ) => {

    const { id_producto_x_carrito } = req.params;
    const { cantidad } = req.body;

    // Para encontrar el producto_x_carrito
    existeProducto = await Productos_x_Carritos.findOne({id_producto_x_carrito});
    
    //encontrando el producto 
    const producto = existeProducto.dataValues.id_producto;
    precioProducto = await Productos.findOne({producto});
    // Get precio
    const precio = precioProducto.dataValues.precio;
    // Set new subtotal
    let subtotal = cantidad * precio;

    // Objetc patch
    const updateProduct ={
        cantidad,
        subtotal,
    } 

    // Localizo usuario por Id
    await Productos_x_Carritos.update( updateProduct , { where: { id_producto_x_carrito } });

    res.status(200).json({
        updateProduct,
    });

}

// DELETE
const pro_x_carDelete  = async( req, res ) => {

    const { id_producto_x_carrito } = req.params;

    // borrar fisicamente
    await Productos_x_Carritos.destroy({where: { id_producto_x_carrito }}, { truncate: true });

    res.json({
        msg: `El Producto_x_Carrito de id ${ id_producto_x_carrito } eliminado`,
    });

};

module.exports = {
    pro_x_carPost,
    // pro_x_facGet,
    pro_x_carPatch,
    pro_x_carDelete
};