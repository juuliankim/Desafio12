const knex = require('../database/knexProducto')

class Productos {

    constructor() { }

    validacionTabla() {
        knex.schema.hasTable('productos').then(existis => {
            if(exists === false) {
                knex.schema.createTable('productos', table => {
                    table.increments('id'),
                    table.string('nombre'),
                    table.string('foto'),
                    table.integer('precio')
                })
                .then(console.log('Tabla de productos creada'))
                .catch((err) => {console.log(err)})
                .finally(() => {
                    knex.destroy()
                }) 
            } else {
                console.log('tabla preexistente')
            }
        })
    }    

    async buscar() {
        try {
            this.validacionTabla()
            let productos = await knex.from('productos').select('*')
            return productos
        } catch (error) {
            throw error
        }
    }

    async guardar(productos) {
        try {
            this.validacionTabla()
            productos.fecha = new Date().toLocaleString()
            let resultado = await knex('productos').insert(productos)
            return resultado
        } catch (error) {
            throw error
        }
    }

    async borrar(condicion) {
        try {
            let resultado = await knex.from('productos').where('id', parseInt(condicion)).del()
            return resultado
        } catch (error) {
            throw error
        }
    }
    async actualizar(condicion,producto) {
        console.log(JSON.stringify(producto))
        try {
            let resultado = await knex.from('productos').where('id', parseInt(condicion)).update({ nombre: producto.nombre,
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