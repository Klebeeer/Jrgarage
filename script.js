/* =============================================
   JR GARAGE — script.js
   Desenvolvido por Kleber Alves | Tríade Digital
   ============================================= */

'use strict';

/* === GTM / GA4 TRACKING === */
function trackEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({ event: eventName, ...params });
  }
}

/* === DADOS DO ESTOQUE === */
// Edite aqui para adicionar ou remover veículos
const estoque = [
  {
    id: 1,
    nome: "Chevrolet Onix Plus Premier",
    marca: "Chevrolet",
    modelo: "Onix Plus Premier",
    ano: "2022",
    motor: "1.0 Turbo",
    cambio: "Automático",
    descricao: "Veículo em excelente estado, único dono, revisado em concessionária. Completo com todos os opcionais de fábrica.",
    preco: "R$ 79.900",
    imagemPrincipal: "",
    fotos: [],
    selo: "Destaque"
  },
  {
    id: 2,
    nome: "Toyota Corolla XEi",
    marca: "Toyota",
    modelo: "Corolla XEi",
    ano: "2021",
    motor: "2.0",
    cambio: "Automático",
    descricao: "Toyota Corolla em ótimas condições, histórico de revisões completo, película, rodas originais.",
    preco: "R$ 118.000",
    imagemPrincipal: "",
    fotos: [],
    selo: "Oportunidade"
  },
  {
    id: 3,
    nome: "Volkswagen T-Cross Highline",
    marca: "Volkswagen",
    modelo: "T-Cross Highline",
    ano: "2023",
    motor: "1.4 TSI",
    cambio: "Automático",
    descricao: "SUV compacto, baixíssima quilometragem, teto solar, couro, todas as assistências de direção.",
    preco: "R$ 135.000",
    imagemPrincipal: "",
    fotos: [],
    selo: "Baixa km"
  },
  {
    id: 4,
    nome: "Jeep Renegade Sport",
    marca: "Jeep",
    modelo: "Renegade Sport",
    ano: "2020",
    motor: "1.8",
    cambio: "Manual",
    descricao: "Jeep Renegade bem conservado, sempre revisado, ideal para quem quer um SUV com ótimo custo-benefício.",
    preco: "R$ 82.500",
    imagemPrincipal: "",
    fotos: [],
    selo: ""
  },
  {
    id: 5,
    nome: "Honda HR-V EXL",
    marca: "Honda",
    modelo: "HR-V EXL",
    ano: "2019",
    motor: "1.8",
    cambio: "Automático",
    descricao: "HR-V top de linha, couro, multimídia com Apple CarPlay, sensor de estacionamento. Procedência garantida.",
    preco: "R$ 98.000",
    imagemPrincipal: "",
    fotos: [],
    selo: ""
  },
  {
    id: 6,
    nome: "Ford Ka SE 1.0",
    marca: "Ford",
    modelo: "Ka SE",
    ano: "2021",
    motor: "1.0",
    cambio: "Manual",
    descricao: "Ford Ka bem conservado, baixo consumo, ideal para cidade. Excelente custo-benefício.",
    preco: "R$ 52.000",
    imagemPrincipal: "",
    fotos: [],
    selo: "Oportunidade"
  }
];

/* === WHATSAPP === */
const WA_NUMBER = "5514997750590";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

function waLink(veiculo = null, section = "geral") {
  let msg = "";
  if (veiculo) {
    msg = encodeURIComponent(`Olá! Tenho interesse no ${veiculo.nome} ${veiculo.ano} por ${veiculo.preco}. Poderia me dar mais informações?`);
  } else {
    msg = encodeURIComponent("Olá! Vim pelo site da JR Garage e gostaria de mais informações sobre os veículos.");
  }
  return `${WA_BASE}?text=${msg}`;
}

