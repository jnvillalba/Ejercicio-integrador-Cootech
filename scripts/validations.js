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

    // Obtener lista de usuarios existente del localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Crear objeto de usuario
    let usuario = {
        nombreCompleto: nombreCompleto.value,
        fechaNacimiento: fechaNacimiento.value,
        email: email.value,
        genero: genero.value,
        paisResidencia: paisResidencia.value,
    };

    // Agregar usuario a la lista
    usuarios.push(usuario);

    // Guardar lista de usuarios en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mostrar mensaje de confirmación
    alert('Registro exitoso!');
});
const botonMostrarRegistros = document.querySelector('#mostrar-registros');

botonMostrarRegistros.addEventListener('click', () => {
    const registros = JSON.parse(localStorage.getItem('usuarios')) || [];

    const tablaRegistros = document.createElement('table');
    tablaRegistros.classList.add('table', 'usuarios-table');
    const encabezadoTabla = document.createElement('thead');
    const filaEncabezado = document.createElement('tr');
    const encabezadoId = document.createElement('th');
    const encabezadoNombre = document.createElement('th');
    const encabezadoEmail = document.createElement('th');

    encabezadoId.textContent = 'ID';
    encabezadoNombre.textContent = 'Nombre completo';
    encabezadoEmail.textContent = 'Correo electrónico';

    filaEncabezado.appendChild(encabezadoId);
    filaEncabezado.appendChild(encabezadoNombre);
    filaEncabezado.appendChild(encabezadoEmail);
    encabezadoTabla.appendChild(filaEncabezado);
    tablaRegistros.appendChild(encabezadoTabla);

    registros.forEach((registro, index) => {
        const fila = document.createElement('tr');
        const celdaId = document.createElement('td');
        const celdaNombre = document.createElement('td');
        const celdaEmail = document.createElement('td');

        celdaId.textContent = index + 1;
        celdaNombre.textContent = registro.nombreCompleto;
        celdaEmail.textContent = registro.email;

        fila.appendChild(celdaId);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaEmail);
        tablaRegistros.appendChild(fila);
    });

    document.body.appendChild(tablaRegistros);
});
