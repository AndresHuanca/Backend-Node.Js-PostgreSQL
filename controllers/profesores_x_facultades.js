const { response } = require('express');
const { proFacExiste } = require('../helpers');

const { Facultades, Tipos_de_Facultades } = require('../models');
const Profesores = require('../models/profesores');
const Profesores_x_Facultades = require('../models/profesores_x_facultades');

//POST
const pro_x_facPost = async( req, res = response ) => {
    try {
        
        // en el body debe venir: id
        const { id_facultad, id_profesor } = req.params;

        // Establesco id_profesor en "a" sacando de DB
        const existeProfesor = await Profesores.findOne({where: {id_profesor}})
        const a = existeProfesor.dataValues.id_profesor;
        
        // Establesco id_facultad en "b" sacando de DB
        const existeFacultad = await Facultades.findByPk(id_facultad)
        const b = existeFacultad.dataValues.id_facultad;

        //Crear nueva facultad 
        const pro_x_facNew = {
            id_profesor: a,
            id_facultad: b
        };
    
        // creator user of studentNew - Muestra el usuario que creo el alumno
        const postUser = req.usuario.dataValues.codusuario;

        // Crear profesores_x_facultades
        const pro_x_fac = new Profesores_x_Facultades( pro_x_facNew );

        // Validación de existencia unica de Profesores x Facultad
        proFacExiste(pro_x_fac);

        // Guardar en DB
        await pro_x_fac.save();

        // proFacFull: en res.status: Es un ejemplo de concatenación de valores del modelo

        // msg
        res.status(201).json({
            pro_x_fac,
            postUser,

        });

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({ message: error.message });
        }
    }

};

module.exports = {
    pro_x_facPost
};