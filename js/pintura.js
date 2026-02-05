const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"), 10);

const container = document.getElementById("container");
const modal = document.getElementById("pintura-contacto");
const inputNombre = document.getElementById("pintura-cliente");
const inputMensaje = document.getElementById("pintura-mensaje");
const form = document.getElementById("form-pintura");
const btnCerrar = document.getElementById("form-cerrar");

const cache = localStorage.getItem("cuadros");

if (cache) {
    const cuadros = JSON.parse(cache);
    renderPintura(cuadros);
} else {
    fetch("cuadros.json")
        .then(res => res.json())
        .then(cuadros => {
            localStorage.setItem("cuadros", JSON.stringify(cuadros));
            renderPintura(cuadros);
        })
        .catch(err => {
            container.innerHTML = "<p>Error al cargar la pintura</p>";
            console.error(err);
        });
}

function renderPintura(cuadros) {
    const cuadro = cuadros.find(c => c.id === id);

    if (!cuadro) {
        container.innerHTML = "<p>Pintura no encontrada</p>";
        return;
    }

    container.innerHTML = `
    <article class="pintura">
        <img src="${cuadro.imagen}" alt="${cuadro.titulo}" class="cuadro">
        <section class="pintura-info">
            <h1 class="titulo">${cuadro.titulo}</h1>
            <p class="descripcion">${cuadro.descripcion}</p>
            <p class="precio">Precio: <span>$${cuadro.precio}</span></p>
            <section class="botones">
                <a class="volver" href="galeria.html"><img src="../assets/flecha.png" alt="Atrás"> Volver</a>
                <button class="me-interesa">Me interesa</button>
            </section>
        </section>
    </article>
  `;

const meInteresa = document.querySelector(".me-interesa");

meInteresa.addEventListener("click", () => {
    modal.classList.add("activo");

    const urlActual = window.location.href;

    inputMensaje.value = `Hola, me interesa la obra "${cuadro.titulo}".
¿Podrías darme más información?

Link: ${urlActual}`;
});

}

btnCerrar.addEventListener("click", () => {
    modal.classList.remove("activo");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("activo");
    } 
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const mensaje = inputMensaje.value.trim();

    alert("Mensaje enviado correctamente");

    form.reset();
    modal.classList.remove("activo"); 
});