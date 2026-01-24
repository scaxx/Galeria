const form = document.getElementById("contacto");
const overlay = document.getElementById("overlay");
const cerrar = document.getElementById("cerrar");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const consulta = document.getElementById("consulta").value.trim();

    const tel = 598XXXXXXXX;
    const texto = `Hola, soy ${nombre}.%0A%0A${consulta}`;
    const url = `https://wa.me/${tel}?text=${texto}`;

    window.open(url, "_blank");
    form.reset();
    overlay.classList.remove("oculto");

});

cerrar.addEventListener("click", () => {
    overlay.classList.add("oculto");
});