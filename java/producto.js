$(document).ready(function() {
    cargarMenu();
});

function cargarMenu() {
    $.ajax({
        url: 'https://campus-web-ohbo.onrender.com/servicios/pedir-plato',
        method: 'GET',
        contentType: 'application/json',
        success: function(menuItems) {
            let output = '';
            menuItems.forEach(item => { 
                output += `
                    <div class="caja">
                        <img src="img-productos/carta-comidas/${item.img}" alt="">
                        <h3>${item.nombre_plato}</h3>
                        <p>${item.descripcion}</p>
                        <span>$${item.precio}</span>
                        <div class="button"><button onclick="agregarpedido(a=${item.id},b='${item.nombre_plato}',c=${item.precio})">+</button></div>
                    </div>
                `;
            });
            $('.contenerdor-producto').html(output);
        },
        error: function(error) {
            console.error('Error al cargar el menú:', error);
            document.querySelector('.contenerdor-producto').innerHTML = `
                <div class="error-message">
                    <p>Error al cargar el sistema de menu. Por favor, intente de nuevo más tarde.</p>
                </div>
            `;
        }
    });
}
