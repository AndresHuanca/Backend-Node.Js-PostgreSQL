
//importando modelo usuario //importando modelo categoria
const { Usuarios, Roles, Tipos_de_Facultades, Facultades, Alumnos } = require('../models');

// ----------------------USUARIOS-----------------------------
// Validad existencia del id usuario
const idExiste = async ( id = '' ) => {  
    //verificar si el id existe
    existeId = await Usuarios.findByPk(  id  );
    if( existeId ) {
        throw new Error( `El id ${ id } del usuario ingresado ya existe` );
    }

};

// Valida la existencia de email registrado
const emailExiste = async ( email = '' ) => {  

    //verificar si el correo 
    existeEmail = await Usuarios.findOne( { where: {email} });

    if( existeEmail ) {
        throw new Error( `El email ${ email } ya esta registrado` );
    }       
    
};

// Valida la existencia del usuario por id
const existeUsuarioPorId= async ( codusuario = '' ) => {  
    //verificar si el correo existe
    existeUsuario = await Usuarios.findByPk( codusuario );
    if( !existeUsuario ) {
        throw new Error( `El usuario de id ${ codusuario } no existe` );
    }

};

//validar role que esta en la base de datos
const esRoleValido = async(rol='') => {
    
    const existeRol = await Roles.findOne( { where: {rol} } );
    if ( !existeRol ) {
        throw new Error( `El rol ${ rol } enviado no se encuantra en la DB` );
    }
    return rol;
};

// ----------------------CATEGORIA-----------------------------
// Validaciones de BD de CATEGORIAS

// Validación de Nombre unico de Categorias
const nombreCategoriaExiste = async ( nombre = '' ) => {
    // Convirtiendo a toUpperCase porque asi esta en la DB
    nombre = nombre.toUpperCase();  
    //verificar si el correo existe
    existeNombre = await Categoria.findOne( { nombre } );
    if( existeNombre ) {
        throw new Error( `El nombre ${ nombre } ya existe` );
    }
    
};

//-----------------------FACULTADES----------------------------------- 
// Validación de Nombre unico de Facultades
const esFacultadValido = async ( facultad = '' ) => {  
    // Convirtiendo a toUpperCase porque asi esta en la DB
    facultad = facultad.toUpperCase();
    //verificar si el correo existe
    const existeFacultad = await Tipos_de_Facultades.findOne( { where: {facultad} } );
    if( !existeFacultad ) {
        throw new Error( `La Facultad ${ facultad } no existe en la DB` );
    }
};

// Validación de existencia de Facultad por Id
const existeFacultadPorId = async ( id_facultad = '' ) => { 
    // verifficar si el id existe
    existeFacultad = await Facultades.findOne({ where: {id_facultad} });
    if( !existeFacultad ) {
        throw new Error( `El id ${ id_facultad } no existe en DB`)
        
    }
};



// Valida la existencia de email registrado
const emailNoExiste = async ( email = '' ) => {  

    //verificar si el correo 
    existeNoEmail = await Usuarios.findOne( { where: {email} });

    if( !existeNoEmail ) {
        throw new Error( `El email ${ email } del usuario no esta registrado` );
    }       
    
};

// -----------------------------ALUMNOS----------------------------

// Validación de existencia de Alumno por Id
const existeAlumnoPorId = async ( id_alumno = '' ) => { 
    // verifficar si el id existe
    existeAlumno = await Alumnos.findByPk(id_alumno);
    if( !existeAlumno ) {
        throw new Error( `El id ${ id_alumno } no existe en DB`)
        
    }
};


// Validaciones de Carga de Archivos
const coleccionesPermitidas =  (coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );

    if( !incluida ) {
        throw new Error( `La coleccion ${ coleccion } no existe, permitidas ${ colecciones }`);
    }

    return true;
};

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    nombreCategoriaExiste,
    esFacultadValido,
    existeFacultadPorId,
    existeAlumnoPorId,
    coleccionesPermitidas,
    idExiste,
    emailNoExiste
};