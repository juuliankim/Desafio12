const fs = require('fs')

class Mensajes {
    constructor() {
        this.mensajes = []
    }

    guardarMensajes(mensaje) {
        this.mensajes.push(mensaje)
        fs.writeFile('./assets/mensajes.txt', JSON.stringify(this.mensajes, null, '\t'))
        return this.mensajes
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