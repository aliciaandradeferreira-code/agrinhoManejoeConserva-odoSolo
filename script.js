// Substitua pela sua chave obtida gratuitamente no Unsplash Developers
const UNSPLASH_ACCESS_KEY = 'SUA_CHAVE_AQUI'; 

// 1. Menu Responsivo com Acessibilidade
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    const visivel = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', visivel);
});

// 2. Função para buscar imagens na API do Unsplash
async function carregarImagensDoSolo() {
    // Se você não tiver colocado a chave ainda, o código usa imagens mockadas seguras para o site não quebrar
    if (UNSPLASH_ACCESS_KEY === 'SUA_CHAVE_AQUI') {
        definirImagensPadrao();
        return;
    }

    try {
        // Busca imagens focadas em conservação do solo e agricultura sustentável
        const response = await fetch(`https://api.unsplash.com/search/photos?query=soil-conservation-agriculture&per_page=4&client_id=${UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();

        if(data.results && data.results.length >= 4) {
            // Imagem da Seção Importância
            inserirImagem('img-importancia', data.results[0].urls.regular, data.results[0].alt_description);
            
            // Imagens dos Cards
            inserirImagemCard('img-card1', data.results[1].urls.small, data.results[1].alt_description);
            inserirImagemCard('img-card2', data.results[2].urls.small, data.results[2].alt_description);
            inserirImagemCard('img-card3', data.results[3].urls.small, data.results[3].alt_description);
        }
        
        // Carrega fotos adicionais para a galeria
        carregarGaleria();

    } catch (error) {
        console.error("Erro ao carregar imagens da API Unsplash:", error);
        definirImagensPadrao();
    }
}

async function carregarGaleria() {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=farming-soil&per_page=3&client_id=${UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();
        const galeriaContainer = document.getElementById('galeria-dinamica');
        galeriaContainer.innerHTML = '';

        data.results.forEach(foto => {
            const imgElement = document.createElement('img');
            imgElement.src = foto.urls.small;
            imgElement.alt = foto.alt_description || "Imagem sobre conservação do solo";
            imgElement.classList.add('galeria-img');
            imgElement.setAttribute('loading', 'lazy'); // Acessibilidade e performance
            
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.appendChild(imgElement);
            galeriaContainer.appendChild(cardElement);
        });
    } catch(e) {
        // Fallback em caso de erro na galeria
    }
}

// Funções auxiliares de inserção
function inserirImagem(idAlvo, url, altText) {
    const container = document.getElementById(idAlvo);
    container.innerHTML = `<img src="${url}" alt="${altText || 'Conservação do solo'}" loading="lazy">`;
}

function inserirImagemCard(idAlvo, url, altText) {
    const container = document.getElementById(idAlvo);
    container.style.background = `url('${url}') center/cover`;
    container.setAttribute('role', 'img');
    container.setAttribute('aria-label', altText || 'Imagem explicativa sobre manejo');
}

// Fallback caso o usuário não configure a API imediatamente
function definirImagensPadrao() {
    inserirImagem('img-importancia', 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80', 'Solo fértil com pequenas brotações');
    inserirImagemCard('img-card1', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80', 'Plantação sustentável');
    inserirImagemCard('img-card2', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad451?auto=format&fit=crop&w=400&q=80', 'Mãos segurando terra preta fértil');
    inserirImagemCard('img-card3', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80', 'Trator trabalhando em curvas de nível');
    
    // Preenche galeria padrão
    const galeriaContainer = document.getElementById('galeria-dinamica');
    galeriaContainer.innerHTML = `
        <div class="card"><img class="galeria-img" src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80" alt="Broto verde no solo"></div>
        <div class="card"><img class="galeria-img" src="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=400&q=80" alt="Campo arado corretamente"></div>
        <div class="card"><img class="galeria-img" src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80" alt="Textura de solo saudável enriquecido"></div>
    `;
}

// Inicializar carregamento das imagens ao abrir a página
window.addEventListener('DOMContentLoaded', carregarImagensDoSolo);