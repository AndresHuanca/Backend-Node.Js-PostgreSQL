const { response } = require('express');

const { Categoria, Facultades, Alumnos } = require('../models');

// obtener todos los alumnos
const alumnosGet = async( req, res= response ) => {

    try {
        // Busco los alumnos en DB
        const alumnos= await Alumnos.findAll({
            include:[{
                model: Facultades,
                as: 'students_x_faculties',
                attributes:['id_facultad']
            }],
            attributes: ['id_alumno', 'nombre', 'apellido', 'email', 'telefono'],
        });
        //all users 
        const total =  alumnos.length;
        
        res.json({
            total,
            alumnos,
        });

    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    
    }

};

// obtenerCategoria (objeto) populate
const obtenerCategoria = async( req, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');	

    res.json({
        categoria,
    });

};

const alumnosPost = async( req, res= response)  => {
    try {
        // Obtener id-facultad
        const { id_facultad } = req.params;

        // una forma de enviar todo {google, ...resto
        const { id_alumno,...resto} = req.body;

        // Para encontrar el y id_facultad enviando el id_facultad
        // Viene toda la información de la facultad
        const existeIdRol= await Facultades.findByPk(id_facultad);
        // console.log(existeIdRol);
        
        // Asignando id_facultad a variable a
        const a = existeIdRol.dataValues.id_facultad;
        
        // Variables envio por defecto estado: true
        const studentNew = {
            nombre: resto.nombre,
            apellido: resto.apellido,
            email: resto.email,
            telefono: resto.telefono,
            id_facultad : a
        };
        // console.log({studentNew});

        // creator user of studentNew - Muestra el usuario que creo el alumno
        const creatorUser = req.usuario;
        
        //creando instancia de usuario
        const alumno = new Alumnos( studentNew );
    
        //guardar en DB
        await alumno.save();

        //show user create
        res.json({
            alumno,
            creatorUser,
            
        });
        
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }

    }

};

// actualizarCategoria nombre
const actualizarCategoria = async( req, res ) => {

    const { id } = req.params;

    // desustructurar
    const { estado, usuario, ...resto } = req.body;
    // para colocar en mayusculas
    resto.nombre = resto.nombre.toUpperCase();
    //establecer usuario que hizo ultima modificacion
    resto.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, resto, {new: true});

    res.status( 500 ).json({
        categoria
    });

};

// borrarCategoria - estado:false<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const borrarCategoria = async( req, res ) => {

    const { id } = req.params;

    // borrar fisicamente
    // const categoria =  await Categoria.findByIdAndDelete( id );

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.json({
        msg: 'Delete Winner',
        categoria
    });

};


module.exports = {
    alumnosPost,
    alumnosGet,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
};