let form = document.querySelector("#registro-form");
let nombreCompleto = document.querySelector("#nombre-completo");
let fechaNacimiento = document.querySelector("#fecha-nacimiento");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPass = document.querySelector("#confirm-password");
let genero = document.querySelector("#genero");
let paisResidencia = document.querySelector("#pais-residencia");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validación de campos obligatorios
    if (
        !nombreCompleto.value ||
        !fechaNacimiento.value ||
        !email.value ||
        !password.value ||
        !confirmPass.value ||
        !genero.value ||
        !paisResidencia.value
    ) {
        alert("Todos los campos marcados con * son obligatorios.");
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
        alert("Debes tener al menos 18 años para registrarte.");
        return;
    }

    // Validación de correo electrónico
    let emailRegex = /^\S+@\S+\.\S+$/;
    if (!email.value.match(emailRegex)) {
        alert("El correo electrónico no es válido.");
        return;
    }

    // Validación de contraseña
    if (password.value !== confirmPass.value) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuario = {
        nombreCompleto: nombreCompleto.value,
        fechaNacimiento: fechaNacimiento.value,
        email: email.value,
        genero: genero.value,
        paisResidencia: paisResidencia.value,
    };

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso!");
    actualizarTablaRegistros();
});

// Mostrar Tabla
const tablaRegistros = document.createElement('table');
tablaRegistros.classList.add('table', 'table-striped', 'table-hover');
const encabezadoTabla = document.createElement('thead');
const filaEncabezado = document.createElement('tr');

filaEncabezado.innerHTML = '<th>N°</th><th>Nombre completo</th><th>Correo electrónico</th>';
encabezadoTabla.appendChild(filaEncabezado);
tablaRegistros.appendChild(encabezadoTabla);

const contenedor = document.querySelector('.container-fluid');
contenedor.appendChild(tablaRegistros);

tablaRegistros.style.margin = 'auto';

const registros = JSON.parse(localStorage.getItem('usuarios')) || [];

if (registros.length === 0) {
    alert("Las contraseñas no coinciden.");
} else {
    registros.forEach((registro, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${index + 1}</td><td>${registro.nombreCompleto}</td><td>${registro.email}</td>`;
        tablaRegistros.appendChild(fila);
    });

    tablaRegistros.style.display = 'none';

    const botonMostrarRegistros = document.querySelector('#mostrar-registros');
    botonMostrarRegistros.addEventListener('click', () => {
        tablaRegistros.style.display = tablaRegistros.style.display === 'none' ? 'table' : 'none';
    });
}

function actualizarTablaRegistros() {
    // Obtener lista de usuarios existente del localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Limpiar contenido previo de la tabla
    while (tablaRegistros.firstChild) {
        tablaRegistros.removeChild(tablaRegistros.firstChild);
    }

    // Crear encabezado de tabla
    const encabezadoTabla = document.createElement('thead');
    const filaEncabezado = document.createElement('tr');
    filaEncabezado.innerHTML = '<th>N°</th><th>Nombre completo</th><th>Correo electrónico</th>';
    encabezadoTabla.appendChild(filaEncabezado);
    tablaRegistros.appendChild(encabezadoTabla);

    // Crear filas de registros
    const cuerpoTabla = document.createElement('tbody');
    usuarios.forEach((registro, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${index + 1}</td><td>${registro.nombreCompleto}</td><td>${registro.email}</td>`;
        cuerpoTabla.appendChild(fila);
    });

    tablaRegistros.appendChild(cuerpoTabla);
}
