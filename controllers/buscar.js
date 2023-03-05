const { response } = require("express");

// Import para la validacion de id de sequelice
const { validate: uuidValidate } = require('uuid');
// para busquedas en sequelice
const { Op, Sequelize } = require('sequelize');


// Import models
const { Usuarios, Roles, Productos, Categorias } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'computacion',
    'moda',
    'cpu',
    'monitor',
    'ropa',
    'calzado',
    'hombre',
    'mujer'
];

const buscarRoles = async ( termino = '', res = response ) => {
    // Bucar por uui
    if( uuidValidate(termino) ) {
        // Buscar por id
         const rol = await Roles.findByPk(termino);
         // Show roles
         return res.json({ 
             results: (rol) ? [rol] : []
         })
    }
    // Buscar por nombre
    const roles =  await Roles.findAndCountAll({ 
        where:{
            [Op.or]:[
                { rol:{ [Op.iLike]: `%${termino}%` }},
            ]
        }
    });

    res.json({
        results: roles
    });


};

const buscarUsuarios = async ( termino = '', res = response ) => {

    // Bucar por uui
    if( uuidValidate(termino) ) {
        // Bucar usuario
        const usuario = await Usuarios.findByPk(termino);
        // Show users
        return res.json({ 
            results: (usuario) ? [usuario] : []
        })
    }

    // Buscar por nombre
    const results =  await Usuarios.findAndCountAll({ 
        where:{
            [Op.or]:[
                { nombre:{ [Op.iLike]: `%${termino}%` }},
                { apellido:{ [Op.iLike]: `%${termino}%` }},
                { correo:{ [Op.iLike]: `%${termino}%` }}
            ]
        }
    });


    res.json({
        results,
    });


};


const buscar_x_Categoria = async ( termino = '', res = response ) => {
    // Bucar por uui
    if( uuidValidate(termino) ) {
        // Bucar facultad
        const moda = await Productos.findByPk(termino,{
            include: {
                model: Categorias,
                as: 'product_x_category',
                attributes:['nombre']
            }
        })

        console.log(moda)
        return res.json({ 
            results: (moda) ? [moda] : []
        })
    }

    //  Busqueda productos por categoria cuidandome de inyecciones sql
    const results = await Productos.findAndCountAll({
        include: [
          {
            model: Categorias,
            as: 'product_x_category',
            attributes: ['nombre'],
            where: {
              nombre: {
                [Op.iLike]: `%${termino}%`
              }
            }
          }
        ]
      });
      
    res.json({
        results
    });


};

// Buscar por nombre de productos
const buscarProductos = async ( termino = '', res = response ) => {
    // Bucar por uui
    if( uuidValidate(termino) ) {
        // Bucar facultad
        const moda = await Productos.findByPk(termino,{
            include: {
                model: Categorias,
                as: 'product_x_category',
                attributes:['nombre']
            }
        })

        console.log(moda)
        return res.json({ 
            results: (moda) ? [moda] : []
        })
    }

    // Buscar por nombre
    const results =  await Productos.findAndCountAll({ 
        where:{
            [Op.or]:[
                { nombre:{ [Op.iLike]: `%${termino}%` }},
            ]
        }
    });

    res.json({
        results
    });


};

// Buscar para elegir la colección
const buscar = async( req, res = response ) => {

    const { coleccion, termino } = req.params;

    // Validar si existe coleccion
    if( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status( 400 ).json({ 
            msg: `La coleccion ${ coleccion } no existe`, 
            msm: `Colecciones permitidas ${ coleccionesPermitidas } `
        });
    }
    // 
    switch ( coleccion ) {
        case 'roles':
            buscarRoles( termino, res );
        break;
        case 'usuarios':
            buscarUsuarios( termino, res );
        break;
        case 'productos':
            buscarProductos( termino, res );
            
        break;
        // Para que moda tengas más opciones de busqueda
        case 'moda':
            
            const terminosModa = ['moda', 'ropa', 'vestimenta', 'prendas'];
            
            if (terminosModa.includes(termino.toLowerCase())) {
            buscar_x_Categoria( termino, res );
            
            } else {
                res.status( 500 ).json({
                    msg: `se le olvido Hacer esta busqueda`
                });
            }
            break;

        default:
            res.status( 500 ).json({
                msg: `se le olvido Hacer esta busqueda`
            });
    }

};

module.exports = {
    buscar,
    buscarRoles,
    buscar_x_Categoria,
    buscarProductos
};