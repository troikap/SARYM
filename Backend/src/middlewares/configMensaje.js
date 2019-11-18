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
        from: `Equipo SARYM<${EMAIL}>`,
        to: `${formulario.email}`, // Cambia esta parte por el destinatario
        subject: ASUNTO,
        html: `<div style="padding-top: 60px;">
            <div style="padding-top: 10px; width: 90%; margin: auto;">
                <div style="padding: 2rem 3rem; margin-bottom: 2rem; background-color: #e9ecef; border-radius: 0.3rem;">
                    <h2 style="font-size: 3.5rem; font-weight: 300; line-height: 1.2;">
                    Equipo SARYM
                    </h2>
                    <p style="font-size: 1.25rem; font-weight: 300;">
                        Notificación de restablecimiento de Contraseña
                    </p>
                    <hr style="margin-top: 1.5rem !important;">
                    <p><strong>Estimado ${formulario.nombreUsuario} ${formulario.apellidoUsuario}:<strong></p>
                    <p>Se ha solicitado un restablecimiento de contraseña del usuario <strong>${formulario.cuitUsuario}</strong> de la App de SARYM.</p>
                    <p>Para continuar con el proceso de recuperación, haga click en el siguiente enlace: 
                    <a href= ${formulario.origen}/recuperar-contrasenia/${token}">Recuperar Contraseña</a>.
                    <br> 
                    Si usted no solicitó un restablecimiento de contraseña, desestime el siguiente correo.</p>
                    <br>
                    <div>--</div>
                    <p>Muchas gracias,
                    <br>
                    <strong>Equipo SARYM<strong></p>
                    <br>
                    <div style="font-size:10px; font-style: italic;">
                        <p>Por favor no responda a este mensaje. Las respuestas a este mensaje seran dirigidas a un buzón de correo sin supervisión.</p>
                    </div>
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