const { response } = require('express');

const { Carritos, Productos_x_Carrito, Productos_x_Carritos, Productos } = require('../models');


// GET specific car by user
const carritoOneGet = async ( req, res = response ) => {
    
    const { id_usuario } = req.params;
    
    const carrito = await Carritos.findOne({where:{id_usuario} });

    // console.log(carrito);
    
    res.json({
        carrito
    }); 
        
}

// GET specific car
const carritoGet = async ( req, res = response ) => {
    
    //Params
    const { id_usuario } = req.params;
    let total = 0; 

    // Get id_carrito x user
    car = await Carritos.findOne({ where: {id_usuario} });
    const id_carrito = car.dataValues.id_carrito; 

    // Find el detalle de los productos 
    const [showCar] = await Carritos.findAll({
        include:[{
            model: Productos_x_Carritos,
            as: 'cars',
            attributes: ['cantidad', 'subtotal', 'id_producto_x_carrito'],
            // busqueda dentro de productos
            include:[{
                model: Productos,
                as: 'productsProducts',
                attributes: ['nombre', 'precio', 'img']
            }],
            where:{id_carrito}
        }],
        attributes:['total']
    });
    
    // Iteración para mostrar todo el detalle y validacion si no hay nada, 
    // (cars en lugar de dataValues)(para los includes en array)
    if (showCar) {
        showCar.cars.forEach(car => {
            // aquí puedes trabajar con cada objeto `car`
            // parseFloat para hacerlo numeros
            total += parseFloat(car.subtotal);
            // console.log(car.cantidad, car.subtotal);
        });
    } else {
        console.log('No se encontraron resultados');
    }
    // Asignación automatica del Total
    car.dataValues.total = total;
    if( total == 0 ){
        return res.json({ 
            msg:`El Carrito esta vacío`
        })
    }else{
        showCar.dataValues.total = total;
    }
    // Asignación automatica del Total

    res.json({
        showCar    
    }); 
        
};


module.exports = {
    carritoGet,
    carritoOneGet,
};