/* === RENDER CARD === */
function renderCard(v, destaque = false) {
  const seloMap = {
    "Destaque": "selo-destaque",
    "Oportunidade": "selo-oportunidade",
    "Novo no estoque": "selo-novo",
    "Baixa km": "selo-baixakm"
  };

  const seloHTML = v.selo ? `<span class="card-selo ${seloMap[v.selo] || 'selo-destaque'}">${v.selo}</span>` : '';

  const fotoHTML = v.imagemPrincipal
    ? `<img src="${v.imagemPrincipal}" alt="${v.nome}" loading="lazy">`
    : `<div class="card-foto-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 17H5a2 2 0 01-2-2V9a2 2 0 012-2h3m6 10h4a2 2 0 002-2V9a2 2 0 00-2-2h-3M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7h6"/>
          <circle cx="12" cy="13" r="3"/>
        </svg>
        <span>Foto em breve</span>
      </div>`;

  return `
    <div class="veiculo-card" data-id="${v.id}" data-marca="${v.marca}" data-modelo="${v.modelo}">
      <div class="card-foto">
        ${fotoHTML}
        ${seloHTML}
      </div>
      <div class="card-body">
        <div class="card-nome">${v.nome}</div>
        <div class="card-meta">
          <span>${v.ano}</span>
          <span>•</span>
          <span>${v.cambio}</span>
          <span>•</span>
          <span>${v.motor}</span>
        </div>
        <div class="card-preco">
          ${v.preco}
          <small>Consulte financiamento</small>
        </div>
        <div class="card-actions">
          <a href="${waLink(v, 'card')}"
            class="btn btn-whatsapp btn-sm js-track-whatsapp"
            id="whatsapp-card-${v.id}"
            data-event="whatsapp_click"
            data-page="estoque"
            data-section="vehicle_card"
            data-vehicle="${v.nome}"
            data-label="card_${v.id}"
            target="_blank"
            rel="noopener noreferrer"
            onclick="trackEvent('whatsapp_click',{event_category:'conversion',event_label:'vehicle_whatsapp',page:'estoque',section:'vehicle_card',vehicle:'${v.nome}'})">
            WhatsApp
          </a>
          <button class="btn btn-outline btn-sm js-ver-detalhes"
            data-id="${v.id}"
            onclick="abrirModal(${v.id})">
            Ver detalhes
          </button>
        </div>
      </div>
    </div>`;
}

/* === MODAL === */
let modalAberto = null;

