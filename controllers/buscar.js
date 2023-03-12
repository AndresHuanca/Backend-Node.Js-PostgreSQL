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
    'productosget',
    'computacion',
    'moda',
    'cpu',
    'monitor',
    'ropa',
    'calzado',
    'hombre',
    'mujer',
    'productocategoria01',
    'productocategoria02',
    'general'
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
            include: [
              {
                model: Categorias,
                as: 'categoria_padre',
                attributes: ['nombre']
              }
            ]
          }
        ],
        where: {
          [Op.or]: [
            {
              nombre: {
                [Op.iLike]: `%${termino}%`
              }
            },
            {
              descripcion: {
                [Op.iLike]: `%${termino}%`
              }
            },
            {
              '$product_x_category.categoria_padre.nombre$': {
                [Op.iLike]: `%${termino}%`
              }
            },
            {
              '$product_x_category.nombre$': {
                [Op.iLike]: `%${termino}%`
              }
            }
          ]
        }
      });    

      res.json({
        results
    });
      


};

//  Busqueda productos por categoria cuidandome de inyecciones sql
const buscar_x_ProductoGeneral = async ( termino = '', res = response ) => {
    const results = await Productos.findAndCountAll({
        include: [
          {
            model: Categorias,
            as: 'product_x_category',
            attributes: ['nombre'],
            include: [
              {
                model: Categorias,
                as: 'categoria_padre',
                attributes: ['nombre'],
              },
            ],
          },
        ],
        where: {
          [Op.or]: [
            {
              nombre: {
                [Op.iLike]: `%${termino}%`,
              },
            },
            {
              descripcion: {
                [Op.iLike]: `%${termino}%`,
              },
            },
            {
              '$product_x_category.categoria_padre.nombre$': {
                [Op.iLike]: `%${termino}%`,
              },
            },
            {
              '$product_x_category.nombre$': {
                [Op.iLike]: `%${termino}%`,
              },
            },
          ],
        },
      });
      
      

      res.json({
        results
    });
      


};
// bucar solo en moda
const buscar_x_Producto_x_CategoriaModa = async ( termino = '', res = response ) => {

    const results = await Productos.findAndCountAll({
        include: {
          model: Categorias,
          as: 'product_x_category',
          attributes: [],
          where: {
            [Op.or]: [
              { nombre: 'HOMBRE' },
              { nombre: 'MUJER' }
            ]
          },
          include: [
            {
              model: Categorias,
              as: 'categoria_padre',
              attributes: [],
              where: { nombre: 'MODA' },
              hierarchy: true,
            },
          ],
        },
        where: {
          [Op.or]: [
            { nombre: { [Op.iLike]: `%${termino}%` } },
            { descripcion: { [Op.iLike]: `%${termino}%` } },
          ],
        },
      });
      
    
      res.json({
        results
    });
      


};

// buscar solo en computacion
const buscar_x_Producto_x_CategoriaCompu = async ( termino = '', res = response ) => {

    const results = await Productos.findAndCountAll({
        include: {
          model: Categorias,
          as: 'product_x_category',
          attributes: [],
          where: {
            [Op.or]: [
              { nombre: 'CPU' },
              { nombre: 'MONITOR' }
            ]
          },
          include: [
            {
              model: Categorias,
              as: 'categoria_padre',
              attributes: [],
              where: { nombre: 'COMPUTACION' },
              hierarchy: true,
            },
          ],
        },
        where: {
          [Op.or]: [
            { nombre: { [Op.iLike]: `%${termino}%` } },
            { descripcion: { [Op.iLike]: `%${termino}%` } },
          ],
        },
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

// Buscar por nombre de productos
const mostrarProductos = async ( termino = '', res = response ) => {

    // Buscar por nombre
    const results =  await Productos.findAndCountAll({ 
        where:{
            [Op.or]:[
                { img:{ [Op.iLike]: `%${termino}%` }},
            ]
        }
    });

    res.json({
        results
    });


}

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
        case 'productosget':
            mostrarProductos( termino, res );
            
        break;
        // Para buscar por categoria dentro de moda/hombre-mujer
        case 'moda':

            buscar_x_Categoria( termino, res );
    
        break;
        case 'computacion':

            buscar_x_Categoria( termino, res );

        break;
        case 'productocategoria01':

            buscar_x_Producto_x_CategoriaModa( termino, res );

        break;
        case 'productocategoria02':

            buscar_x_Producto_x_CategoriaCompu( termino, res );

        break;
        // para buscar de forma general por categoria o nombre de producto
        case 'general':

            buscar_x_ProductoGeneral( termino, res );

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
    buscarProductos,
    mostrarProductos,
    buscar_x_Producto_x_CategoriaCompu,
    buscar_x_Producto_x_CategoriaModa,
    buscar_x_ProductoGeneral
};