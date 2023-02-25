const { response } = require("express");

// Import para la validacion de id de sequelice
const { validate: uuidValidate } = require('uuid');
// para busquedas en sequelice
const { Op, where } = require('sequelize');


// Import models
const { Usuarios, Alumnos, Profesores, Facultades, Roles, Tipos_de_Facultades } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'alumnos',
    'profesores',
    'facultades',
    'roles'
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
                { apellidos:{ [Op.iLike]: `%${termino}%` }},
                { email:{ [Op.iLike]: `%${termino}%` }}
            ]
        }
    });


    res.json({
        results,
    });


};


const buscarFacultades = async ( termino = '', res = response ) => {
    // Bucar por uui
    if( uuidValidate(termino) ) {
        // Bucar facultad
        const facultad = await Facultades.findByPk(termino,{
            include: {
                model: Tipos_de_Facultades,
                as: 'types',
                attributes:['facultad']
            }
        })

        return res.json({ 
            results: (facultad) ? [facultad] : []
        })
    }

    // Buscar por nombre
    const results =  await Facultades.findAndCountAll({     
        include:[{
            model: Tipos_de_Facultades,
            as: 'types',
            attributes:['facultad'],
            where:{
                [Op.or]:[
                { facultad:{ [Op.iLike]: `%${termino}%` }},
                ]
            }
        }]
        });

    res.json({
        results
    });


};


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
        case 'profesores':
            buscarProductos( termino, res );
            
        break;
        case 'facultades':
            buscarFacultades( termino, res );
            
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
    buscarFacultades
};