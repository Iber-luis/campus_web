let menu = {};

function agregarpedido(id,nombre,precio){
    if (menu[id]) {
        menu[id].cantidad += 1;
        menu[id].total += precio;
    } else {
        menu[id] = {
            nombre: nombre,
            cantidad: 1,
            total: precio
        };
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    console.log("Carrito:");
    for (let id in menu) {
        console.log(
            `Producto: ${menu[id].nombre}, Cantidad: ${menu[id].cantidad}, Total: $${menu[id].total.toFixed(2)}`
        );
    }
}