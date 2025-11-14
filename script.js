const form = document.getElementById('formUsuario');
const campos = ['nombre', 'email', 'edad'];
const barra = document.getElementById('barraProgreso');
const contenedorDatos = document.getElementById('datosMostrados');

<<<<<<< HEAD
// ------------ VALIDAR CAMPOS ------------
=======
>>>>>>> 6108b4b9dafabb065959c2f0698c2ec6b2066e01
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

<<<<<<< HEAD
// ------------ BARRA DE PROGRESO ------------
=======
>>>>>>> 6108b4b9dafabb065959c2f0698c2ec6b2066e01
function actualizarBarra() {
  let completados = 0;
  campos.forEach(campo => {
    if (document.getElementById(campo).value.trim() !== "") completados++;
  });
  const porcentaje = (completados / campos.length) * 100;
  barra.style.width = `${porcentaje}%`;
}
<<<<<<< HEAD
form.addEventListener('input', actualizarBarra);

// ------------ GUARDAR DATOS ------------
document.getElementById('guardar').addEventListener('click', () => {
  let valido = true;

  campos.forEach(campo => {
    if (!validarCampo(campo, `El ${campo} es obligatorio.`)) valido = false;
  });
=======

form.addEventListener('input', actualizarBarra);

document.getElementById('guardar').addEventListener('click', () => {
  let valido = true;
  if (!validarCampo('nombre', 'El nombre es obligatorio.')) valido = false;
  if (!validarCampo('email', 'El email es obligatorio.')) valido = false;
  if (!validarCampo('edad', 'La edad es obligatoria.')) valido = false;
>>>>>>> 6108b4b9dafabb065959c2f0698c2ec6b2066e01

  if (!valido) return;

  const datos = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    edad: document.getElementById('edad').value
  };

<<<<<<< HEAD
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

=======
  // Guardar en localStorage
  localStorage.setItem('usuario', JSON.stringify(datos));

  // Mostrar mensaje de éxito
  alert('✅ Datos guardados correctamente.');

  // 🔹 Limpiar formulario después de guardar
  form.reset();
  barra.style.width = "0%";
  contenedorDatos.style.display = 'none';

  // 🔹 Borrar mensajes de error
  campos.forEach(campo => {
    document.getElementById(`error-${campo}`).textContent = "";
  });
});

document.getElementById('verDatos').addEventListener('click', () => {
  const datos = JSON.parse(localStorage.getItem('usuario'));
  if (!datos) {
    contenedorDatos.style.display = 'none';
    return alert('⚠️ No hay datos guardados.');
  }

  contenedorDatos.innerHTML = `
    <h3>👤 Datos Guardados</h3>
    <p><strong>Nombre:</strong> ${datos.nombre}</p>
    <p><strong>Email:</strong> ${datos.email}</p>
    <p><strong>Edad:</strong> ${datos.edad}</p>
  `;
  contenedorDatos.style.display = 'block';
});

document.getElementById('borrar').addEventListener('click', () => {
  localStorage.removeItem('usuario');
  contenedorDatos.style.display = 'none';
  barra.style.width = "0%";
  alert('🗑️ Datos borrados del almacenamiento.');
});

document.getElementById('limpiar').addEventListener('click', () => {
  barra.style.width = "0%";
  contenedorDatos.style.display = 'none';
  campos.forEach(campo => {
    document.getElementById(`error-${campo}`).textContent = "";
  });
});


  
>>>>>>> 6108b4b9dafabb065959c2f0698c2ec6b2066e01
