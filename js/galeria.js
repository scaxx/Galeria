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
            <button class="vermas" data-id=${cuadro.id}>Ver más</button>
            `;

            galeria.appendChild(articulo);
        });

        galeria.addEventListener("click", (e) => {
            const boton = e.target.closest(".vermas");
            if (!boton) return;

            const id = boton.dataset.id;
            window.location.href = `pintura.html?id=${id}`;
        });
    })
    .catch(error => {
        console.error("Error al cargar la galería:", error);
    });