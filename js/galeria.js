fetch("cuadros.json")
    .then(response => response.json())
    .then(cuadros => {
        const galeria = document.getElementById("galeria");

        cuadros.forEach(cuadro => {
            const articulo = document.createElement("article");

            articulo.innerHTML = `
            <img src=${cuadro.imagen} alt=${cuadro.titulo}>
            <section class="detalles">
                <h3>${cuadro.titulo}</h3>
                <p>${cuadro.descripcion}</p>
                <p>Precio: <span class="precio">$${cuadro.precio}</span></p>
            </section>
            <button class="vermas">Ver más</button>
            `;

            galeria.appendChild(articulo);
        });
    })
    .catch(error => {
        console.error("Error al cargar la galería:", error);
    });