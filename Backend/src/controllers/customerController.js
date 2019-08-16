const controller = {};

controller.list = (req, res) => {
    req.getConnection( (err, conn) => {
        console.log("estamos aca")
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                console.log("error A");
                res.json(err);
            }
            console.log("customer!!! ",customers)
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    console.log("esto es req ", req)
    req.getConnection( (err, conn) => {
        console.log("Estamos haciendo save")
        conn.query('insert into crudnodejsmysql.customer (name,address,phone) VALUE("algo", "calle", "4318023")')
    })
};

module.exports = controller;
