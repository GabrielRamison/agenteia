# Simulatrix

Simulatrix é uma aplicação web interativa que simula um ambiente doméstico inteligente, permitindo o controle de iluminação e ar-condicionado através de uma interface gráfica ou descrições em linguagem natural processadas por IA.

![Simulatrix Interface](https://via.placeholder.com/800x500)

## Funcionalidades

- **Controle de Iluminação**: Gerencie 3 lâmpadas RGB com ajustes de cor e intensidade (0-99%)
- **Controle de Ar-Condicionado**: Ligue/desligue e ajuste a temperatura (16°C-30°C)
- **Configuração por IA**: Descreva o ambiente desejado e deixe que uma IA configure automaticamente as luzes e o ar-condicionado
- **Suporte a Múltiplos Provedores de IA**: Integração com OpenAI, Anthropic Claude ou dados simulados
- **Visualização em Tempo Real**: Interface gráfica que mostra os efeitos de iluminação de forma dinâmica

## Tecnologias Utilizadas

- HTML5, CSS3 e JavaScript (Frontend)
- Canvas API para efeitos de iluminação
- Node.js (Backend)
- APIs de IA (OpenAI e Anthropic Claude)

## Configuração do Ambiente

### Pré-requisitos

- Node.js 14.x ou superior
- NPM 6.x ou superior
- Chaves de API (opcional):
  - OpenAI API Key
  - Anthropic API Key

### Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/simulatrix.git
   cd simulatrix
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   PORT=3000
   AI_PROVIDER=mock  # Opções: openai, anthropic, mock
   OPENAI_API_KEY=sua_chave_openai  # Se utilizar OpenAI
   ANTHROPIC_API_KEY=sua_chave_anthropic  # Se utilizar Anthropic
   ```

4. Inicie o servidor:
   ```
   npm start
   ```

5. Acesse a aplicação no navegador:
   ```
   http://localhost:3000
   ```

## Guia de Uso

### Interface Básica

- **Controle das Lâmpadas**: Use os seletores de cor e os sliders de intensidade para ajustar cada lâmpada individualmente
- **Controle do Ar-Condicionado**: Use o botão liga/desliga e os botões +/- para ajustar a temperatura

### Configuração por IA

1. Digite uma descrição do ambiente desejado no campo de texto (ex: "Um ambiente aconchegante para leitura à noite")
2. Selecione o provedor de IA desejado (OpenAI, Claude ou Dados Simulados)
3. Clique em "Aplicar Cena"
4. A aplicação processará a descrição e configurará automaticamente as luzes e o ar-condicionado

## Estrutura do Projeto

```
simulatrix/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── api-client.js
│   └── assets/
│       └── house.png
├── server/
│   ├── server.js
│   ├── ai-service.js
│   ├── openai-api.js
│   ├── anthropic-api.js
│   └── mock-data.js
├── .env
├── package.json
└── README.md
```

## APIs e Integração

### Endpoint `/setHouseSetup`

Recebe descrições em linguagem natural e retorna configurações para as luzes e ar-condicionado.

**Requisição:**
```json
{
  "description": "Um ambiente aconchegante para leitura à noite",
  "provider": "openai"
}
```

**Resposta:**
```json
[
  {"luz principal": {"intensidade": 30, "código rgb": "#ffaa77"}},
  {"luz esquerda": {"intensidade": 15, "código rgb": "#ffccaa"}},
  {"luz direita": {"intensidade": 20, "código rgb": "#aaccff"}},
  {"ar condicionado": {"estado": "ligado", "temperatura": 23}}
]
```

### Formato de Dados

As configurações seguem sempre o mesmo formato JSON estruturado para garantir compatibilidade entre diferentes provedores de IA.

## Resolução de Problemas

### Erro de API
Se ocorrer um erro de API, a aplicação usará automaticamente dados simulados como fallback para garantir o funcionamento contínuo.

### Problemas Comuns
- **Erros de Conexão**: Verifique sua conexão com a internet e se as chaves de API estão configuradas corretamente
- **Problemas de Visualização**: Certifique-se de que seu navegador suporta Canvas API e JavaScript moderno

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das mudanças (`git commit -am 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Para sugestões, dúvidas ou problemas, abra uma issue no repositório do GitHub.
