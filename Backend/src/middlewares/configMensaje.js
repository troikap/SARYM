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
        from: `” SARYM” <${EMAIL}>`,
        to: `${formulario.email}`, // Cambia esta parte por el destinatario
        subject: ASUNTO,
        html: `<div style="padding-top: 60px;">
        <div style="padding-top: 10px; width: 90%; margin: auto;">
            <div><img src="../assets/no-imagen.jpg" alt="Logo SARYM"></div>
            <div style="padding: 2rem 1rem; margin-bottom: 2rem; background-color: #e9ecef; border-radius: 0.3rem;">
                <h1 style="font-size: 3.5rem; font-weight: 300; line-height: 1.2;">
                    Módulo de Backup y Recuperación
                </h1>
                <p style="font-size: 1.25rem; font-weight: 300;">
                    Usted podrá generar un Backup de toda la Base de Datos del sistema y recuperar la información de un un archivo de Backup previamente generado.<br>Se recomienda no realizar acciones con usuarios conectados.
                </p>
                <hr style="margin-top: 1.5rem !important;">
                <p>Presione el siguiente botón para generar un archivo de Backup de todo el sistema. El mismo puede demorar unos minutos en ser generado.</p>
            </div>
        </div>
    </div>`
            // html: `
            // <strong>Nombre:</strong> ${formulario.nombreUsuario}  ${formulario.apellidoUsuario} <br/>
            // <strong>E-mail:</strong> ${formulario.email} <br/>
            // <strong>Mensaje:</strong> ${MENSAJE}<br/>
            // <a href="http://localhost:8100/recuperar-contrasenia/${token}">Recuperar Contraseña</a>
            // `
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log("ERROR ", err)
        else
            console.log("INFORMACION ", info);
    });
}