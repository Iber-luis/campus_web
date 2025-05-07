$(document).ready(function() {
    $('#login-form').on('submit', async function(e) {
        e.preventDefault();

        const userEmail = $('input[name="userEmail"]').val();
        const userPassword = $('input[name="userPassword"]').val();

        if (!userEmail || !userPassword) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail, userPassword })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Bienvenido, ${data.nombre_usuario}. Rol: ${data.rol}`);
                localStorage.setItem("usuario", JSON.stringify(data));

                // Redirigir según el rol
                if (data.rol === 'admin') {
                    window.location.href = 'admin.html';
                } else if (data.rol === 'trabajador') {
                    window.location.href = 'caja.html';
                } else if (data.rol === 'cocina') {
                    window.location.href = 'cocina.html';
                }
            } else {
                alert(data.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor');
        }
    });
});

