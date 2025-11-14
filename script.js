const form = document.getElementById('formUsuario');
const campos = ['nombre', 'email', 'edad'];
const barra = document.getElementById('barraProgreso');
const contenedorDatos = document.getElementById('datosMostrados');

// ------------ VALIDAR CAMPOS ------------
function validarCampo(id, mensaje) {
  const campo = document.getElementById(id);
  const error = document.getElementById(`error-${id}`);
  if (campo.value.trim() === "") {
    error.textContent = mensaje;
    return false;
  } else {
    error.textContent = "";
    return true;
  }
}

// ------------ BARRA DE PROGRESO ------------
function actualizarBarra() {
  let completados = 0;
  campos.forEach(campo => {
    if (document.getElementById(campo).value.trim() !== "") completados++;
  });
  const porcentaje = (completados / campos.length) * 100;
  barra.style.width = `${porcentaje}%`;
}
form.addEventListener('input', actualizarBarra);

// ------------ GUARDAR DATOS ------------
document.getElementById('guardar').addEventListener('click', () => {
  let valido = true;

  campos.forEach(campo => {
    if (!validarCampo(campo, `El ${campo} es obligatorio.`)) valido = false;
  });

  if (!valido) return;

  const datos = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    edad: document.getElementById('edad').value
  };

  let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  listaUsuarios.push(datos);
  localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

  alert("✅ Datos guardados correctamente.");

  form.reset();
  barra.style.width = "0%";
  contenedorDatos.style.display = 'none';
});

// ------------ MOSTRAR / OCULTAR DATOS ------------
document.getElementById('verDatos').addEventListener('click', () => {
  const btn = document.getElementById('verDatos');
  const usuarios = JSON.parse(localStorage.getItem('usuarios'));

  if (!usuarios || usuarios.length === 0) {
    contenedorDatos.style.display = 'none';
    btn.textContent = "Mostrar datos";
    return alert('⚠️ No hay usuarios guardados.');
  }

  if (contenedorDatos.style.display === "block") {
    contenedorDatos.style.display = "none";
    btn.textContent = "Mostrar datos";
    return;
  }

  let html = "<h3>📋 Lista de Usuarios</h3>";

  usuarios.forEach((u, i) => {
    html += `
      <div class="usuario" data-index="${i}" style="margin-bottom:10px;">
        <p><strong>Usuario #${i + 1}</strong></p>
        <p><strong>Nombre:</strong> ${u.nombre}</p>
        <p><strong>Email:</strong> ${u.email}</p>
        <p><strong>Edad:</strong> ${u.edad}</p>
        <button class="btn-borrar-individual" data-index="${i}" style="background:red;color:white;border:none;padding:5px 10px;cursor:pointer;">❌ Borrar Usuario</button>
      </div>
      <hr>
    `;
  });

  contenedorDatos.innerHTML = html;
  contenedorDatos.style.display = 'block';
  btn.textContent = "Ocultar datos";

  // --- BORRAR INDIVIDUAL ---
  document.querySelectorAll(".btn-borrar-individual").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      let datos = JSON.parse(localStorage.getItem("usuarios")) || [];
      datos.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(datos));
      alert("🗑️ Usuario eliminado.");
      document.getElementById('verDatos').click(); // refresca la lista
    });
  });
});

// ------------ BORRAR TODO ------------
document.getElementById('borrar').addEventListener('click', () => {
  localStorage.removeItem('usuarios');
  barra.style.width = "0%";
  contenedorDatos.style.display = 'none';
  alert('🗑️ Todos los datos fueron borrados.');
});

// ------------ LIMPIAR FORMULARIO ------------
document.getElementById('limpiar').addEventListener('click', () => {
  let todoVacio = campos.every(campo => {
    return document.getElementById(campo).value.trim() === "";
  });

  if (todoVacio) {
    alert("⚠️ No hay nada que limpiar.");
    return;
  }

  form.reset();
  barra.style.width = "0%";
  contenedorDatos.style.display = "none";

  campos.forEach(campo => {
    document.getElementById(`error-${campo}`).textContent = "";
  });

  alert("🧹 Formulario limpiado.");
});