function abrirModal(id) {
  const v = estoque.find(x => x.id === id);
  if (!v) return;
  modalAberto = id;

  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  const todasFotos = v.fotos.length > 0 ? v.fotos : (v.imagemPrincipal ? [v.imagemPrincipal] : []);

  const fotoHTML = todasFotos.length > 0
    ? `<img src="${todasFotos[0]}" alt="${v.nome}" id="modal-foto-main">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#444;flex-direction:column;gap:8px;font-size:0.85rem;">
        <svg style="width:48px;height:48px;opacity:0.3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 17H5a2 2 0 01-2-2V9a2 2 0 012-2h3m6 10h4a2 2 0 002-2V9a2 2 0 00-2-2h-3M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7h6"/>
          <circle cx="12" cy="13" r="3"/>
        </svg>
        Fotos em breve
      </div>`;

  const minisHTML = todasFotos.length > 1
    ? todasFotos.map((f, i) => `
        <div class="modal-mini ${i === 0 ? 'active' : ''}" data-src="${f}" onclick="trocarFoto('${f}', this, '${v.nome}')">
          <img src="${f}" alt="foto ${i+1}">
        </div>`).join('')
    : '';

  overlay.querySelector('.modal-galeria').innerHTML = `
    <div class="modal-foto-principal">${fotoHTML}</div>
    ${todasFotos.length > 1 ? `<div class="modal-miniaturas">${minisHTML}</div>` : ''}
  `;

  overlay.querySelector('.modal-info').innerHTML = `
    <button class="modal-close" onclick="fecharModal()" aria-label="Fechar">✕</button>
    <div class="modal-nome">${v.nome}</div>
    <div class="modal-preco">${v.preco}</div>
    <div class="modal-specs">
      <div class="spec-item"><div class="spec-label">Ano</div><div class="spec-valor">${v.ano}</div></div>
      <div class="spec-item"><div class="spec-label">Motor</div><div class="spec-valor">${v.motor}</div></div>
      <div class="spec-item"><div class="spec-label">Câmbio</div><div class="spec-valor">${v.cambio}</div></div>
      <div class="spec-item"><div class="spec-label">Marca</div><div class="spec-valor">${v.marca}</div></div>
    </div>
    <p class="modal-desc">${v.descricao}</p>
    <div class="modal-actions">
      <a href="${waLink(v, 'modal')}"
        class="btn btn-whatsapp btn-full js-track-whatsapp"
        id="whatsapp-modal-${v.id}"
        data-event="whatsapp_click"
        data-page="estoque"
        data-section="modal_detail"
        data-vehicle="${v.nome}"
        target="_blank"
        rel="noopener noreferrer"
        onclick="trackEvent('whatsapp_click',{event_category:'conversion',event_label:'vehicle_whatsapp_modal',page:'estoque',section:'modal_detail',vehicle:'${v.nome}'})">
        Tenho interesse — Falar no WhatsApp
      </a>
      <button class="btn btn-outline btn-full" onclick="fecharModal()">Fechar</button>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  trackEvent('vehicle_detail_open', {
    event_category: 'engagement',
    event_label: 'open_vehicle_detail',
    page: 'estoque',
    vehicle: v.nome
  });
}

function fecharModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
  modalAberto = null;
}

function trocarFoto(src, el, veiculoNome) {
  const main = document.getElementById('modal-foto-main');
  if (main) main.src = src;
  document.querySelectorAll('.modal-mini').forEach(m => m.classList.remove('active'));
  if (el) el.classList.add('active');
  trackEvent('vehicle_gallery_interaction', {
    event_category: 'engagement',
    event_label: 'gallery_image_change',
    page: 'estoque',
    vehicle: veiculoNome
  });
}

/* === FILTRO ESTOQUE === */
function buildSidebar() {
  const container = document.getElementById('marcas-container');
  if (!container) return;

  const marcasMap = {};
  estoque.forEach(v => {
    if (!marcasMap[v.marca]) marcasMap[v.marca] = [];
    if (!marcasMap[v.marca].includes(v.modelo)) {
      marcasMap[v.marca].push(v.modelo);
    }
  });

  const total = estoque.length;
  let html = `<div class="marca-item todos active" data-marca="todos" onclick="filtrarMarca('todos', this)">
    Todos os veículos
    <span class="marca-count">${total}</span>
  </div>`;

  Object.keys(marcasMap).sort().forEach(marca => {
    const count = marcasMap[marca].length;
    const modelos = marcasMap[marca];
    html += `
      <div>
        <div class="marca-item" data-marca="${marca}" onclick="filtrarMarca('${marca}', this)">
          ${marca}
          <span class="marca-count">${estoque.filter(v => v.marca === marca).length}</span>
        </div>
        <div class="modelos-lista" id="modelos-${marca.replace(/\s/g,'-')}">
          ${modelos.map(m => `<div class="modelo-item" data-modelo="${m}" onclick="filtrarModelo('${marca}','${m}',this)">${m}</div>`).join('')}
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

let filtroAtual = { marca: 'todos', modelo: null, busca: '' };

function filtrarMarca(marca, el) {
  filtroAtual.marca = marca;
  filtroAtual.modelo = null;

  document.querySelectorAll('.marca-item').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.modelos-lista').forEach(m => m.classList.remove('open'));
  document.querySelectorAll('.modelo-item').forEach(m => m.classList.remove('active'));

  if (el) el.classList.add('active');

  if (marca !== 'todos') {
    const modId = `modelos-${marca.replace(/\s/g,'-')}`;
    const modLista = document.getElementById(modId);
    if (modLista) modLista.classList.add('open');
  }

  renderEstoque();
}

function filtrarModelo(marca, modelo, el) {
  filtroAtual.marca = marca;
  filtroAtual.modelo = modelo;
  document.querySelectorAll('.modelo-item').forEach(m => m.classList.remove('active'));
  if (el) el.classList.add('active');
  renderEstoque();
}

function renderEstoque() {
  const container = document.getElementById('estoque-grid');
  if (!container) return;

  let lista = estoque;

  if (filtroAtual.marca !== 'todos') {
    lista = lista.filter(v => v.marca === filtroAtual.marca);
  }
  if (filtroAtual.modelo) {
    lista = lista.filter(v => v.modelo === filtroAtual.modelo);
  }
  if (filtroAtual.busca) {
    const q = filtroAtual.busca.toLowerCase();
    lista = lista.filter(v =>
      v.nome.toLowerCase().includes(q) ||
      v.marca.toLowerCase().includes(q) ||
      v.modelo.toLowerCase().includes(q) ||
      v.ano.includes(q)
    );
  }

  const contador = document.getElementById('estoque-contador');
  if (contador) {
    contador.innerHTML = `<strong>${lista.length}</strong> veículo${lista.length !== 1 ? 's' : ''} encontrado${lista.length !== 1 ? 's' : ''}`;
  }

  if (lista.length === 0) {
    container.innerHTML = `
      <div class="sem-resultado">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <p>Nenhum veículo encontrado para este filtro.</p>
      </div>`;
    return;
  }

  container.innerHTML = lista.map(v => renderCard(v)).join('');
}

/* === DESTAQUES HOME === */
function renderDestaques() {
  const container = document.getElementById('destaques-grid');
  if (!container) return;
  const top3 = estoque.slice(0, 3);
  container.innerHTML = top3.map(v => renderCard(v, true)).join('');
}

/* === NAV HAMBURGUER === */
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  window.closeMobileNav = function() {
    if (mobileNav) mobileNav.classList.remove('open');
  };
}

