'use strict'

var metodos = () => {};
    
metodos.traer = (valor, res) => {
    let result;
    for ( let x in valor ) {
        result+=`${x}:${uno[x]},`
        console.log(`${x}:${uno[x]},` )
    }
    console.log("resultado",result)
    res.json(result)
}


module.exports = metodos