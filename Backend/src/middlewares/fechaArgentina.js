

function getFechaArgentina() {
    let fecha = new Date();
    let horasMilisegundos = 1000 * 60 * 60 * 3;
    let suma = fecha.getTime() - horasMilisegundos;
    let fechaArgentina = new Date(suma);
    return fechaArgentina
}

module.exports = {
    getFechaArgentina
}