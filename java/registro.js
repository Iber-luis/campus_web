
//registro de eventos//
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('form-validar');

    form.addEventListener('submit', function (e) {
        // Evitar el envío del formulario si hay campos inválidos
        if (!form.checkValidity()) {
            // Prevenir el envío
            e.preventDefault();
            e.stopPropagation();

            // Añadir la clase 'was-validated' al formulario
            form.classList.add('was-validated');
        }
    });

    // Para cada campo de formulario, revisar si es válido cuando pierde el foco
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            // Verificar si el campo es inválido y añadir clase 'is-invalid'
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
    });
});