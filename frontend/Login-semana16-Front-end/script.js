const botao = document.querySelector("#entrar");

botao.addEventListener("click", function(event) {
    event.preventDefault();

    botao.textContent = "Carregando...";
    botao.classList.add("loading");

    setTimeout(function() {
        botao.textContent = "Entrar";
        botao.classList.remove("loading");
    }, 3000);
});

gsap.from(".login", {
    opacity: 0,
    y: 50,
    duration: 1
});

gsap.from("h1", {
    opacity: 0,
    y: 50,
    duration: 1
});

