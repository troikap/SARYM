const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('../config');

module.exports = (formulario) => {
    console.log("FORMULARIO ", formulario)
    let token = jwt.sign({
        idUsuario: formulario.idUsuario
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKENRECUPERACION }) 

    let EMAIL = 'sarymresto@gmail.com';
    let ASUNTO = 'Recuperación de Contraseña';
    let MENSAJE = "Necesitamos que Corrobores el EMAIL. Gracias Atte: SARYM";
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
        from: `” SARYM 👻” <${EMAIL}>`,
        to: `${formulario.email}`, // Cambia esta parte por el destinatario
        subject: ASUNTO,
        html: `
        <strong>Nombre:</strong> ${formulario.nombreUsuario}  ${formulario.apellidoUsuario} <br/>
        <strong>E-mail:</strong> ${formulario.email} <br/>
        <strong>Mensaje:</strong> ${MENSAJE}<br/>
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