/* ===========================================
   GERENCIAMENTO DE FALTAS - ALUNO
   Integração com API para carregamento de faltas
   =========================================== */

// Garantir que API Service está disponível
if (typeof api === 'undefined') {
  console.error('[FALTAS] APIService não está disponível!');
  const api = new APIService();
}

let faltasData = [];
let disciplinasDisponíveis = new Set();
let estudanteId = null;

document.addEventListener('DOMContentLoaded', function () {
  console.log('[FALTAS] Script carregado');

  // Obter ID do estudante do localStorage
  estudanteId = localStorage.getItem('userId');
  console.log('[FALTAS] Estudante ID:', estudanteId);

  if (!estudanteId) {
    console.error('[FALTAS] ID do estudante não encontrado');
    DataLoader.showError('Erro: Usuário não identificado');
    return;
  }

  // Atualizar informações do usuário no header
  updateUserInfo();

  // Carregar faltas inicialmente
  loadFaltas();

  // Event listener para botão de carregar faltas
  const btnCarregarFaltas = document.getElementById('btnCarregarFaltas');
  if (btnCarregarFaltas) {
    btnCarregarFaltas.addEventListener('click', loadFaltas);
  }
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
 * Carregar faltas da API
 */
async function loadFaltas() {
  try {
    console.log('[FALTAS] Carregando faltas para estudante:', estudanteId);
    
    // Obter filtros selecionados
    const trimestre = document.getElementById('trimestreSelect')?.value || '1';
    const ano = document.getElementById('anoSelect')?.value || '2026';
    const disciplina = document.getElementById('disciplinaSelect')?.value || 'todas';

    // Carregar faltas da API para o estudante atual
    faltasData = await api.getFaltas(estudanteId);
    
    console.log('[FALTAS] Faltas carregadas:', faltasData);

  // Extrair disciplinas únicas para o select
    if (faltasData && faltasData.length > 0) {
      faltasData.forEach(falta => {
        if (falta.disciplina?.descricao_disc) {
          disciplinasDisponíveis.add(falta.disciplina.descricao_disc);
        }
      });

      // Atualizar select de disciplinas
      updateDisciplinaSelect();
    }

    // Renderizar tabela com filtros
    renderFaltasTable(trimestre, ano, disciplina);

    // Atualizar cards de resumo
    updateFaltasStatistics();

  } catch (error) {
    console.error('[FALTAS] Erro ao carregar faltas:', error);
    DataLoader.showError('Erro ao carregar faltas: ' + error.message);
    
    // Mostrar mensagem de erro na tabela
    const tbody = document.getElementById('faltasTableBody');
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Erro ao carregar faltas</td></tr>';
    }
  }
}

/**
 * Atualizar select de disciplinas com dados da API
 */
function updateDisciplinaSelect() {
  const select = document.getElementById('disciplinaSelect');
  if (!select) return;

  // Manter a opção "Todas"
  const currentValue = select.value;
  select.innerHTML = '<option value="todas">Todas</option>';

  // Adicionar disciplinas carregadas
  disciplinasDisponíveis.forEach(disciplina => {
    const option = document.createElement('option');
    option.value = disciplina;
    option.textContent = disciplina;
    select.appendChild(option);
  });

  // Manter valor selecionado se ainda existir
  if (Array.from(select.options).some(opt => opt.value === currentValue)) {
    select.value = currentValue;
  }
}

/**
 * Renderizar tabela de faltas com filtros
 */
function renderFaltasTable(trimestre, ano, disciplina) {
  const tbody = document.getElementById('faltasTableBody');
  if (!tbody) {
    console.warn('[FALTAS] tbody não encontrado');
    return;
  }

  tbody.innerHTML = '';

  if (!faltasData || faltasData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">Nenhuma falta encontrada</td></tr>';
    console.log('[FALTAS] Nenhuma falta carregada');
    return;
  }

  // Filtrar faltas baseado nos critérios selecionados
  let filteredData = faltasData.filter(falta => {
    // Filtrar por trimestre (se houver data)
    if (falta.data_falta) {
      const faltaDate = new Date(falta.data_falta);
      const year = faltaDate.getFullYear();
      
      // Verificar se está no ano correto
      if (year.toString() !== ano) {
        return false;
      }

      // Verificar se está no trimestre correto
      const month = faltaDate.getMonth();
      let faltaTrimestre = 1;
      
      if (month >= 3 && month < 6) faltaTrimestre = 2;
      else if (month >= 6 && month < 9) faltaTrimestre = 3;

      if (faltaTrimestre.toString() !== trimestre) {
        return false;
      }
    }

    // Filtrar por disciplina
    if (disciplina !== 'todas' && falta.disciplina?.descricao_disc !== disciplina) {
      return false;
    }

    return true;
  });

  // Ordenar por data descendente
  filteredData.sort((a, b) => {
    const dateA = new Date(a.data_falta || 0);
    const dateB = new Date(b.data_falta || 0);
    return dateB - dateA;
  });

  if (filteredData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">Nenhuma falta encontrada para os filtros selecionados.</td></tr>';
    return;
  }

  console.log(`[FALTAS] Renderizando ${filteredData.length} faltas`);

  // Agrupar faltas por data e disciplina
  const faltasAgrupadas = {};
  filteredData.forEach(falta => {
    const key = `${falta.data_falta}_${falta.disciplina?.id_disc || 'unknown'}`;
    if (!faltasAgrupadas[key]) {
      faltasAgrupadas[key] = {
        data: falta.data_falta,
        disciplina: falta.disciplina?.descricao_disc || 'Disciplina desconhecida',
        quantidade: 0,
        justificada: falta.tipo_falta === 'JUSTIFICADA',
        status: falta.tipo_falta === 'JUSTIFICADA' ? 'Justificado' : 'Não justificado'
      };
    }
    faltasAgrupadas[key].quantidade++;
  });

  // Renderizar linhas da tabela
  Object.values(faltasAgrupadas).forEach(falta => {
    try {
      const row = document.createElement('tr');
      const statusClass = falta.status === 'Justificado' ? 'badge-success' : 'badge-danger';
      
      // Formatar data
      const dataFormatada = new Date(falta.data).toLocaleDateString('pt-AO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      row.innerHTML = `
        <td>${dataFormatada}</td>
        <td>${falta.disciplina}</td>
        <td class="text-center">${falta.quantidade}</td>
        <td class="text-center"><span class="badge ${statusClass}">${falta.status}</span></td>
      `;
      tbody.appendChild(row);
    } catch (error) {
      console.error('[FALTAS] Erro ao renderizar linha:', error);
    }
  });
}

/**
 * Atualizar estatísticas de faltas
 */
function updateFaltasStatistics() {
  if (!faltasData || faltasData.length === 0) {
    document.getElementById('totalFaltas').textContent = '0';
    document.getElementById('faltasJustificadas').textContent = '0';
    document.getElementById('faltasNaoJustificadas').textContent = '0';
    document.getElementById('assiduidade').textContent = '100%';
    return;
  }

  // Calcular totais
  const total = faltasData.length;
  const justificadas = faltasData.filter(f => f.tipo_falta === 'JUSTIFICADA').length;
  const naoJustificadas = total - justificadas;

  // Assumir 200 aulas no ano (aproximadamente)
  const totalAulasEsperadas = 200;
  const assiduidade = Math.max(0, Math.round(((totalAulasEsperadas - total) / totalAulasEsperadas) * 100));

  // Atualizar elementos
  document.getElementById('totalFaltas').textContent = total;
  document.getElementById('faltasJustificadas').textContent = justificadas;
  document.getElementById('faltasNaoJustificadas').textContent = naoJustificadas;
  document.getElementById('assiduidade').textContent = assiduidade + '%';

  console.log('[FALTAS] Estatísticas atualizadas:', {
    total,
    justificadas,
    naoJustificadas,
    assiduidade
  });
}
