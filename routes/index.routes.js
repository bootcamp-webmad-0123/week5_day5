const express = require('express')
const transporter = require('../config/transporter.config')
const router = express.Router()

router.get("/", (req, res, next) => {
  res.render("index")
})


router.get("/contacto", (req, res, next) => {
  res.render("contact")
})

router.post("/contacto", (req, res, next) => {

  const { name, message, subject, email } = req.body

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: 'Estamos en clase aprendiendo a enviar correos hoy, este es el mensaje: ' + message,
    html: '<p>Estamos en clase aprendiendo <b>a enviar correos</b> y este es el mensaje: ' + message + '</p>'
  })
    .then(info => res.send(info))
    .catch(error => console.log(error))
})


module.exports = router