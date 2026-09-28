const titulo = document.querySelector("#titulo-produto");
const descricao = document.querySelector(".descricao");
const adicionar = document.querySelector("#adicionar");
const mensagem = document.querySelector("#mensagem");
const saibaMais = document.querySelector("#saiba-mais");
const detalhes = document.querySelector("#detalhes");

setTimeout(() => titulo.classList.add("mostrar"), 200);
setTimeout(() => descricao.classList.add("mostrar"), 600);

adicionar.addEventListener("click", () => {
  mensagem.textContent = "Produto adicionado ao carrinho com sucesso!";
});

saibaMais.addEventListener("click", () => {
  const aberto = saibaMais.getAttribute("aria-expanded") === "true";
  saibaMais.setAttribute("aria-expanded", String(!aberto));
  detalhes.hidden = aberto;

});

