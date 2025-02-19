const express = require("express");
require("dotenv").config();
const path = require("path");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const { getRecommendation } = require("./ai-service");

// Configuração do servidor
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Simulador disponível em http://localhost:${PORT}`);
  console.log(`API disponível em http://localhost:${PORT}/setHouseSetup`);
});

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Rota de teste básica
app.get("/test", (req, res) => {
  res.send("Servidor Simulatrix está funcionando!");
});

// Definir provedor de IA a ser usado
const AI_PROVIDER = process.env.AI_PROVIDER || "mock";

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Endpoint para configurar a casa com base na descrição
app.post("/setHouseSetup", async (req, res) => {
  try {
    // Obter a descrição do corpo da requisição
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        error: "Descrição do ambiente é obrigatória",
      });
    }

    // Opções para o serviço de IA
    const options = {
      provider: AI_PROVIDER,
      openaiKey: process.env.OPENAI_API_KEY,
      anthropicKey: process.env.ANTHROPIC_API_KEY,
      model: req.body.model, // Opcional: permite que o cliente especifique o modelo
    };

    // Obter recomendação usando o serviço unificado
    const config = await getRecommendation(description, options);

    // Escrever as configurações em um arquivo JSON
    await fs.writeFile(
      path.join(__dirname, "config.json"),
      JSON.stringify(config, null, 2),
      "utf8"
    );

    // Enviar a configuração como resposta
    res.json(config);
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    res.status(500).json({
      error: "Erro ao processar a requisição",
      message: error.message,
    });
  }
});
