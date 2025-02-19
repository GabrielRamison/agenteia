// Importando o módulo fetch para Node.js
const fetch = require('node-fetch');

/**
 * Função para chamar a API da Anthropic Claude com uma descrição de ambiente
 * e obter configurações recomendadas para luzes e ar-condicionado
 * 
 * @param {string} description - Descrição do ambiente desejado
 * @param {string} apiKey - Chave de API da Anthropic
 * @param {string} model - Modelo Claude a ser usado (default: claude-3-sonnet-20240229)
 * @returns {Promise<Object>} - Configurações recomendadas em formato JSON
 */
async function getClaudeRecommendation(description, apiKey, model = 'claude-3-5-sonnet-20241022') {
  if (!description || !apiKey) {
    throw new Error('Descrição e chave de API são obrigatórios');
  }

  const prompt = `Eu tenho 3 luzes na minha sala, elas são RGB e têm intensidade de 0 a 99, além de um ar-condicionado com controle de temperatura de 16°C a 30°C e função de ligar/desligar.

Qual deve ser a configuração deles para o que foi descrito aqui: ${description}

Você deve me responder no seguinte formato sempre:

[
  {"luz principal": {"intensidade": x, "código rgb": y}},
  {"luz esquerda": {"intensidade": x, "código rgb": y}},
  {"luz direita": {"intensidade": x, "código rgb": y}},
  {"ar condicionado": {"estado": "ligado/desligado", "temperatura": z}}
]`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro na API Anthropic: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Verificar se temos uma resposta válida
    if (!data.content || data.content.length === 0) {
      throw new Error('Resposta vazia da API');
    }

    // Extrair o texto da resposta (a resposta do Claude pode estar em um formato diferente)
    const responseText = data.content[0].text;
    
    // Tentar fazer o parse do JSON
    try {
      // Encontrar o JSON na resposta, caso haja texto extra
      const jsonMatch = responseText.match(/\[\s*\{.*\}\s*\]/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      // Se não encontrou um array JSON explícito, tenta fazer parse da resposta completa
      return JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(`Erro ao processar resposta: ${parseError.message}. Resposta recebida: ${responseText}`);
    }
  } catch (error) {
    console.error('Erro ao chamar a API da Anthropic:', error);
    throw error;
  }
}

module.exports = { getClaudeRecommendation };