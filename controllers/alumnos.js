// const { response } = require('express');

// const { Facultades, Alumnos } = require('../models');

// // obtener todos los alumnos
// const alumnosGet = async( req, res= response ) => {

//     try {
//         // Busco los alumnos en DB
//         const alumnos= await Alumnos.findAll({
//             include:[{
//                 model: Facultades,
//                 as: 'students_x_faculties',
//                 attributes:['id_facultad']
//             }],
//             attributes: ['id_alumno', 'nombre', 'apellido', 'email', 'telefono'],
//         });
//         //all users 
//         const total =  alumnos.length;
        
//         res.json({
//             total,
//             alumnos,
//         });

//     } catch (error) {
        
//         if(error instanceof Error){
//             return res.status(500).json({ message: error.message });
//         }
    
//     }

// };

// // obtenerAlumnos x Id falta implementar
// // const obtenerCategoria = async( req, res = response ) => {

// //     const { id } = req.params;

// //     const categoria = await Categoria.findById(id).populate('usuario', 'nombre');	

// //     res.json({
// //         categoria,
// //     });

// // };

// const alumnosPost = async( req, res= response)  => {
//     try {
//         // Obtener id-facultad
//         const { id_facultad } = req.params;

//         // una forma de enviar todo {google, ...resto
//         const { id_alumno,...resto} = req.body;

//         // Para encontrar el y id_facultad enviando el id_facultad
//         // Viene toda la información de la facultad
//         const existeIdRol= await Facultades.findByPk(id_facultad);
//         // console.log(existeIdRol);
        
//         // Asignando id_facultad a variable a
//         const a = existeIdRol.dataValues.id_facultad;
        
//         // Variables envio por defecto estado: true
//         const studentNew = {
//             nombre: resto.nombre,
//             apellido: resto.apellido,
//             email: resto.email,
//             telefono: resto.telefono,
//             id_facultad : a
//         };
//         // console.log({studentNew});

//         // creator user of studentNew - Muestra el usuario que creo el alumno
//         const postUser = req.usuario.dataValues.codusuario;
        
//         //creando instancia de usuario
//         const alumno = new Alumnos( studentNew );
    
//         //guardar en DB
//         await alumno.save();

//         //show user create
//         res.json({
//             alumno,
//             postUser,
            
//         });
        
//     } catch (error) {
        
//         if(error instanceof Error){
//             return res.status(500).json({ message: error.message });
//         }

//     }

// };

// // actualizarCategoria nombre
// const alumnosPut = async( req, res ) => {

//     try {

//         const { id_alumno } = req.params;
    
//         // desestructurar
//         const { id_facultad, ...updates } = req.body;
    
//         // Validación de update para no modificar id_alumno
//         if(updates.id_alumno){
//             throw new Error( `No se puede modificar el id` );
//         }
    
//         //establecer usuario que hizo ultima modificacion
//         //creator user of studentNew - Muestra el usuario que actualizo el alumno
//         const updateUser = req.usuario.dataValues.codusuario;
    
//         // Para encontrar el alumno
//         await Alumnos.findByPk(id_alumno);
    
//         // Localizo usuario por Id
//         await Alumnos.update( updates, { where: { id_alumno } });
    
//         res.status( 500 ).json({
//             updates,
//             updateUser
//         });
//     } catch (error) {
        
//         if(error instanceof Error){
//             return res.status(500).json({ message: error.message });
//         }
//     }


// };

// // Eliminar un Alumno
// const alumnosDelete  = async( req, res ) => {

//     const { id_alumno } = req.params;

//     // borrar fisicamente
//     await Alumnos.destroy({where: { id_alumno }}, { truncate: true });

//     //establecer usuario que hizo ultima modificacion
//     //deleteUser - Muestra el usuario que elimino el alumno
//     const deleteUser = req.usuario.dataValues.codusuario;

//     res.json({
//         msg: `El Alumno de id ${id_alumno} eliminado`,
//         deleteUser
//     });

// };


// module.exports = {
//     alumnosPost,
//     alumnosGet,
//     // obtenerCategoria,
//     alumnosPut,
//     alumnosDelete
// };