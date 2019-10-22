function tratarError( error, legend) {
    let locals = {};
    console.log("ERROR INESPERADO : ", error)
    if ( error['name'] == 'SequelizeUniqueConstraintError') {
        locals['title'] = `${legend} ya existe. ${error.errors[0].message}`;
    } else if ( error['name'] == 'SequelizeForeignKeyConstraintError') {
        locals['title'] = `Error!. ${legend} depende de otra entidad.`;
    } else if ( error['name'] == 'SequelizeValidationError') {
        locals['title'] = `Error!. ${error.errors[0].path} no puede ser nulo.`;
    } else if ( error['name'] == 'SequelizeDatabaseError') {
        locals['title'] = `Error!. Se enviaron parámetros incorrectos. ${error.original.sqlMessage}`;
    } else {
        locals['title'] = `Ocurrio un error inesperado en ${legend}.`;
    }
    locals['tipo'] = 2;
    return locals;
}

module.exports = {
    tratarError
}