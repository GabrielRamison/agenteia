/**
 * Dados simulados para usar quando a API da OpenAI estiver indisponível
 */
const mockConfigurations = {
    "relaxante": [
      {"luz principal": {"intensidade": 40, "código rgb": "#7b68ee"}},
      {"luz esquerda": {"intensidade": 30, "código rgb": "#4b0082"}},
      {"luz direita": {"intensidade": 35, "código rgb": "#9370db"}},
      {"ar condicionado": {"estado": "ligado", "temperatura": 23}}
    ],
    
    "energético": [
      {"luz principal": {"intensidade": 85, "código rgb": "#ff4500"}},
      {"luz esquerda": {"intensidade": 75, "código rgb": "#ffa500"}},
      {"luz direita": {"intensidade": 80, "código rgb": "#ff8c00"}},
      {"ar condicionado": {"estado": "ligado", "temperatura": 21}}
    ],
    
    "filme": [
      {"luz principal": {"intensidade": 15, "código rgb": "#800080"}},
      {"luz esquerda": {"intensidade": 20, "código rgb": "#4b0082"}},
      {"luz direita": {"intensidade": 20, "código rgb": "#483d8b"}},
      {"ar condicionado": {"estado": "ligado", "temperatura": 22}}
    ],
    
    "trabalho": [
      {"luz principal": {"intensidade": 90, "código rgb": "#f5f5f5"}},
      {"luz esquerda": {"intensidade": 80, "código rgb": "#e6e6fa"}},
      {"luz direita": {"intensidade": 85, "código rgb": "#f0f8ff"}},
      {"ar condicionado": {"estado": "ligado", "temperatura": 24}}
    ],
    
    "festa": [
      {"luz principal": {"intensidade": 90, "código rgb": "#ff00ff"}},
      {"luz esquerda": {"intensidade": 85, "código rgb": "#00ff00"}},
      {"luz direita": {"intensidade": 85, "código rgb": "#1e90ff"}},
      {"ar condicionado": {"estado": "ligado", "temperatura": 18}}
    ],
    
    "default": [
      {"luz principal": {"intensidade": 60, "código rgb": "#ffffff"}},
      {"luz esquerda": {"intensidade": 50, "código rgb": "#ffccaa"}},
      {"luz direita": {"intensidade": 50, "código rgb": "#aaccff"}},
      {"ar condicionado": {"estado": "desligado", "temperatura": 22}}
    ]
  };
  
  /**
   * Função para simular a recomendação da API
   * @param {string} description - Descrição do ambiente
   * @returns {Array} - Configuração recomendada
   */
  function getMockRecommendation(description) {
    description = description.toLowerCase();
    
    if (description.includes("relax") || description.includes("calm") || 
        description.includes("tranquil") || description.includes("ler") || 
        description.includes("leitura") || description.includes("descan")) {
      return mockConfigurations.relaxante;
    }
    
    if (description.includes("energ") || description.includes("intenso") ||
        description.includes("vivo") || description.includes("ativo") ||
        description.includes("acordar")) {
      return mockConfigurations.energético;
    }
    
    if (description.includes("film") || description.includes("cinem") ||
        description.includes("seri") || description.includes("assisti") ||
        description.includes("escur") || description.includes("terror")) {
      return mockConfigurations.filme;
    }
    
    if (description.includes("trabalh") || description.includes("estud") ||
        description.includes("concentra") || description.includes("foc") ||
        description.includes("escrit") || description.includes("produtiv")) {
      return mockConfigurations.trabalho;
    }
    
    if (description.includes("fest") || description.includes("part") ||
        description.includes("celebra") || description.includes("comemora") ||
        description.includes("anima") || description.includes("dança")) {
      return mockConfigurations.festa;
    }
    
    return mockConfigurations.default;
  }
  
  module.exports = { getMockRecommendation };