const controller = {};

controller.list = (req, res) => {
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

controller.one = (req, res) => {
    console.log("esto es req ", req)
    req.getConnection( (err, conn) => {
        console.log("Estamos haciendo save")
        conn.query('insert into sarym.usuario (name,address,phone) VALUE("algo", "calle", "4318023")')
    })
};

module.exports = controller;