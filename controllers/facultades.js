const { response } = require('express');
const { esFacultadValido } = require('../helpers');

const { Facultades, Usuarios, Tipos_de_Facultades } = require('../models');

//POST- Create Product 
const facultadesPost = async( req, res = response ) => {
    try {
        
        // en el body debe venir: telefono y web
        const { id_facultad, codusuario, id_tipo, ...resto } = req.body;
    
        //-----------------------Otra forma de hacer----------------(pero necesita antes tener creado 2 facultades con los tipos de facultades)
        // Para encontrar el y id
        // const [existeIdFacuUsuaTipo]= await Facultades.findAll({
        //     include:[{
        //         model: Usuarios,
        //         as: 'faculties_x_users',
        //         attributes:['codusuario']
        //     },{
        //         model: Tipos_de_Facultades,
        //         as: 'types',
        //         attributes:['id_tipo']

        //     }],
        // });
        // para utilizar los id de Usuario-TipodeFacultad
       // codusuario = existeIdFacuUsuaTipo.dataValues.codusuario;
       // id_tipo = existeIdFacuUsuaTipo.dataValues.id_tipo;
       // console.log(existeIdFacuUsuaTipo);
        //--------------------------fin----------------------------- 

        // Establesco codusuario en "a" sacando del JWT 
        const a = req.usuario.dataValues.codusuario;

        // Establesco id_tipo en "b" sacando de DB
        const facultad = resto.facultad;
        const existeFacultad = await Tipos_de_Facultades.findOne({where: {facultad}})
        const b = existeFacultad.dataValues.id_tipo;

        //Crear nueva facultad 
        const facultadNew = {
            telefono: resto.telefono,
            web: resto.web,
            codusuario: a,
            id_tipo: b
        };

        // Crear Facultad
        const facultades = new Facultades( facultadNew );
    
        // Guardar en DB
        await facultades.save();

        // msg
        res.status(201).json({
            facultades
        });

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }

};

// GET Display All
const facultadesGet = async ( req, res ) => {

    try {
        // tarea hacer una validacion si envian una letra
        //show all users
        // Se borra del attributes valores que no deseo mostrar
        const facultades= await Facultades.findAll({
            include:[{
                model: Tipos_de_Facultades,
                as: 'types',
                attributes:['facultad']
            }],
            attributes: ['telefono', 'web'],
        });
        //all users 
        const total =  facultades.length;
    
        res.json({
            total,
            facultades,
        }); 
        
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }
};

//GET Display by Id 
const obtenerProducto = async ( req, res ) => {

    const { id } = req.params;

    const producto = await Producto.findById( id ).populate( 'usuario', 'nombre' );

    //Validacion de DB 
    // verificar si el id existe
    const existeProductoPorId = await Producto.findById(  id  );

    if( !existeProductoPorId ) {
        return res.status( 400 ).json({
            msg: `el id ${ id } no existe`
        });
    }


    res.json({
        producto
    });

};

//PUT - Update product 
const actualizarProducto = async( req, res ) =>{

    const { id } = req.params;

    // desustructurar
    const { estado, usuario, ...resto } = req.body;
    // Set name by middlewares
    resto.nombre = resto.nombre.toUpperCase();

    // Validacion existeProductoPorId
    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) { 
        res.status( 400 ).json({
            msg: `Este Id ${ id } no existe `
        });

    }

    //Set User que hizo el ultimo Update
    resto.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, resto, { new: true }).populate('usuario', 'nombre');

    res.status( 500 ).json({
        producto
    });

};

// DELETE - Admin Role
const eliminarProducto = async ( req, res ) => {

    const { id } = req.params;

    // borrar fisicamente
    // const categoria =  await Producto.findByIdAndDelete( id );

    // Validacion existeProductoPorId
    const existeProducto = await Producto.findById( id );
    if (!existeProducto ) {
        res.status( 500 ).json({
            msg: ` El Id ${ id } no existe`
        });
    }

    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true}).populate('usuario', 'nombre');

    res.json({
        producto
    });

};

module.exports = {
    facultadesPost,
    facultadesGet,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
};