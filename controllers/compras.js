const { response } = require('express');

const { Compras, Usuarios, Carritos } = require('../models');

//POST- falta Post Compras
// const comprasPost = async( req, res = response ) => {
        
//         // en el body debe venir: telefono y web
//         const { id_compra, id_usuario, ...resto } = req.body;
        
//         // Establesco codusuario en "a" sacando del JWT 
//         const a = req.usuario.dataValues.id_usuario;

//         //Crear nueva facultad 
//         const compraNew = {
//             fecha: resto.fecha,
//             hora: resto.hora,
//             id_usuario: a,
//         };

//         // Crear Facultad
//         const compras = new Compras( compraNew );
    
//         // Guardar en DB
//         await compras.save();

//         // msg
//         res.status(201).json({
//             compras
//         });

// };

// GET Display All
const comprasGet = async ( req, res ) => {

        const compras = await Compras.findAll({
            include:[
                {
                    model: Usuarios,
                    as: 'users_x_shopping',
                    attributes:['id_usuario']
                },
                {
                    model: Carritos,
                    as: 'cart_x_shopping',
                    attributes:['id_carrito']
                }
            ],
            attributes: ['fecha', 'hora'],
        });
        //all users 
        const total =  compras.length;

        res.json({
            total,
            compras,
        }); 
        
};

//PUT - Falta PUT Compras
// const comprasPut = async( req, res ) =>{

//         const { id_compra } = req.params;
//         //desustructurar (estado no se puede cambiar)
//         const { id_usuario , ...updates } = req.body;
        
//         // Validación de update para no modificar id_facultad
//         if(updates.id_compra){
//             throw new Error( `No se puede modificar el id` );
//         }

//         // para utilizar el id_codusuario
//         const b = req.usuario.dataValues.id_usuario;
//         updates.id_usuario = b;

//         // Localizo usuario por Id
//         await Compras.update( updates, { where: { id_compra } });

//         res.status(500).json({
//             updates,   
//         });

// };

// DELETE - Admin Role
const comprasDelete = async ( req, res ) => {

        const { id_compra } = req.params;
    
        // borrar fisicamente
        await Compras.destroy({where: { id_compra }}, { truncate: true });
    
        res.json({
            msg: `La Compra de id ${id_compra} eliminada`,
        });

};

module.exports = {
    // comprasPost,
    comprasGet,
    // comprasPut,
    comprasDelete
};