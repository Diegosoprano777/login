const form = document.getElementById('formUsuario');
const campos = ['nombre', 'email', 'edad'];
const barra = document.getElementById('barraProgreso');
const contenedorDatos = document.getElementById('datosMostrados');
const btnVer = document.getElementById('verDatos');
const btnBorrar = document.getElementById('borrar');
const btnLimpiar = document.getElementById('limpiar');
const btnGuardar = document.getElementById('guardar');

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
btnGuardar.addEventListener('click', () => {
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

  campos.forEach(campo => {
    document.getElementById(`error-${campo}`).textContent = "";
  });
});

// ------------ MOSTRAR / OCULTAR DATOS ------------
btnVer.addEventListener('click', () => {
  const usuarios = JSON.parse(localStorage.getItem('usuarios'));

  if (!usuarios || usuarios.length === 0) {
    contenedorDatos.style.display = 'none';
    btnVer.textContent = "Mostrar datos";
    return alert('⚠️ No hay usuarios guardados.');
  }

  if (contenedorDatos.style.display === "block") {
    contenedorDatos.style.display = "none";
    btnVer.textContent = "Mostrar datos";
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
  btnVer.textContent = "Ocultar datos";

  document.querySelectorAll(".btn-borrar-individual").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      let datos = JSON.parse(localStorage.getItem("usuarios")) || [];
      datos.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(datos));
      alert("🗑️ Usuario eliminado.");
      btnVer.click();
    });
  });
});

// ------------ BORRAR TODO (CORREGIDO + ALERTA) ------------
btnBorrar.addEventListener('click', () => {
  try {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.length === 0) {
      alert("⚠️ No hay datos para borrar.");
      return;
    }

    localStorage.removeItem('usuarios');

    contenedorDatos.innerHTML = "";
    contenedorDatos.style.display = 'none';
    btnVer.textContent = "Mostrar datos";
    barra.style.width = "0%";

    campos.forEach(campo => {
      document.getElementById(`error-${campo}`).textContent = "";
    });

    // ALERTA FINAL ✔🔥
    alert("🗑️ La lista de datos fue eliminada por completo.");
  } catch (err) {
    console.error(err);
    alert("Se borro las lista de datos.");
  }
});

// ------------ LIMPIAR FORMULARIO ------------
btnLimpiar.addEventListener('click', () => {
  let todoVacio = campos.every(campo => {
    return document.getElementById(campo).value.trim() === "";
  });

  if (todoVacio) {
    campos.forEach(campo => {
      document.getElementById(`error-${campo}`).textContent = "";
    });
    alert("⚠️ Formulario vacío.");
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
