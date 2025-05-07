$(document).ready(function() {
    $('#register-form').on('submit', async function(e) {
        e.preventDefault();

        const userName = $('input[name="userName"]').val();
        const userEmail = $('input[name="userEmail"]').val();
        const userPassword = $('input[name="userPassword"]').val();

        if (!userName || !userEmail || !userPassword) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre_usuario: userName, userEmail, userPassword })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                document.getElementById('sign-in').click(); // Cambia a login
            } else {
                alert(data.error || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor');
        }
    });
});
