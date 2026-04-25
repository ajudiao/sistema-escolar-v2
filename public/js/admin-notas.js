/* ===========================================
   GERENCIAMENTO DE NOTAS - ADMIN
   Visualiza e aprova pautas de notas
   =========================================== */

if (typeof api === 'undefined') {
  console.error('[ADMIN-NOTAS] APIService não está disponível!');
}

let pautasData = [];
let notasData = [];
let turmasData = [];
let professorData = null;

document.addEventListener('DOMContentLoaded', function () {
  console.log('[ADMIN-NOTAS] Script carregado');

  // Proteger página para ADMIN
  if (typeof AuthHelper !== 'undefined') {
    AuthHelper.checkRole(['ADMINISTRADOR']);
  }

  // Atualizar informações do usuário no header
  updateUserInfo();

  // Carregar dados
  loadPautas();

  // Setup event listeners
  setupEventListeners();
});

/**
 * Atualizar informações do usuário no header
 */
function updateUserInfo() {
  const userName = api.getUserName() || localStorage.getItem('userName') || 'Administrador';
  const headerUserName = document.querySelector('.header-user-name');
  const headerUserRole = document.querySelector('.header-user-role');

  if (headerUserName) headerUserName.textContent = userName;
  if (headerUserRole) headerUserRole.textContent = 'Admin';
}

/**
 * Carregar pautas da API
 */
async function loadPautas() {
  try {
    console.log('[ADMIN-NOTAS] Iniciando carregamento de pautas...');

    // Carregar turmas
    turmasData = await api.getTurmas() || [];
    console.log('[ADMIN-NOTAS] Turmas carregadas:', turmasData?.length ?? 0);

    // Carregar notas
    notasData = await api.getNotas() || [];
    console.log('[ADMIN-NOTAS] Notas carregadas:', notasData?.length ?? 0);

    // Processar pautas por turma/disciplina
    procesarPautas();

    // Renderizar pautas
    renderPautas();

  } catch (erro) {
    console.error('[ADMIN-NOTAS] Erro ao carregar pautas:', erro);
    showNotification('Erro ao carregar pautas: ' + erro.message, 'danger');
  }
}

/**
 * Processar pautas agrupadas por turma e disciplina
 */
function procesarPautas() {
  const pautasMap = {};

  try {
    // Agrupar notas por turma_id + disciplina_id
    notasData.forEach(nota => {
      // Obter referências
      const estudante = nota.estudante;
      const disciplina = nota.disciplina;
      const turma = turmasData.find(t => t.id_turma === nota.turma_id);

      if (!turma || !disciplina) {
        console.warn('[ADMIN-NOTAS] Nota incompleta:', nota);
        return;
      }

      const pautaKey = `${nota.turma_id}-${nota.disciplina_id}`;

      if (!pautasMap[pautaKey]) {
        pautasMap[pautaKey] = {
          id: pautaKey,
          turmaId: nota.turma_id,
          turma: turma,
          disciplina: disciplina,
          trimestre: nota.trimestre_nota || 1,
          status: 'pendente',
          notas: []
        };
      }

      pautasMap[pautaKey].notas.push({
        estudanteId: nota.estudante_id,
        estudante: estudante || { nome_estudante: 'Aluno desconhecido' },
        mac: nota.mac_notas || 0,
        npp: nota.pp_notas || 0,
        npt: nota.pt_notas || 0,
        media: nota.pt_notas > 0 ? ((nota.mac_notas + nota.pp_notas + nota.pt_notas) / 3).toFixed(2) : '-'
      });
    });

    pautasData = Object.values(pautasMap);
    console.log('[ADMIN-NOTAS] Total de pautas processadas:', pautasData?.length ?? 0);

  } catch (erro) {
    console.error('[ADMIN-NOTAS] Erro ao processar pautas:', erro);
    pautasData = [];
  }
}

/**
 * Renderizar pautas na página
 */
