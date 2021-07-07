const fs = require('fs')

class Mensajes {
    constructor() {
        this.mensajes = []
    }

    guardarMensajes(mensaje) {
        this.mensajes.push(mensaje)
        fs.writeFileSync('./assets/mensajes.txt', JSON.stringify(this.mensajes, null, '\t'))
        // fs.writeFile('./assets/mensajes.txt', JSON.stringify(this.mensajes), (error, contenido) => {
        //     if(error) {
        //         console.log('error: ', error)
        //     } else {
        //         console.log('contenido: ', contenido)
        //     }
        // })
    }

    leerMensajes() {
        let contenidoArchivo =  fs.readFileSync('./assets/mensajes.txt', 'utf-8')
            if(contenidoArchivo.length > 0){
                this.mensajes = JSON.parse(contenidoArchivo);
            }
        return this.mensajes; 
    }
}

module.exports = new Mensajes()