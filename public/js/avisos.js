/* ===========================================
   GERENCIAMENTO DE AVISOS - ALUNO
   Carrega avisos destinados ao aluno
   =========================================== */

if (typeof api === 'undefined') {
  console.error('[AVISOS] APIService não está disponível!');
}

let avisosData = [];

document.addEventListener('DOMContentLoaded', function () {
  console.log('[AVISOS] Script carregado');

  // Atualizar informações do usuário no header
  updateUserInfo();

  // Carregar avisos
  carregarAvisos();

  // Setup event listeners
  setupEventListeners();
});

/**
 * Atualizar informações do usuário no header
 */
function updateUserInfo() {
  const userName = localStorage.getItem('userName') || 'Aluno';
  const userRole = localStorage.getItem('userRole') || 'Aluno';
  
  const headerUserName = document.querySelector('.header-user-name');
  const headerUserRole = document.querySelector('.header-user-role');
  const headerUserAvatar = document.querySelector('.header-user-avatar');

  if (headerUserName) headerUserName.textContent = userName;
  if (headerUserRole) headerUserRole.textContent = userRole;
  if (headerUserAvatar) {
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
    headerUserAvatar.textContent = initials || 'AL';
  }
}

/**
 * Carregar avisos da API
 */
async function carregarAvisos() {
  const spinner = document.getElementById('loadingSpinner');
  const content = document.getElementById('pageContent');

  try {
    console.log('%c[AVISOS] Iniciando carregamento...', 'color: blue; font-weight: bold;');

    // Carregar todos os avisos
    const avisos = await api.getAvisos();
    console.log('[AVISOS] Total de avisos carregados:', avisos?.length || 0);

    if (!avisos || avisos.length === 0) {
      const avisosList = document.getElementById('avisosList');
      avisosList.innerHTML = '<div class="alert alert-info">Nenhum aviso disponível.</div>';
      spinner.style.display = 'none';
      content.style.display = 'block';
      return;
    }

    // Filtrar avisos para o aluno (TODOS ou ESTUDANTES)
    avisosData = avisos.filter(aviso => {
      const destinatarios = aviso.destinatarios || 'TODOS';
      return destinatarios === 'TODOS' || destinatarios === 'ESTUDANTES';
    });

    console.log('[AVISOS] Avisos para aluno:', avisosData.length);

    if (avisosData.length === 0) {
      const avisosList = document.getElementById('avisosList');
      avisosList.innerHTML = '<div class="alert alert-info">Nenhum aviso disponível para você.</div>';
      spinner.style.display = 'none';
      content.style.display = 'block';
      return;
    }

    // Preencher tipos únicos no dropdown
    const tiposUnicos = [...new Set(avisosData.map(a => a.prioridade || 'MEDIA'))];
    const filtroPrioridade = document.getElementById('filtroPrioridade');
    if (filtroPrioridade) {
      tiposUnicos.forEach(prioridade => {
        const option = document.createElement('option');
        option.value = prioridade;
        option.textContent = nomePrioridade(prioridade);
        filtroPrioridade.appendChild(option);
      });
    }

    // Renderizar avisos
    renderizarAvisos(avisosData);

    spinner.style.display = 'none';
    content.style.display = 'block';

    console.log('%c[AVISOS] Carregamento concluído!', 'color: green; font-weight: bold;');

  } catch (erro) {
    console.error('%c[AVISOS] Erro ao carregar:', 'color: red;', erro);
    const spinner = document.getElementById('loadingSpinner');
    spinner.innerHTML = `<div class="alert alert-danger">Erro ao carregar avisos: ${erro.message}</div>`;
  }
}

/**
 * Renderizar avisos
 */
function renderizarAvisos(avisos) {
  const avisosList = document.getElementById('avisosList');
  avisosList.innerHTML = '';

  avisos.forEach(aviso => {
    const prioridade = aviso.prioridade || 'MEDIA';
    const badgeClass = getClassesPrioridade(prioridade);
    const nomePri = nomePrioridade(prioridade);

    const avisoCard = document.createElement('div');
    avisoCard.className = `aviso-card ${badgeClass}`;
    avisoCard.dataset.prioridade = prioridade;
    avisoCard.dataset.id = aviso.id_aviso;

    const dataFormatada = formatarData(aviso.data_publicacao || aviso.created_at);

    avisoCard.innerHTML = `
      <div class="aviso-header">
        <div class="aviso-badges">
          <span class="badge ${badgeClass}">${nomePri}</span>
        </div>
        <span class="aviso-data">${dataFormatada}</span>
      </div>
      <h5 class="aviso-titulo">${aviso.titulo || aviso.titulo_aviso || 'Sem título'}</h5>
      <p class="aviso-texto">${aviso.conteudo || aviso.conteudo_aviso || 'Sem conteúdo'}</p>
      <div class="aviso-footer">
        <span class="aviso-destinatarios">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          ${aviso.destinatarios || 'TODOS'}
        </span>
      </div>
    `;

    avisosList.appendChild(avisoCard);
  });
}

/**
 * Filtrar avisos
 */
function filtrarAvisos() {
  const prioridadeSelecionada = document.getElementById('filtroPrioridade')?.value || '';
  const termoBusca = document.getElementById('buscaAviso')?.value.toLowerCase().trim() || '';
  const avisos = document.querySelectorAll('.aviso-card');

  avisos.forEach(aviso => {
    const prioridade = aviso.dataset.prioridade;
    const titulo = aviso.querySelector('.aviso-titulo')?.textContent.toLowerCase() || '';
    const conteudo = aviso.querySelector('.aviso-texto')?.textContent.toLowerCase() || '';

    const matchPrioridade = !prioridadeSelecionada || prioridade === prioridadeSelecionada;
    const matchBusca = !termoBusca || titulo.includes(termoBusca) || conteudo.includes(termoBusca);

    aviso.style.display = matchPrioridade && matchBusca ? 'block' : 'none';
  });
}

/**
 * Configurar event listeners
 */
function setupEventListeners() {
  const btnFiltrar = document.getElementById('btnFiltrar');
  const filtroPrioridade = document.getElementById('filtroPrioridade');
  const buscaAviso = document.getElementById('buscaAviso');

  if (btnFiltrar) {
    btnFiltrar.addEventListener('click', filtrarAvisos);
  }

  if (filtroPrioridade) {
    filtroPrioridade.addEventListener('change', filtrarAvisos);
  }

  if (buscaAviso) {
    buscaAviso.addEventListener('input', filtrarAvisos);
  }
}

/**
 * Obter classe CSS para prioridade
 */
function getClassesPrioridade(prioridade) {
  const prioridadeMap = {
    'ALTA': 'badge-danger',
    'MEDIA': 'badge-warning',
    'BAIXA': 'badge-info'
  };
  return prioridadeMap[prioridade] || 'badge-secondary';
}

/**
 * Obter nome de prioridade
 */
function nomePrioridade(prioridade) {
  const prioridadeNome = {
    'ALTA': 'Alta Prioridade',
    'MEDIA': 'Média Prioridade',
    'BAIXA': 'Baixa Prioridade'
  };
  return prioridadeNome[prioridade] || 'Aviso';
}

/**
 * Formatar data
 */
function formatarData(data) {
  if (!data) return '-';
  const dt = new Date(data);
  return dt.toLocaleDateString('pt-AO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ' às ' + dt.toLocaleTimeString('pt-AO', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
