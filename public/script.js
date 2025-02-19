// Elementos DOM
const canvas = document.getElementById('overlay');
const ctx = canvas.getContext('2d');
const container = document.querySelector('.container');

// Configuração do canvas
function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    updateAllLights();
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);

// Conversão de cores
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Função para atualizar o valor da intensidade
function updateIntensityValue(id, value) {
    document.getElementById(id).textContent = value;
}

// Função para atualizar a aparência da lâmpada
function updateLampAppearance(lampId, color) {
    const lamp = document.getElementById(lampId);
    lamp.style.backgroundColor = color;
    lamp.style.boxShadow = `0 0 10px ${color}`;
}

// Função para desenhar a iluminação de uma lâmpada
function drawLampLight(x, y, color, intensity) {
    const rgb = hexToRgb(color);
    const maxRadius = Math.max(canvas.width, canvas.height) * (intensity / 50);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, maxRadius);
    
    const alpha = intensity / 200; // Ajusta a intensidade para ficar sutil
    gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
    gradient.addColorStop(0.7, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.3})`);
    gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
    
    return gradient;
}

// Função para atualizar todas as luzes
function updateAllLights() {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Obter posições das lâmpadas
    const lamp1 = document.getElementById('lamp1');
    const lamp2 = document.getElementById('lamp2');
    const lamp3 = document.getElementById('lamp3');
    
    const lamp1Rect = lamp1.getBoundingClientRect();
    const lamp2Rect = lamp2.getBoundingClientRect();
    const lamp3Rect = lamp3.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const x1 = lamp1Rect.left + lamp1Rect.width/2 - containerRect.left;
    const y1 = lamp1Rect.top + lamp1Rect.height/2 - containerRect.top;
    const x2 = lamp2Rect.left + lamp2Rect.width/2 - containerRect.left;
    const y2 = lamp2Rect.top + lamp2Rect.height/2 - containerRect.top;
    const x3 = lamp3Rect.left + lamp3Rect.width/2 - containerRect.left;
    const y3 = lamp3Rect.top + lamp3Rect.height/2 - containerRect.top;
    
    // Obter cores e intensidades
    const color1 = document.getElementById('color1').value;
    const intensity1 = parseInt(document.getElementById('intensity1').value);
    const color2 = document.getElementById('color2').value;
    const intensity2 = parseInt(document.getElementById('intensity2').value);
    const color3 = document.getElementById('color3').value;
    const intensity3 = parseInt(document.getElementById('intensity3').value);
    
    // Atualizar os brilhos das lâmpadas
    updateLampAppearance('lamp1', color1);
    updateLampAppearance('lamp2', color2);
    updateLampAppearance('lamp3', color3);
    
    // Desenhar as luzes combinadas no canvas
    ctx.globalCompositeOperation = 'lighter';
    
    // Desenha cada lâmpada individualmente
    if (intensity1 > 0) {
        ctx.fillStyle = drawLampLight(x1, y1, color1, intensity1);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    if (intensity2 > 0) {
        ctx.fillStyle = drawLampLight(x2, y2, color2, intensity2);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    if (intensity3 > 0) {
        ctx.fillStyle = drawLampLight(x3, y3, color3, intensity3);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Função para atualizar o ar-condicionado
function updateAC() {
    const ac = document.getElementById('ac');
    const acPower = document.getElementById('acPower').checked;
    const acTemp = document.getElementById('acTemp').value;
    
    if (acPower) {
        ac.textContent = acTemp + '°C';
        ac.classList.add('on');
        
        // Muda a cor com base na temperatura
        const tempValue = parseInt(acTemp);
        let r, g, b;
        
        if (tempValue <= 20) {
            // Azul para frio
            const intensity = 1 - ((tempValue - 16) / 4);
            r = Math.round(200 * (1 - intensity));
            g = Math.round(220 * (1 - intensity));
            b = 255;
        } else {
            // Vermelho para quente
            const intensity = (tempValue - 20) / 10;
            r = 255;
            g = Math.round(220 * (1 - intensity));
            b = Math.round(255 * (1 - intensity));
        }
        
        ac.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        ac.style.color = tempValue <= 23 ? '#333' : 'white';
    } else {
        ac.textContent = 'OFF';
        ac.style.backgroundColor = '#aaa';
        ac.style.color = '#333';
        ac.classList.remove('on');
    }
}

// Event listeners para as lâmpadas
document.getElementById('color1').addEventListener('input', () => {
    updateAllLights();
});

document.getElementById('intensity1').addEventListener('input', (e) => {
    updateIntensityValue('intensityValue1', e.target.value);
    updateAllLights();
});

document.getElementById('color2').addEventListener('input', () => {
    updateAllLights();
});

document.getElementById('intensity2').addEventListener('input', (e) => {
    updateIntensityValue('intensityValue2', e.target.value);
    updateAllLights();
});

document.getElementById('color3').addEventListener('input', () => {
    updateAllLights();
});

document.getElementById('intensity3').addEventListener('input', (e) => {
    updateIntensityValue('intensityValue3', e.target.value);
    updateAllLights();
});

// Event listeners para o ar-condicionado
document.getElementById('acPower').addEventListener('change', updateAC);

document.getElementById('tempDown').addEventListener('click', () => {
    const tempInput = document.getElementById('acTemp');
    const currentTemp = parseInt(tempInput.value);
    if (currentTemp > parseInt(tempInput.min)) {
        tempInput.value = currentTemp - 1;
        updateAC();
    }
});

document.getElementById('tempUp').addEventListener('click', () => {
    const tempInput = document.getElementById('acTemp');
    const currentTemp = parseInt(tempInput.value);
    if (currentTemp < parseInt(tempInput.max)) {
        tempInput.value = currentTemp + 1;
        updateAC();
    }
});

// Inicialização
updateIntensityValue('intensityValue1', document.getElementById('intensity1').value);
updateIntensityValue('intensityValue2', document.getElementById('intensity2').value);
updateIntensityValue('intensityValue3', document.getElementById('intensity3').value);
updateAC();
updateAllLights();