const knex = require('../database/knexProducto')

class Productos {

    constructor() { }

    async buscar() {
        try {
            let productos = await from('productos').select('*')
            return productos
        } catch (error) {
            throw error
        }
    }

    async guardar(productos) {
        try {
            productos.fecha = new Date().toLocaleString()
            let resultado = await knex('productos').insert(productos)
            return resultado
        } catch (error) {
            throw error
        }
    }

    async borrar(condicion) {
        try {
            let resultado = await from('productos').where('id', parseInt(condicion)).del()
            return resultado
        } catch (error) {
            throw error
        }
    }
    async actualizar(condicion,producto) {
        console.log(JSON.stringify(producto))
        try {
           let resultado = await from('productos').where('id', parseInt(condicion)).update({ nombre: producto.nombre,
            foto: producto.foto,
            precio: producto.precio,
            fecha: producto.fecha })
            return resultado
        } catch (error) {
            throw error
        }
    }
}

module.exports = new Productos()