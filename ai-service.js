/**
 * Serviço unificado para chamar diferentes APIs de IA
 */
const { getOpenAIRecommendation } = require('./openai-api');
const { getClaudeRecommendation } = require('./anthropic-api');
const { getMockRecommendation } = require('./mock-data');

/**
 * Obtém recomendações de configuração de ambiente de diferentes provedores de IA
 * @param {string} description - Descrição do ambiente desejado
 * @param {Object} options - Opções de configuração
 * @param {string} options.provider - Provedor de IA ('openai', 'anthropic', 'mock')
 * @param {string} options.openaiKey - Chave da API OpenAI (se provider=openai)
 * @param {string} options.anthropicKey - Chave da API Anthropic (se provider=anthropic)
 * @param {string} options.model - Modelo específico a ser usado
 * @returns {Promise<Array>} - Configuração recomendada
 */
async function getRecommendation(description, options = {}) {
  const {
    provider = process.env.AI_PROVIDER || 'mock',
    openaiKey = process.env.OPENAI_API_KEY,
    anthropicKey = process.env.ANTHROPIC_API_KEY,
    model
  } = options;

  try {
    switch (provider.toLowerCase()) {
      case 'openai':
        if (!openaiKey) {
          throw new Error('Chave da API OpenAI não configurada');
        }
        return await getOpenAIRecommendation(description, openaiKey, model);

      case 'anthropic':
        if (!anthropicKey) {
          throw new Error('Chave da API Anthropic não configurada');
        }
        return await getClaudeRecommendation(description, anthropicKey, model);

      case 'mock':
      default:
        console.log('Usando provedor simulado para recomendações');
        return getMockRecommendation(description);
    }
  } catch (error) {
    console.error(`Erro com provedor ${provider}:`, error.message);
    // Fallback para mock data em caso de falha
    console.log('Fallback para dados simulados');
    return getMockRecommendation(description);
  }
}

module.exports = { getRecommendation };