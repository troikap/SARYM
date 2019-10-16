function tratarError( error, legend) {
    let locals = {};
    if ( error['name'] == 'SequelizeUniqueConstraintError') {
        locals['title'] = `${legend} ya existe. ${error.errors[0].message}`;
    } else if ( error['name'] == 'SequelizeForeignKeyConstraintError') {
        locals['title'] = `Error!. ${legend} depende de otra entidad.`;
    } else {
        locals['title'] = `Ocurrio un error inesperado en ${legend}.`;
    }
    locals['tipo'] = 2;
    return locals;
}

module.exports = {
    tratarError
}