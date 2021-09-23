const express = require('express')
const router = express.Router()
const productos = require('./api/productos')

router.get('/productos/listar', async (req, res) => {
    productos.listar() 
    if (productos.producto.length > 0) {
        res.render('vista', { hayProductos: true, productos: productos.listar() })
    } else if (productos.producto.length == 0) {
        res.render('vista', { hayProductos: false })
    }
})

router.get('/productos/listar/:id', async (req, res) => {
    let mensajeLista = {} 
    if (!productos.producto[req.params.id]) {
        mensajeLista = { error: 'Producto no encontrado' } 
    } else {
        mensajeLista = productos.producto[req.params.id] 
    }
    res.json(mensajeLista)
})

router.post('/productos/guardar', async (req, res) => {
    let nuevoProducto = {} 
    nuevoProducto.title = req.body.title 
    nuevoProducto.price = req.body.price 
    nuevoProducto.thumbnail = req.body.thumbnail 
    nuevoProducto.id = productos.producto.length 
    productos.guardar(nuevoProducto)

    if (productos.producto.length > 0) {
        res.render('vista', { hayProductos: true, productos: productos.producto })
    } else if (productos.producto.length == 0) {
        res.render('vista', { hayProductos: false })
    }
})

router.put('/productos/actualizar/:id', async (req, res) => {
    let idProducto = req.params.id 
    let nuevoProducto = req.body 
    productos.actualizar(idProducto, nuevoProducto) 
    nuevoProducto.id = productos.producto.indexOf(nuevoProducto) 
    res.json(nuevoProducto) 
})

router.delete('/productos/borrar/:id', async (req, res) => {
    let idProducto = req.params.id 
    res.json(productos.borrar(idProducto)) 
})