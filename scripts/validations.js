let form = document.querySelector('#registro-form');
let nombreCompleto = document.querySelector('#nombre-completo');
let fechaNacimiento = document.querySelector('#fecha-nacimiento');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let confirmPass = document.querySelector('#confirm-password');
let genero = document.querySelector('#genero');
let paisResidencia = document.querySelector('#pais-residencia');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validación de campos obligatorios
    if (!nombreCompleto.value || !fechaNacimiento.value || !email.value || !password.value || !confirmPass.value) {
        alert('Todos los campos marcados con * son obligatorios.');
        return;
    }

    // Validación de edad
    let fechaNacimientoDate = new Date(fechaNacimiento.value);
    let hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    let mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
        edad--;
    }
    if (edad < 18) {
        alert('Debes tener al menos 18 años para registrarte.');
        return;
    }

    // Validación de correo electrónico
    let emailRegex = /^\S+@\S+\.\S+$/;
    if (!email.value.match(emailRegex)) {
        alert('El correo electrónico no es válido.');
        return;
    }

    // Validación de contraseñas coincidentes
    if (password.value !== confirmPass.value) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Guardar datos del usuario en localStorage
    let usuario = {
        nombreCompleto: nombreCompleto.value,
        fechaNacimiento: fechaNacimiento.value,
        email: email.value,
        genero: genero.value,
        paisResidencia: paisResidencia.value,
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Mostrar mensaje de confirmación
    alert('Registro exitoso!');
});
