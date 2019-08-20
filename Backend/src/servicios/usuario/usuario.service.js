import { Usuario } from "./usuario.schema";

const controller = null;

controller.list = (req, res) => {
    console.log("estamos aqui");
    req.getConnection( (err, conn) => {
        console.log("estamos aca")
        conn.query('SELECT * FROM usuario', (err, usuario) => {
            if (err) {
                console.log("error A");
                res.json(err);
            }
            console.log("usuario!!! ",usuario)
            res.render('usuario', {
                data: usuario
            });
        });
    });
};

controller.save = (req, res) => {
    console.log("esto es req ", req)
    req.getConnection( (err, conn) => {
        console.log("Estamos haciendo save")
        conn.query('insert into sarym.usuario (name,address,phone) VALUE("algo", "calle", "4318023")')
    })
};

export function update(req, res) {
    console.log("hola");
    let usuario = req.usuario;
    if (!usuario) {
        usuario = new usuario();
        usuario.user = req.usuario.idUsuario;
    }
  
    // if (req.body.name) {
    //   pet.name = req.body.name;
    // }
    // if (req.body.description) {
    //   pet.description = req.body.description;
    // }
    // if (req.body.image) {
    //   pet.image = req.body.image;
    // }
    // if (req.body.birthDate) {
    //   pet.birthDate = req.body.birthDate;
    // }
  
    usuario.save(function (err) {
      if (err) return console.log("eeror al traer usuario", err);
    });
  }

module.exports = controller;
