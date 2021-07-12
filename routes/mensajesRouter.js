const express = require('express')
const router = express.Router()
const controller = require('../api/mensajes')

router.post('/mensajes/guardar', async (req, res) => {
    try {
        let mensaje = await controller.guardar(req.body)
        res.send(mensaje)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/mensajes/buscar', async (req, res) => {
    try {
        let mensajes = await controller.buscar(req.query)
        console.log(mensajes)
        res.send(mensajes)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router