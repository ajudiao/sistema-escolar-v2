/* ===========================================
   GERENCIAMENTO DE AVISOS - ALUNO
   Carrega avisos destinados ao aluno
   =========================================== */

if (typeof api === 'undefined') {
  console.error('[AVISOS] APIService não está disponível!');
}

let avisosData = [];

/**
 * GERENCIAR AVISOS LIDOS NO LOCALSTORAGE
 */
function getAvisosLidosDoLocalStorage() {
  const avisosLidos = localStorage.getItem('avisosLidos');
  console.log('%c[STORAGE] Lendo avisosLidos do localStorage:', 'color: purple;', avisosLidos);
  return avisosLidos ? JSON.parse(avisosLidos) : [];
}

function salvarAvisoComoLidoNoLocalStorage(avisoId) {
  // Converter para número para garantir consistência
  const id = parseInt(avisoId, 10);
  console.log('%c[STORAGE] Tentando guardar aviso como lido - ID:', 'color: purple;', id, '(tipo:', typeof id + ')');
  
  const avisosLidos = getAvisosLidosDoLocalStorage();
  
  if (!avisosLidos.includes(id)) {
    avisosLidos.push(id);
    localStorage.setItem('avisosLidos', JSON.stringify(avisosLidos));
    console.log('%c[STORAGE] Aviso guardado! Lista atual:', 'color: green;', avisosLidos);
  } else {
    console.log('%c[STORAGE] Aviso já estava na lista:', 'color: orange;', avisosLidos);
  }
}

