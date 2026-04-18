// ============= GERENCIAMENTO DE ALUNOS =============

// Garantir que API Service está disponível
if (typeof api === 'undefined') {
  console.error('[ALUNOS] APIService não está disponível!');
  const api = new APIService();
}

let cursosData = [];
let turmasData = [];
let alunosData = [];

document.addEventListener('DOMContentLoaded', function () {
  console.log('[ALUNOS] Script carregado');

  // Carregar alunos e renderizar tabela
  async function loadAlunos() {
    try {
      console.log('[ALUNOS] Carregando alunos...');
      alunosData = await api.getEstudantes();
      console.log('[ALUNOS] Alunos carregados:', alunosData);
      renderAlunosTable(alunosData);
    } catch (error) {
      console.error('[ALUNOS] Erro ao carregar alunos:', error);
      DataLoader.showError('Erro ao carregar alunos: ' + error.message);
    }
  }

  // Renderizar tabela de alunos
  function renderAlunosTable(alunos) {
    const tbody = document.getElementById('alunosTableBody');
    if (!tbody) {
      console.warn('[ALUNOS] tbody não encontrado');
      return;
    }
    
    tbody.innerHTML = '';

    if (!alunos || alunos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">Nenhum aluno encontrado</td></tr>';
      console.log('[ALUNOS] Nenhum aluno na lista');
      return;
    }

    console.log(`[ALUNOS] Renderizando ${alunos.length} alunos`);
    alunos.forEach(aluno => {
      try {
        const row = document.createElement('tr');
        const curso = aluno.turma?.curso?.descricao_curso || '-';
        row.innerHTML = `
          <td>${aluno.nome_estudante || '-'}</td>
          <td>${curso}</td>
          <td>${aluno.turma?.sigla_turma || '-'}</td>
          <td>${aluno.telefone_estudante || '-'}</td>
          <td>
            <button class="btn btn-sm btn-outline-info me-1 btn-view" data-id="${aluno.id_estudante}" data-bs-toggle="modal" data-bs-target="#alunoDetailsModal">Ver</button>
            <button class="btn btn-sm btn-outline-warning me-1 btn-edit" data-id="${aluno.id_estudante}" data-name="${aluno.nome_estudante}">Editar</button>
            <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${aluno.id_estudante}" data-name="${aluno.nome_estudante}">Deletar</button>
          </td>
        `;
        tbody.appendChild(row);
      } catch (error) {
        console.error('[ALUNOS] Erro ao renderizar linha:', error);
      }
    });
  }

  // Carregar cursos
  async function loadCursos() {
    try {
      cursosData = await api.getCursos();
      const select = document.getElementById('alunoCurso');
      if (!select) return;
      select.innerHTML = '<option value="">Selecionar Curso (Opcional)</option>';
      cursosData.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.id_curso;
        option.textContent = curso.descricao_curso || 'Curso sem nome';
        select.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    }
  }

  // Carregar turmas
  async function loadTurmas() {
    try {
      turmasData = await api.getTurmas();
      console.log('Turmas carregadas:', turmasData);
      renderAllTurmas();
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
    }
  }

  // Renderizar todas as turmas inicialmente
  function renderAllTurmas() {
    const turmaSelect = document.getElementById('alunoTurma');
    if (!turmaSelect) return;
    
    turmaSelect.innerHTML = '<option value="">Selecionar Turma</option>';
    turmasData.forEach(turma => {
      const option = document.createElement('option');
      option.value = turma.id_turma;
      option.textContent = `${turma.sigla_turma} (${turma.classe_turma}) - ${turma.turno_turma}`;
      turmaSelect.appendChild(option);
    });
  }

  // Atualizar turmas quando curso é selecionado
  const cursoSelect = document.getElementById('alunoCurso');
  if (cursoSelect) {
    cursoSelect.addEventListener('change', function() {
      const cursoId = parseInt(this.value) || 0;
      const turmaSelect = document.getElementById('alunoTurma');
      
      if (cursoId) {
        // Filtrar turmas do curso selecionado
        const turmasCurso = turmasData.filter(t => t.curso_id === cursoId);
        turmaSelect.innerHTML = '<option value="">Selecionar Turma</option>';
        turmasCurso.forEach(turma => {
          const option = document.createElement('option');
          option.value = turma.id_turma;
          option.textContent = `${turma.sigla_turma} (${turma.classe_turma}) - ${turma.turno_turma}`;
          turmaSelect.appendChild(option);
        });
      } else {
        renderAllTurmas();
      }
    });
  }

  function showFlashMessage(message, type = 'success') {
    const flash = document.getElementById('flashMessage');
    if (!flash) return;
    flash.textContent = message;
    flash.className = `alert alert-${type}`;
    flash.style.display = 'block';
    setTimeout(() => {
      flash.style.display = 'none';
    }, 5000);
  }

  // Toggle escola anterior
  const alunoTransferido = document.getElementById('alunoTransferido');
  if (alunoTransferido) {
    alunoTransferido.addEventListener('change', function () {
      const escolaDiv = document.getElementById('escolaAnterior');
      if (escolaDiv) {
        escolaDiv.style.display = this.checked ? 'block' : 'none';
      }
    });
  }

  // Carregar dados ao abrir modal
  const alunoModalEl = document.getElementById('alunoModal');
  if (alunoModalEl) {
    alunoModalEl.addEventListener('show.bs.modal', function() {
      const alunoId = document.getElementById('alunoId').value;
      const action = document.getElementById('alunoAction').value;
      
      // Se for novo aluno, mostrar seção de senha/email
      if (!alunoId || action === 'add') {
        const senhaSection = document.getElementById('alunoSenha')?.parentElement?.parentElement;
        if (senhaSection) senhaSection.style.display = 'block';
      }
      
      loadCursos();
      loadTurmas();
    });
  }

  // Iniciar carregamento ao abrir a página
  loadAlunos();
  loadCursos();
  loadTurmas();

  // Fechar o modal
  if (alunoModalEl) {
    alunoModalEl.addEventListener('hidden.bs.modal', function () {
      document.getElementById('alunoModalTitle').textContent = 'Novo Aluno';
      document.getElementById('formAluno').reset();
      document.getElementById('alunoId').value = '';
      document.getElementById('alunoAction').value = 'add';
      const senhaSection = document.getElementById('alunoSenha')?.parentElement?.parentElement;
      if (senhaSection) senhaSection.style.display = 'block';
    });
  }

  // Event delegation para botões da tabela
  const tbody = document.getElementById('alunosTableBody');
  if (tbody) {
    tbody.addEventListener('click', function(e) {
      const btn = e.target.closest('button');
      if (!btn) return;
      
      const id = btn.getAttribute('data-id');
      if (!id) return;
      
      if (btn.classList.contains('btn-view')) {
        // Ver detalhes - buscar dados completos do servidor
        console.log('[ALUNOS] Carregando detalhes do aluno ID:', id);
        DataLoader.showLoading('Carregando detalhes...');
        
        api.getEstudante(id)
          .then(alunoData => {
            DataLoader.hideLoading();
            
            const curso = alunoData.turma?.curso?.descricao_curso || '-';
            const turma = alunoData.turma?.sigla_turma || '-';
            
            document.getElementById('detailNome').textContent = alunoData.nome_estudante || '-';
            document.getElementById('detailCurso').textContent = curso;
            document.getElementById('detailTurma').textContent = turma;
            document.getElementById('detailTelefone').textContent = alunoData.telefone_estudante || '-';
            
            console.log('[ALUNOS] Detalhes carregados:', alunoData);
          })
          .catch(error => {
            DataLoader.hideLoading();
            DataLoader.showError('Erro ao carregar detalhes: ' + error.message);
            console.error('[ALUNOS] Erro ao carregar detalhes:', error);
          });
      } else if (btn.classList.contains('btn-edit')) {
        // Editar - carregar dados do aluno
        console.log('[ALUNOS] Carregando dados para edição, ID:', id);
        DataLoader.showLoading('Carregando dados...');
        
        api.getEstudante(id)
          .then(alunoData => {
            DataLoader.hideLoading();
            
            document.getElementById('alunoModalTitle').textContent = 'Editar Aluno';
            document.getElementById('alunoId').value = id;
            document.getElementById('alunoAction').value = 'edit';
            
            // Preencher formulário com dados do aluno
            document.getElementById('alunoNome').value = alunoData.nome_estudante || '';
            document.getElementById('alunoDataNascimento').value = alunoData.data_nascimento ? alunoData.data_nascimento.split('T')[0] : '';
            document.getElementById('alunoIdentidade').value = alunoData.numero_bi_estudante || '';
            document.getElementById('alunoTelefone').value = alunoData.telefone_estudante || '';
            document.getElementById('alunoNaturalidade').value = alunoData.naturalidade_estudante || '';
            document.getElementById('encarregadoNome').value = alunoData.encarregado_estudante || '';
            
            // Definir curso e turma
            if (alunoData.turma?.curso?.id_curso) {
              document.getElementById('alunoCurso').value = alunoData.turma.curso.id_curso;
            }
            if (alunoData.turma?.id_turma) {
              document.getElementById('alunoTurma').value = alunoData.turma.id_turma;
            }
            
            // Ocultar campo de email e senha em modo edição
            const senhaSection = document.getElementById('alunoSenha')?.parentElement?.parentElement;
            if (senhaSection) senhaSection.style.display = 'none';
            
            // Abrir modal manualmente
            const modal = new bootstrap.Modal(document.getElementById('alunoModal'));
            modal.show();
            
            console.log('[ALUNOS] Dados carregados para edição:', alunoData);
          })
          .catch(error => {
            DataLoader.hideLoading();
            DataLoader.showError('Erro ao carregar aluno: ' + error.message);
            console.error('[ALUNOS] Erro ao carregar aluno:', error);
          });
      } else if (btn.classList.contains('btn-delete')) {
        // Deletar com confirmação
        const nome = btn.getAttribute('data-name');
        if (confirm(`Deseja realmente deletar o aluno ${nome}?`)) {
          console.log('[ALUNOS] Deletando aluno ID:', id);
          DataLoader.showLoading('Deletando aluno...');
          api.deleteEstudante(id)
            .then(() => {
              DataLoader.hideLoading();
              DataLoader.showSuccess('Aluno deletado com sucesso!');
              loadAlunos();
            })
            .catch(error => {
              DataLoader.hideLoading();
              DataLoader.showError('Erro ao deletar: ' + error.message);
            });
        }
      }
    });
  }

  // Submit do formulário
  const formAluno = document.getElementById('formAluno');
  if (formAluno) {
    formAluno.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = formAluno.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

      const tipoDocumento = document.querySelector('input[name="tipoDocumento"]:checked').value;
      const turmaValue = document.getElementById('alunoTurma').value;
      
      // Converter data para ISO-8601 DateTime
      const dataNascimentoInput = document.getElementById('alunoDataNascimento').value;
      const dataNascimento = dataNascimentoInput ? new Date(dataNascimentoInput + 'T00:00:00Z').toISOString() : null;
      
      const data = {
        nome_estudante: document.getElementById('alunoNome').value,
        data_nascimento: dataNascimento,
        numero_bi_estudante: document.getElementById('alunoIdentidade').value,
        telefone_estudante: document.getElementById('alunoTelefone').value,
        endereco_fisico_estudante: [
          document.getElementById('alunoRua').value,
          document.getElementById('alunoBairro').value,
          document.getElementById('alunoCidade').value
        ].filter(x => x).join(', ') || 'Não especificado',
        naturalidade_estudante: document.getElementById('alunoNaturalidade').value,
        encarregado_estudante: document.getElementById('encarregadoNome').value,
        turma_id: turmaValue ? parseInt(turmaValue) : null,
        status: 'ATIVO'
      };

      try {
        const alunoId = document.getElementById('alunoId').value;
        const action = document.getElementById('alunoAction').value;
        
        DataLoader.showLoading(action === 'edit' ? 'Atualizando aluno...' : 'Criando aluno...');

        if (action === 'edit' && alunoId) {
          await api.updateEstudante(alunoId, data);
          showFlashMessage('Aluno atualizado com sucesso!');
        } else {
          // Se for novo aluno, precisa de email, password, user_name
          const newData = {
            ...data,
            email: document.getElementById('alunoEmail').value,
            password: document.getElementById('alunoSenha').value,
            user_name: document.getElementById('alunoNome').value.toLowerCase()
          };
          await api.createEstudante(newData);
          showFlashMessage('Aluno criado com sucesso!');
        }

        DataLoader.hideLoading();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Guardar';
        bootstrap.Modal.getInstance(document.getElementById('alunoModal')).hide();
        
        // Recarregar lista de alunos
        loadAlunos();
      } catch (error) {
        DataLoader.hideLoading();
        DataLoader.showError('Erro: ' + (error.message || 'Erro desconhecido'));
        console.error('Erro API:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Guardar';
      }
    });
  }

  //Filter functionality
  const btnFilter = document.getElementById('btnFilterAluno');
  if (btnFilter) {
    btnFilter.addEventListener('click', function () {
      const searchValue = document.getElementById('filterAlunoSearch').value.toLowerCase();
      const turmaValue = document.getElementById('filterAlunoTurma').value;

      const rows = document.querySelectorAll('#alunosTableBody tr');
      rows.forEach(row => {
        const nome = row.cells[0].textContent.toLowerCase();
        const processo = row.cells[1].textContent.toLowerCase();
        const turma = row.cells[2].textContent;

        const matchesSearch = !searchValue || nome.includes(searchValue) || processo.includes(searchValue);
        const matchesTurma = !turmaValue || turma === turmaValue;

        row.style.display = matchesSearch && matchesTurma ? '' : 'none';
      });
    });
  }
});
