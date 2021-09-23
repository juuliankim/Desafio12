const express = require('express') 
const handlebars = require('express-handlebars')
const app = express() 
const http = require('http') 
const server = http.Server(app) 
const io = require('socket.io')(server) 

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

app.use(express.static('public')) 

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts'
})) 

app.set("view engine", "hbs") 
app.set("views", "./views") 

const productosRouter = require('./routes/productosRouter')

app.use('/api', productosRouter)

const messages = [
    { autor: 'Juan', texto: '¡Hola! ¿Que tal?' },
    { autor: 'Pedro', texto: '¡Muy bien! ¿Y vos?' },
    { autor: 'Ana', texto: '¡Genial!' }
]

io.on('connection', async socket => {
    console.log('Usuario conectado')

    socket.on('nuevo-producto', nuevoProducto => {
        console.log(nuevoProducto)
        productos.guardar(nuevoProducto)
    })

    socket.emit('guardar-productos', () => {
        socket.on('notificacion', data => {
            console.log(data)
        })
    })

    socket.emit('actualizar-tabla', productos.producto)

    socket.on("new-message", function (data) {
		messages.push(data) 
        console.log(data)
		io.sockets.emit("messages", messages) 
	})
})

const PORT = 8080 

const svr = server.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`)
})

server.on('error', error => {
    console.log('error en el servidor:', error)
})