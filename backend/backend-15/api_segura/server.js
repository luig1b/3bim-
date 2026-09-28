const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

const PORTA = 3000;
const CHAVE_SECRETA = "chave-didatica-troque-em-producao";

const usuarios = [
  {
    id: 1,
    nome: "Ana",
    email: "ana@escola.com",
    senhaHash: bcrypt.hashSync("1234", 10),
    perfil: "usuario"
  },
  {
    id: 2,
    nome: "Carlos",
    email: "admin@escola.com",
    senhaHash: bcrypt.hashSync("admin123", 10),
    perfil: "admin"
  }
];

app.get("/", (req, res) => {
  res.json({
    mensagem: "API segura em funcionamento",
    rotas: ["POST /login", "GET /perfil", "GET /admin"]
  });
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      erro: "Informe e-mail e senha."
    });
  }

  const usuario = usuarios.find(item => item.email === email);

  if (!usuario || !bcrypt.compareSync(senha, usuario.senhaHash)) {
    return res.status(401).json({
      erro: "Credenciais inválidas."
    });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil
    },
    CHAVE_SECRETA,
    { expiresIn: "30m" }
  );

  return res.status(200).json({
    mensagem: "Login realizado com sucesso.",
    token
  });
});

function autenticarToken(req, res, next) {
  const cabecalho = req.headers.authorization;

  if (!cabecalho || !cabecalho.startsWith("Bearer ")) {
    return res.status(401).json({
      erro: "Token não informado."
    });
  }

  const token = cabecalho.split(" ")[1];

  try {
    req.usuario = jwt.verify(token, CHAVE_SECRETA);
    next();
  } catch (erro) {
    return res.status(403).json({
      erro: "Token inválido ou expirado."
    });
  }
}

function permitirSomenteAdmin(req, res, next) {
  if (req.usuario.perfil !== "admin") {
    return res.status(403).json({
      erro: "Acesso permitido somente para administradores."
    });
  }

  next();
}

app.get("/perfil", autenticarToken, (req, res) => {
  res.status(200).json({
    mensagem: "Rota protegida acessada.",
    usuario: req.usuario
  });
});

app.get(
  "/admin",
  autenticarToken,
  permitirSomenteAdmin,
  (req, res) => {
    res.status(200).json({
      mensagem: "Área administrativa acessada."
    });
  }
);

app.listen(PORTA, () => {
  console.log(`Servidor executando em http://localhost:${PORTA}`);
});
