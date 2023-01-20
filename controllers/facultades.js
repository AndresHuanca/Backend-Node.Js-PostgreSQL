const { response } = require('express');

const { Facultades, Usuarios, Tipos_de_Facultades } = require('../models');

//POST- Create Product 
const facultadesPost = async( req, res = response ) => {
    try {
        
        // en el body debe venir: telefono y web
        const { telefono, web, facultad } = req.body;
    
        // Para encontrar el y id
        const [existeIdFacuUsuaTipo]= await Facultades.findAll({
            include:[{
                model: Usuarios,
                as: 'faculties_x_users',
                attributes:['codusuario']
            },{
                model: Tipos_de_Facultades,
                as: 'types',
                attributes:['id_tipo']

            }],
        });
         // para utilizar los id de Usuario-TipodeFacultad
        const codusuario = existeIdFacuUsuaTipo.dataValues.codusuario;
        const id_tipo = existeIdFacuUsuaTipo.dataValues.id_tipo;
        console.log(existeIdFacuUsuaTipo);
    
        // Crear Facultad
        const facultades = new Facultades( {codusuario, id_tipo, telefono, web, facultad  } );
    
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
const obtenerProductos = async ( req, res ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
    //es como una validacion IMP 
    const [ total, usuarios ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .skip( Number( desde ))
            .limit( Number( limite ))

    ]);

    res.json({
        total,
        usuarios
    });
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
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
};