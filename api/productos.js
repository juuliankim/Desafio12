const options = require('../options/mariaDB')
const knet = require('knew')(options)

class Productos{
    constructor(){
        this.productos = []
        this.crearTabla()
    }

    crearTabla() {
        knex.schema.createTable('productos', table => {
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
            table.integer('id')
        }).then(() => {
            console.log('Tabla creada con exito')
        }).catch(error => {
            console.log('Error:', error)
            throw error
        })
    }

    listar(){        
        knex.from('productos').select('*')
            .then(rows => {
                for (row of rows) {
                    console.log(`${row['title']} ${row['price']} ${row['thumbnail']} ${row['id']}`);
                }
                console.log(rows)
            }).catch(error => {
                console.log('Error:', error)
            })
        return this.productos
    }

    listarPorId(id){
        let producto = this.productos.find(e => e.id === id)
        if(producto==undefined){
            producto = 'Producto no encontrado'
        }
        return producto
    }

    async guardar(producto){
        try {
            await knex('productos').insert(productos)
        } catch(error) {
            console.log(error)
        }
        const largo = this.productos.length
        this.productos.push({...producto,id:largo+1})
        return this.productos[largo]
    }
       
    borrar(id){
        knex.from('productos').where('id', '=', `${id}`).del()
            .then(() => {
                console.log('producto actualizado')
            }).catch(error => {
                console.log('Error:', error)
            })
    }

    actualizar(id, producto){
        this.productos[id] = producto
        knex.from('productos').where('id', '=', `${id}`).update(producto)
            .then(() => {
                console.log('producto actualizado')
            }).catch(error => {
                console.log('Error:', error)
            })
    }
}

module.exports = new Productos();