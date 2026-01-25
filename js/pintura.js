const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"), 10);

const container = document.getElementById("container");

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
      <img src="${cuadro.imagen}" alt="${cuadro.titulo}">
      <section class="info">
        <h1>${cuadro.titulo}</h1>
        <p>${cuadro.descripcion}</p>
        <p class="precio">$${cuadro.precio}</p>
        <a href="galeria.html">← Volver a la galería</a>
      </section>
    </article>
  `;

}