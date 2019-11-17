const nodemailer = require('nodemailer');

module.exports = (formulario) => {
    console.log("FORMULARIO ", formulario)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sarymresto@gmail.com', // Cambialo por tu email
            pass: 'uszhfrzolaqtsbez' // Cambialo por tu password
            // uszhfrzolaqtsbez
            // sarym2019
        }
    });
    const mailOptions = {
        from: `”${formulario.nombre} SARYM 👻” <${formulario.email}>`,
        to: `${formulario.to}`, // Cambia esta parte por el destinatario
        subject: formulario.asunto,
        html: `
        <strong>Nombre:</strong> ${formulario.nombre} <br/>
        <strong>E-mail:</strong> ${formulario.email} <br/>
        <strong>Mensaje:</strong> ${formulario.mensaje}<br/>
        <a href="http://localhost:8100/recuperar-contrasenia/${token}">Recuperar Contraseña</a>
        `
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log("ERROR " , err)
        else
            console.log("INFORMACION ",info);
    });
}