/* === SIDEBAR MOBILE === */
function initSidebarMobile() {
  const toggle = document.getElementById('sidebar-mobile-toggle');
  const sidebar = document.getElementById('sidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      const icon = toggle.querySelector('.toggle-icon');
      if (icon) icon.textContent = sidebar.classList.contains('open') ? '▲' : '▼';
    });
  }
}

/* === BUSCA === */
function initBusca() {
  const input = document.getElementById('busca-input');
  if (input) {
    input.addEventListener('input', (e) => {
      filtroAtual.busca = e.target.value.trim();
      renderEstoque();
    });
  }
}

/* === MAPA TRACKING === */
function initMapaTracking() {
  const mapaOverlay = document.querySelector('.mapa-overlay');
  if (mapaOverlay) {
    mapaOverlay.addEventListener('click', () => {
      mapaOverlay.style.pointerEvents = 'none';
      trackEvent('map_click', {
        event_category: 'engagement',
        event_label: 'mapa_jrgarage',
        location: 'jrgarage',
        page: 'home'
      });
    });
  }
}

/* === TRACKING GERAL === */
function initTracking() {
  // WhatsApp hero
  document.querySelectorAll('.js-track-whatsapp').forEach(el => {
    el.addEventListener('click', () => {
      const page = el.dataset.page || 'unknown';
      const section = el.dataset.section || 'unknown';
      const vehicle = el.dataset.vehicle || '';
      trackEvent('whatsapp_click', {
        event_category: 'conversion',
        event_label: 'whatsapp_button',
        page, section, vehicle
      });
    });
  });

  // Ver estoque
  document.querySelectorAll('.js-track-estoque').forEach(el => {
    el.addEventListener('click', () => {
      trackEvent('view_stock_click', {
        event_category: 'engagement',
        event_label: 'ver_estoque',
        page: 'home'
      });
    });
  });

  // Instagram footer
  document.querySelectorAll('.js-track-instagram').forEach(el => {
    el.addEventListener('click', () => {
      trackEvent('instagram_click', {
        event_category: 'engagement',
        event_label: 'footer_instagram',
        page: 'all'
      });
    });
  });

  // Avaliações
  document.querySelectorAll('.js-track-avaliacoes').forEach(el => {
    el.addEventListener('click', () => {
      trackEvent('reviews_click', {
        event_category: 'engagement',
        event_label: 'google_reviews',
        page: 'home'
      });
    });
  });
}

/* === MODAL OVERLAY FECHAR CLICANDO FORA === */
function initModalClose() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) fecharModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalAberto) fecharModal();
    });
  }
}

/* === INIT === */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTracking();
  initMapaTracking();
  initModalClose();

  // Home
  renderDestaques();

  // Estoque
  if (document.getElementById('estoque-grid')) {
    buildSidebar();
    initSidebarMobile();
    initBusca();
    renderEstoque();
  }
});
