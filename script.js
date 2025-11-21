const form = document.getElementById('formUsuario');
const campos = ['nombre', 'email', 'edad'];
const barra = document.getElementById('barraProgreso');
const contenedorDatos = document.getElementById('datosMostrados');
const btnVer = document.getElementById('verDatos');
const btnBorrar = document.getElementById('borrar');
const btnLimpiar = document.getElementById('limpiar');
const btnGuardar = document.getElementById('guardar');

// ---------------- REFRESCAR DOM ----------------
function refrescarLista() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios.length === 0) {
    contenedorDatos.style.display = "none";
    contenedorDatos.innerHTML = "";
    btnVer.textContent = "Ver Datos";
    return;
  }

  let html = "<h3>📋 Lista de Usuarios</h3>";

  usuarios.forEach((u, i) => {
    html += `
      <div class="usuario">
        <p><strong>Usuario #${i + 1}</strong></p>
        <p><strong>Nombre:</strong> ${u.nombre}</p>
        <p><strong>Email:</strong> ${u.email}</p>
        <p><strong>Edad:</strong> ${u.edad}</p>
      </div>
      <hr>
    `;
  });

  contenedorDatos.innerHTML = html;
  contenedorDatos.style.display = "block";
  btnVer.textContent = "Ocultar Datos";
}

// ---------------- GUARDAR ----------------
btnGuardar.addEventListener("click", () => {
  let valido = true;

  campos.forEach(campo => {
    const input = document.getElementById(campo);
    const error = document.getElementById(`error-${campo}`);

    if (input.value.trim() === "") {
      error.textContent = `El ${campo} es obligatorio.`;
      valido = false;
    } else {
      error.textContent = "";
    }
  });

  if (!valido) return;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.push({
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    edad: document.getElementById("edad").value
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Usuario guardado correctamente.");

  form.reset();
  refrescarLista(); // <-- 🔥 ACTUALIZA EL DOM INMEDIATO
});

// ---------------- VER DATOS ----------------
btnVer.addEventListener("click", () => {
  if (contenedorDatos.style.display === "block") {
    contenedorDatos.style.display = "none";
    btnVer.textContent = "Ver Datos";
  } else {
    refrescarLista();
  }
});

// ---------------- BORRAR ----------------
btnBorrar.addEventListener("click", () => {
  localStorage.removeItem("usuarios");
  refrescarLista(); // <-- actualiza DOM
  alert("Toda tu lista fue eliminada correctamente.");
});

// ---------------- LIMPIAR FORMULARIO ----------------
btnLimpiar.addEventListener("click", () => {
  form.reset();
  alert("Formulario limpiado.");
});

// Cargar al inicio
refrescarLista();
