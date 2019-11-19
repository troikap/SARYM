
function getFechaArgentina() {
    let fecha = new Date();
    console.log("FECHA  2 --------------- ", fecha)

    // let horasMilisegundos = 1000 * 60 * 60 * 3;
    // let suma = fecha.getTime() - horasMilisegundos;
    // let fechaArgentina = new Date(suma);
    return fecha
}

module.exports = {
    getFechaArgentina
}