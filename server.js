const express = require('express');
const app = express();
const http = require('http').Server(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use((err, req, res, next) =>{
    console.error(err.message)
    res.status(500).send('Algo se rompió!!')
});

const productosRouter = require('./routes/productosRouter')
app.use('/api', productosRouter)
const mensajesRouter = require('./routes/mensajesRouter')
app.use('/api', mensajesRouter)

const PORT = process.env.PORT || 8081

const server = http.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`)
});

server.on('error', error => {
    console.error('Error de servidor: ', error)
});

module.exports = server