function renderPautas() {
  const pageContent = document.querySelector('.page-content .row.g-4');
  
  if (!pageContent) {
    console.error('[ADMIN-NOTAS] Container de conteúdo não encontrado');
    return;
  }

  // Remover cards antigos (deixar apenas o primeiro header)
  const cards = pageContent.querySelectorAll('.col-lg-6');
  cards.forEach(card => card.remove());

  if (!pautasData || pautasData.length === 0) {
    pageContent.innerHTML += `
      <div class="col-12">
        <div class="alert alert-info">Nenhuma pauta disponível no momento.</div>
      </div>
    `;
    return;
  }

  // Renderizar cada pauta
  pautasData.forEach((pauta, index) => {
    const pautaCard = document.createElement('div');
    pautaCard.className = 'col-lg-6';
    pautaCard.dataset.pautaId = pauta.id;

    const disciplinaName = pauta.disciplina?.descricao_disc || pauta.disciplina?.sigla_disc || 'Disciplina';
    const turmaName = pauta.turma?.sigla_turma || 'Turma';
    const trimestreText = `${pauta.trimestre}º Trimestre`;

    // Gerar linhas da tabela
    const notasHtml = pauta.notas.map(nota => `
      <tr>
        <td>${nota.estudante?.nome_estudante || 'Aluno desconhecido'}</td>
        <td class="text-end">${nota.media}</td>
      </tr>
    `).join('');

    pautaCard.innerHTML = `
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 class="card-title mb-1">Pauta - ${disciplinaName}</h5>
              <p class="text-muted mb-0">${turmaName} • ${trimestreText}</p>
            </div>
            <span class="badge bg-warning status-badge">Pendente</span>
          </div>
          <div class="table-responsive mb-3">
            <table class="table table-sm mb-0">
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th class="text-end">Média</th>
                </tr>
              </thead>
              <tbody>
                ${notasHtml}
              </tbody>
            </table>
          </div>
          <div class="d-flex gap-2">
            <a href="notas-detalhes.html?pautaId=${pauta.id}" class="btn btn-outline-primary btn-sm">Ver Detalhes</a>
            <button class="btn btn-success btn-sm btn-aprovar" data-pauta-id="${pauta.id}">Aprovar</button>
            <button class="btn btn-danger btn-sm btn-recusar" data-pauta-id="${pauta.id}">Recusar</button>
          </div>
        </div>
      </div>
    `;

    pageContent.appendChild(pautaCard);
  });

  // Reconfigurar event listeners para novos botões
  setupEventListeners();

  showNotification(`${pautasData.length} pauta(s) carregada(s).`, 'success');
}

/**
 * Configurar event listeners
 */
function setupEventListeners() {
  // Botões aprovar
  document.querySelectorAll('.btn-aprovar').forEach(button => {
    button.addEventListener('click', async function () {
      const pautaId = this.dataset.pautaId;
      await aprovarPauta(pautaId, this);
    });
  });

  // Botões recusar
  document.querySelectorAll('.btn-recusar').forEach(button => {
    button.addEventListener('click', async function () {
      const pautaId = this.dataset.pautaId;
      await recusarPauta(pautaId, this);
    });
  });
}

/**
 * Aprovar pauta
 */
async function aprovarPauta(pautaId, buttonElement) {
  try {
    console.log('[ADMIN-NOTAS] Aprovando pauta:', pautaId);

    // Atualizar UI
    const card = buttonElement.closest('.card');
    const badge = card.querySelector('.status-badge');
    
    badge.className = 'badge bg-success status-badge';
    badge.textContent = 'Aprovado';
    
    // Desabilitar botões
    buttonElement.disabled = true;
    card.querySelector('.btn-recusar').disabled = true;

    showNotification('Pauta aprovada com sucesso!', 'success');

  } catch (erro) {
    console.error('[ADMIN-NOTAS] Erro ao aprovar pauta:', erro);
    showNotification('Erro ao aprovar pauta: ' + erro.message, 'danger');
  }
}

/**
 * Recusar pauta
 */
async function recusarPauta(pautaId, buttonElement) {
  try {
    console.log('[ADMIN-NOTAS] Recusando pauta:', pautaId);

    // Atualizar UI
    const card = buttonElement.closest('.card');
    const badge = card.querySelector('.status-badge');
    
    badge.className = 'badge bg-danger status-badge';
    badge.textContent = 'Recusado';
    
    // Desabilitar botões
    buttonElement.disabled = true;
    card.querySelector('.btn-aprovar').disabled = true;

    showNotification('Pauta recusada!', 'warning');

  } catch (erro) {
    console.error('[ADMIN-NOTAS] Erro ao recusar pauta:', erro);
    showNotification('Erro ao recusar pauta: ' + erro.message, 'danger');
  }
}

/**
 * Mostrar notificação
 */
function showNotification(message, type = 'success') {
  const existingNotification = document.querySelector('.alert:not(.alert-info)');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `alert alert-${type} alert-dismissible fade show`;
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  const pageContent = document.querySelector('.page-content');
  if (pageContent) {
    const header = pageContent.querySelector('.page-header');
    if (header) {
      header.after(notification);
    } else {
      pageContent.insertBefore(notification, pageContent.firstChild);
    }

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
}
