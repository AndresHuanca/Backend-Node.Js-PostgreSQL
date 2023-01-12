//importando Role
const Roles = require('../models/role');

//importando modelo usuario //importando modelo categoria
const { Usuarios, Categoria, Producto } = require('../models');

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
const existeCategoriaPorId = async ( id = '' ) => { 
    // verifficar si el id existe
    existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ) {
        throw new Error( `El id ${ id } no existe`)
        
    }
};

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

//-----------------------PRODUCTO----------------------------------- 
// Validación de Nombre unico de Productos
const nombreProductoExiste = async ( nombre = '' ) => {  
    // Convirtiendo a toUpperCase porque asi esta en la DB
    nombre = nombre.toUpperCase();
    //verificar si el correo existe
    const existeNombre = await Producto.findOne( { nombre } );
    if( existeNombre ) {
        throw new Error( `El nombre ${ nombre } ya existe` );
    }

};

// Validaciones de BD de CATEGORIAS
const existeProductoPorId = async ( id = '' ) => { 
    // verifficar si el id existe
    existeProducto = await Producto.findById(id);
    if( !existeProducto ) {
        throw new Error( `El id ${ id } no existe`)
        
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
    existeCategoriaPorId,
    nombreCategoriaExiste,
    nombreProductoExiste,
    existeProductoPorId,
    coleccionesPermitidas,
    idExiste
};