function verificarSeAvisoEstaLido(avisoId) {
  // Converter para número para garantir consistência
  const id = parseInt(avisoId, 10);
  const avisosLidos = getAvisosLidosDoLocalStorage();
  const estaLido = avisosLidos.includes(id);
  console.log('%c[STORAGE] Verificando se aviso %d está lido:', 'color: purple;', id, estaLido, '| Lista:', avisosLidos);
  return estaLido;
}

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
    const prioridadesUnicas = [...new Set(avisosData.map(a => a.prioridade || 'MEDIA'))];
    const filtroPrioridade = document.getElementById('filtroPrioridade');
    if (filtroPrioridade) {
      prioridadesUnicas.forEach(prioridade => {
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

  console.log('%c[AVISOS] Iniciando renderização com', 'color: blue; font-weight: bold;', avisos.length, 'avisos');
  console.log('%c[AVISOS] Avisos lidos no localStorage:', 'color: purple;', getAvisosLidosDoLocalStorage());

  avisos.forEach((aviso, index) => {
    const prioridade = aviso.prioridade || 'MEDIA';
    const badgeClass = getClassesPrioridade(prioridade);
    const nomePri = nomePrioridade(prioridade);
    
    // Verificar se o aviso já foi lido
    const jaLido = verificarSeAvisoEstaLido(aviso.id);
    const status = jaLido ? 'lido' : 'nao_lido';
    console.log(`%c[AVISOS] Aviso ${index + 1} (ID: ${aviso.id}) - Já lido: ${jaLido}`, 'color: ' + (jaLido ? 'green' : 'orange') + ';');

    const avisoCard = document.createElement('div');
    avisoCard.className = `aviso-card ${badgeClass} aviso-${status}`;
    avisoCard.dataset.prioridade = prioridade;
    avisoCard.dataset.status = status;
    avisoCard.dataset.id = aviso.id;

    const dataFormatada = formatarData(aviso.data_publicacao || aviso.created_at);
    
    // Se já está lido, não mostrar o botão "Marcar como Lido"
    const badgeStatus = status === 'nao_lido' ? 'badge-warning' : 'badge-secondary';
    const nomeStatus = status === 'nao_lido' ? 'Não Lido' : 'Lido';
    const botaoMarcarLido = jaLido 
      ? `<span class="text-muted small">Lido em ${new Date().toLocaleDateString('pt-AO')}</span>`
      : `<button class="btn btn-sm btn-outline-primary btn-marcar-lido" data-id="${aviso.id}">Marcar como Lido</button>`;

    avisoCard.innerHTML = `
      <div class="aviso-header">
        <div class="aviso-badges">
          <span class="badge ${badgeClass}">${nomePri}</span>
          <span class="badge ${badgeStatus}">${nomeStatus}</span>
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
        ${botaoMarcarLido}
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
  const statusSelecionado = document.getElementById('filtroStatus')?.value || '';
  const termoBusca = document.getElementById('buscaAviso')?.value.toLowerCase().trim() || '';
  const avisos = document.querySelectorAll('.aviso-card');

  avisos.forEach(aviso => {
    const prioridade = aviso.dataset.prioridade;
    const status = aviso.dataset.status;
    const titulo = aviso.querySelector('.aviso-titulo')?.textContent.toLowerCase() || '';
    const conteudo = aviso.querySelector('.aviso-texto')?.textContent.toLowerCase() || '';

    const matchPrioridade = !prioridadeSelecionada || prioridade === prioridadeSelecionada;
    const matchStatus = !statusSelecionado || status === statusSelecionado;
    const matchBusca = !termoBusca || titulo.includes(termoBusca) || conteudo.includes(termoBusca);

    aviso.style.display = matchPrioridade && matchStatus && matchBusca ? 'block' : 'none';
  });
}

/**
 * Configurar event listeners
 */
function setupEventListeners() {
  const btnFiltrar = document.getElementById('btnFiltrar');
  const filtroPrioridade = document.getElementById('filtroPrioridade');
  const filtroStatus = document.getElementById('filtroStatus');
  const buscaAviso = document.getElementById('buscaAviso');

  if (btnFiltrar) {
    btnFiltrar.addEventListener('click', filtrarAvisos);
  }

  if (filtroPrioridade) {
    filtroPrioridade.addEventListener('change', filtrarAvisos);
  }

  if (filtroStatus) {
    filtroStatus.addEventListener('change', filtrarAvisos);
  }

  if (buscaAviso) {
    buscaAviso.addEventListener('input', filtrarAvisos);
  }

  // Event listener para marcar como lido
  document.addEventListener('click', function (e) {
    // Encontrar o botão clicado (importante para quando SVG é clicado)
    const btnMarcarLido = e.target.closest('.btn-marcar-lido');
    if (btnMarcarLido) {
      const avisoId = btnMarcarLido.dataset.id;
      console.log('%c[AVISOS] Clique capturado - ID do aviso:', 'color: blue;', avisoId);
      marcarComoLido(avisoId);
    }
  });
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

/**
 * Marcar aviso como lido
 */
async function marcarComoLido(avisoId) {
  console.log('%c[AVISOS] Marcando aviso como lido - ID:', 'color: blue; font-weight: bold;', avisoId);
  
  if (!avisoId) {
    console.error('%c[AVISOS] Erro: ID do aviso está vazio!', 'color: red;');
    return;
  }
  
  // Selecionar o card específico pelo data-id
  const aviso = document.querySelector(`[data-id="${avisoId}"]`);
  
  if (!aviso) {
    console.error('%c[AVISOS] Erro: Aviso não encontrado no DOM!', 'color: red;', `ID procurado: ${avisoId}`);
    return;
  }

  console.log('%c[AVISOS] Aviso encontrado:', 'color: green;', aviso);

  try {
    console.log('%c[AVISOS] Iniciando processo de marcar como lido...', 'color: blue;');
    
    // Tentar chamar a API se disponível
    if (typeof api !== 'undefined' && api.marcarAvisoComoLido) {
      try {
        await api.marcarAvisoComoLido(avisoId);
        console.log('%c[AVISOS] Aviso marcado como lido na API', 'color: green;');
      } catch (apiError) {
        console.warn('%c[AVISOS] Aviso marcado localmente (API indisponível)', 'color: orange;', apiError);
      }
    }
    
    // Salvar no localStorage
    salvarAvisoComoLidoNoLocalStorage(avisoId);
    console.log('%c[AVISOS] localStorage após guardar:', 'color: blue;', getAvisosLidosDoLocalStorage());
    
    // Atualizar UI imediatamente
    aviso.dataset.status = 'lido';
    aviso.classList.remove('aviso-nao_lido');
    aviso.classList.add('aviso-lido');

    const badgesContainer = aviso.querySelector('.aviso-badges');
    const badgeNaoLido = badgesContainer.querySelector('.badge-warning');
    
    if (badgeNaoLido) {
      badgeNaoLido.textContent = 'Lido';
      badgeNaoLido.className = 'badge badge-secondary';
    }

    const footer = aviso.querySelector('.aviso-footer');
    const btnMarcarLido = footer.querySelector('.btn-marcar-lido');
    if (btnMarcarLido) {
      btnMarcarLido.remove();
    }

    const dataLeitura = document.createElement('span');
    dataLeitura.className = 'text-muted small';
    dataLeitura.textContent = `Lido em ${new Date().toLocaleDateString('pt-AO')}`;
    footer.appendChild(dataLeitura);

    console.log('%c[AVISOS] Aviso marcado com sucesso!', 'color: green; font-weight: bold;');
    
  } catch (erro) {
    console.error('%c[AVISOS] Erro ao marcar lido:', 'color: red;', erro);
  }
}
