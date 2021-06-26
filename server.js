const express = require('express');
const handlebars = require('express-handlebars')
const app = express();
const http = require('http').Server(app)
const productos = require('./api/productos')
const io = require('socket.io')(http)
const chat = require('./api/mensajes');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
}));

app.set('view engine', 'hbs');
app.set('views','./views');

let messages = [
    { author: "Juan", text: "Hola como estan?"},
    { author: "Pedro", text: "Muy bien! Y vos?"},
    { author: "Ana", text: "Genial!"}
]

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado')
    socket.emit('productos', productos.listar())
    socket.emit('messages', chat.leerMensajes())

    socket.on('nuevo-mensaje', message => {
        // messages.push(data)
        console.log(message)
        chat.guardarMensajes(message)
        io.sockets.emit('messages', chat.leerMensajes())
    })
    socket.on('update', data => {
        io.sockets.emit('productos', productos.listar())
    })
})

app.use((err, req, res, next) =>{
    console.error(err.message);
    res.status(500).send('Algo se rompió!!');
});

const router = require('./routes/routes');
app.use('/api', router);

const PORT = process.env.PORT || 8081;

const server = http.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.error('Error de servidor: ', error);
});

module.exports = server;