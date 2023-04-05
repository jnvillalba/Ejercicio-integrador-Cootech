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

// Crear tabla
let tablaRegistros;

function crearTablaRegistros() {
    tablaRegistros = document.createElement('table');
    tablaRegistros.classList.add('table', 'table-striped', 'table-hover');
    crearEncabezado();

    const contenedor = document.querySelector('.container-fluid');
    contenedor.appendChild(tablaRegistros);

    tablaRegistros.style.margin = 'auto';
    tablaRegistros.style.display = 'none';
    return tablaRegistros;
}

// Actualizar tabla
function actualizarTablaRegistros() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    while (tablaRegistros.firstChild) {
        tablaRegistros.removeChild(tablaRegistros.firstChild);
    }

    crearEncabezado();

    // Crear filas de registros
    const cuerpoTabla = document.createElement('tbody');
    usuarios.forEach((registro, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${index + 1}</td><td>${registro.nombreCompleto}</td><td>${registro.email}</td>`;
        cuerpoTabla.appendChild(fila);
    });

    tablaRegistros.appendChild(cuerpoTabla);
}

crearTablaRegistros();

const botonMostrarRegistros = document.querySelector('#mostrar-registros');
botonMostrarRegistros.addEventListener('click', () => {
    tablaRegistros.style.display = tablaRegistros.style.display === 'none' ? 'table' : 'none';
});

actualizarTablaRegistros();

function crearEncabezado() {
    const encabezadoTabla = document.createElement('thead');
    const filaEncabezado = document.createElement('tr');
    filaEncabezado.innerHTML = '<th>N°</th><th>Nombre completo</th><th>Correo electrónico</th>';
    encabezadoTabla.appendChild(filaEncabezado);
    tablaRegistros.appendChild(encabezadoTabla);
}
