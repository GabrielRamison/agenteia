/**
 * Cliente de API para comunicação com o servidor e configuração das luzes e ar-condicionado
 */

// Função para solicitar um ambiente com base na descrição
async function requestEnvironment(description) {
    try {
      const response = await fetch('/setHouseSetup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro: ${errorData.error || response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Falha ao solicitar configuração:', error);
      throw error;
    }
  }
  
  // Função para aplicar as configurações ao simulador
  function applySettings(configuration) {
    if (!Array.isArray(configuration) || configuration.length < 4) {
      throw new Error('Formato de configuração inválido');
    }
  
    try {
      // Configurar luz principal
      const mainLight = configuration[0]['luz principal'];
      document.getElementById('color1').value = mainLight['código rgb'];
      document.getElementById('intensity1').value = mainLight['intensidade'];
      updateIntensityValue('intensityValue1', mainLight['intensidade']);
  
      // Configurar luz esquerda
      const leftLight = configuration[1]['luz esquerda'];
      document.getElementById('color2').value = leftLight['código rgb'];
      document.getElementById('intensity2').value = leftLight['intensidade'];
      updateIntensityValue('intensityValue2', leftLight['intensidade']);
  
      // Configurar luz direita
      const rightLight = configuration[2]['luz direita'];
      document.getElementById('color3').value = rightLight['código rgb'];
      document.getElementById('intensity3').value = rightLight['intensidade'];
      updateIntensityValue('intensityValue3', rightLight['intensidade']);
  
      // Configurar ar-condicionado
      const ac = configuration[3]['ar condicionado'];
      document.getElementById('acPower').checked = ac['estado'].toLowerCase() === 'ligado';
      document.getElementById('acTemp').value = ac['temperatura'];
  
      // Atualizar simulação
      updateAC();
      updateAllLights();
  
      console.log('Configurações aplicadas com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao aplicar configurações:', error);
      return false;
    }
  }
  
  // Carregar configuração atual quando a página for carregada
  async function loadCurrentConfig() {
    try {
      const response = await fetch('/getCurrentSetup');
      if (response.ok) {
        const config = await response.json();
        if (config && Array.isArray(config) && config.length >= 4) {
          applySettings(config);
          console.log('Configuração existente carregada');
        }
      }
    } catch (error) {
      console.warn('Nenhuma configuração prévia encontrada:', error);
    }
  }
  
  // Adicionar ao carregamento da página
  window.addEventListener('load', loadCurrentConfig);