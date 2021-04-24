'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

this.send_email = (nombre, usuario, correo) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });

    let email_options = {
        from: 'phantomtech.costarica@gmail.com',
        to: correo,
        subject: `Hola ${nombre}`,
        html: `
        <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#05386B" bgcolor="#008080">
        <tr height="70px">
            <td width="600px">
                <h1 style="color: #fff; text-align:center">Bienvenido</h1>
                <p style="color: #fff; text-align:center">
                    <span style="color: #003333;font-weight: bold;">${nombre}</span> a la registración phantomtech.
                </p>
            </td>
        </tr>
        <tr>
            <td style="text-align:center">
                <p style="color: #ffffff">Ingrese <a href="http://127.0.0.1:5500/public/cambiarContraseña.html?user_name=${usuario}">aquí</a> para cambiar su contraseña</p>
            </td>
        </tr>
    </table>`
    };
    transporter.sendMail(email_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envío correctamente ' + info.response);
        }
    });
}

module.exports = this;