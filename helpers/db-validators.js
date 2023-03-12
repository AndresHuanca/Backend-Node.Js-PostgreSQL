
//importando modelo usuario //importando modelo categoria
const { Usuarios, Roles, Notas, Compras, Productos, Categorias, Carritos, Productos_x_Carrito, Productos_x_Carritos } = require('../models');
const Profesores = require('../models/profesores');

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
const emailExiste = async ( correo = '' ) => {  

    //verificar si el correo 
    existeEmail = await Usuarios.findOne( { where: {correo} });
    

    if( existeEmail ) {
        throw new Error( `El correo ${ correo } ya esta registrado` );
    }       
    
};

// Valida la existencia del usuario por id
const existeUsuarioPorId= async ( id_usuario = '' ) => {  
    //verificar si el correo existe
    existeUsuario = await Usuarios.findByPk( id_usuario );
    if( !existeUsuario ) {
        throw new Error( `El usuario de id ${ id_usuario } no existe` );
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
// const nombreCategoriaExiste = async ( nombre = '' ) => {
//     // Convirtiendo a toUpperCase porque asi esta en la DB
//     nombre = nombre.toUpperCase();  
//     //verificar si el correo existe
//     existeNombre = await Categorias.findOne( { nombre } );
//     if( existeNombre ) {
//         throw new Error( `El nombre ${ nombre } ya existe` );
//     }
    
// };

//-----------------------FACULTADES----------------------------------- 
// Validación de Nombre unico de Facultades
// const esCompraValido = async ( facultad = '' ) => {  
//     // Convirtiendo a toUpperCase porque asi esta en la DB
//     facultad = facultad.toUpperCase();
//     //verificar si el correo existe
//     const existeFacultad = await Tipos_de_Facultades.findOne( { where: {facultad} } );
//     if( !existeFacultad ) {
//         throw new Error( `La Facultad ${ facultad } no existe en la DB` );
//     }
// };

// Validación de existencia de Facultad por Id
const existeCompraPorId = async ( id_compra = '' ) => { 
    // verifficar si el id existe
    existeCompra = await Compras.findOne({ where: {id_compra} });
    if( !existeCompra ) {
        throw new Error( `El id ${ id_compra } no existe en DB`)
        
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
const esCategoriaValido = async(nombre='') => {
    nombre = nombre.toUpperCase();
    
    existeCategoria = await Categorias.findOne( { where: {nombre} } );
    if ( !existeCategoria ) {
        throw new Error( `La categoria ${ nombre } enviado no se encuantra en la DB` );
    }
};

// const productoExiste = async(nombre='') => {
        
//     productoDB = await Productos.findOne({ where:{nombre} });

//     if ( productoDB ) {
//         throw new Error( `El id ${ nombre } no existe en DB`)        
//     }

// }

// -----------------------------PRODUCTOS----------------------------
// Verifica si existe 
const existeProductoPorId = async ( id_producto = '' ) => { 
    // verifficar si el id existe
    existeProducto = await Productos.findByPk(id_producto);
    if( !existeProducto ) {
        throw new Error( `El id ${ id_producto } producto no existe en DB`)
        
    }
};

// -----------------------------CARRITO----------------------------
// Verifica si existe 
const existeCarritoPorId = async ( id_carrito = '' ) => { 
    // verifficar si el id existe
    existeCarrito = await Carritos.findByPk(id_carrito);
    if( !existeCarrito ) {
        throw new Error( `El id ${ id_carrito } carrito no existe en DB`)
        
    }
};
//----------------------------------------------------------------------------

// Validación de existencia de Profesor_x_Facultad por Id
const existeProducto_x_CarritoPorId = async ( id_producto_x_carrito = '' ) => { 
    // verifficar si el id existe
    existeProducCarrito = await Productos_x_Carritos.findByPk(id_producto_x_carrito);
    if( !existeProducCarrito ) {
        throw new Error( `El id ${ id_producto_x_carrito } no existe en DB`)
        
    }
};

// -----------------------------CURSOS----------------------------

// Validación de existencia de categorias
const existeCategoriaPorId = async ( id_categoria = '' ) => { 
    // verifficar si el id existe
    existeCategoria = await Categorias.findByPk(id_categoria);
    if( !existeCategoria ) {
        throw new Error( `La categoria de  ${ id_categoria } no existe en DB`)
        
    }
};

// -----------------------------NOTAS------------------------------------

// Validación de existencia de Profesor_x_Facultad por Id
const existeNotaPorId = async ( id_nota = '' ) => { 
    // verifficar si el id existe
    existeNotas = await Notas.findByPk(id_nota);
    if( !existeNotas ) {
        throw new Error( `El id ${ id_nota } no existe en DB`)
        
    }
};
// -----------------------------------------------------------------------

//------------------------------Validaciones de Carga de Archivos---------------------------------------------
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
    existeCompraPorId,
    esCategoriaValido,
    existeProductoPorId,
    existeCarritoPorId,
    existeCategoriaPorId,
    existeProducto_x_CarritoPorId,
    coleccionesPermitidas,
    idExiste,
    emailNoExiste
};