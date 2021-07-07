let socket = io.connect()

socket.on('productos', function (productos) {
    console.log('productos socket client')
    document.getElementById('datos').innerHTML = tabla(productos)
})

socket.on('messages', messages => {
    render(messages)
})

function render(messages) {
    let html = messages.map(e => {
        return (`
            <div>
                <b style="color:blue;">${e.email}</b>
                [<span style="color:brown;">${e.date}</span>]
                <i style="color:green;">${e.text}</i>
            </div>
        `)
    }).join(' ')
    document.getElementById("messages").innerHTML = html
}

function addMessage (e) {
    let message = {
        email: document.getElementById('email').value,
        date: new Date().toDateString(),
        text: document.getElementById('text').value
    }
    socket.emit('nuevo-mensaje', message)
    return false
}

const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = { title: form[0].value, price: form[1].value, thumbnail: form[2].value };

    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then(productos => {
        form.reset();
        socket.emit('update', 'ok');
    })
    .catch(error => {
        console.log('ERROR', error);
    });
});

function tabla(productos) {
    const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{ this.price }}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `

    console.log(productos);
    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}