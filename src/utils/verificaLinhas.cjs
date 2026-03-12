const fs = require("fs");
const path = require("path");

/* 👇 Quais extensões você quer verificar: */
const extensoesPermitidas = [".tsx"];

/* 👇 Qual o limite de linhas para todos os arquivos com a extensão escolhida: */
const limite = 200;

function contarLinhasNaPasta(pasta) {
  fs.readdirSync(pasta).forEach((item) => {
    const caminho = path.join(pasta, item);
    const stats = fs.statSync(caminho);

    if (stats.isDirectory()) {
      contarLinhasNaPasta(caminho);
    } else if (extensoesPermitidas.includes(path.extname(caminho))) {
      const linhas = fs.readFileSync(caminho, "utf-8").split("\n").length;
      const status = linhas > limite ? "⚠️" : "✅";
      console.log(`${caminho}: ${linhas} linhas ${status}`);
    }
  });
}

const raiz = __dirname;
contarLinhasNaPasta(raiz);
