const Productos = require('../models/productos') 

class ApiProductos{

    constructor() { }

    async guardar(productos) {
        try {
            return await Productos.guardar(productos)
        } catch (error) {
            throw error
        }
    }

    async buscar() {
        try {
            return await Productos.buscar()
        } catch (error) {
            throw error
        }
    }

    async borrar(condicion) {
        try {
            return await Productos.borrar(condicion)
        } catch (error) {
            throw error
        }
    }

    async actualizar(condicion, producto) {
        try {
            return await Productos.actualizar(condicion, producto)
        } catch (error) {
            throw error
        }
    }
}

module.exports = new ApiProductos();