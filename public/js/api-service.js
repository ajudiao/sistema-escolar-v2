/* ===========================================
   API Service - Sistema de Escola Conectada
   Conecta o frontend com o backend NestJS
   =========================================== */

class APIService {
  constructor() {
    this.baseURL = 'http://localhost:3000/api/v1';
    this.token = this.getToken();
  }

  /**
   * Obtém o token armazenado no localStorage
   */
  getToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Define o token no localStorage
   */
  setToken(token) {
    localStorage.setItem('authToken', token);
    this.token = token;
  }

  /**
   * Remove o token do localStorage
   */
  clearToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.token = null;
  }

  /**
   * Headers padrão para requisições
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Faz uma requisição genérica
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Se retornar 401 (não autorizado), fazer logout
      if (response.status === 401) {
        this.clearToken();
        window.location.href = '/index.html';
        throw new Error('Sessão expirada. Faça login novamente.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Erro ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Erro de API:', error);
      throw error;
    }
  }

  /**
   * GET - Obter recurso
   */
  async get(endpoint) {
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  /**
   * POST - Criar recurso
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT - Atualizar recurso
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE - Deletar recurso
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // ============= AUTH ENDPOINTS =============

  /**
   * Login - POST /usuarios/login
   */
  async login(email, password) {
    const response = await this.post('/usuarios/login', {
      email,
      password,
    });

    if (response.access_token) {
      this.setToken(response.access_token);
      // Armazenar dados do utilizador
      if (response) {
        if (response.id_usuario) localStorage.setItem('userId', response.id_usuario);
        if (response.id) localStorage.setItem('userId', response.id);
        localStorage.setItem('userRole', response.perfil || 'ADMIN');
        localStorage.setItem('userName', response.user_name || 'Utilizador');
        localStorage.setItem('userEmail', response.email || '');
      }
    }

    return response;
  }

  /**
   * Logout
   */
  logout() {
    this.clearToken();
  }

  // ============= USUARIOS ENDPOINTS =============

  /**
   * Listar todos os utilizadores
   */
  async getUsuarios() {
    return this.get('/usuarios');
  }

  /**
   * Obter utilizador por ID
   */
  async getUsuario(id) {
    return this.get(`/usuarios/${id}`);
  }

  /**
   * Criar novo utilizador
   */
  async createUsuario(data) {
    return this.post('/usuarios', data);
  }

  /**
   * Deletar utilizador
   */
  async deleteUsuario(id) {
    return this.delete(`/usuarios/${id}`);
  }

  // ============= ESTUDANTES ENDPOINTS =============

  /**
   * Listar estudantes com filtros opcionais
   */
  async getEstudantes(turmaId = null, classe = null, status = null) {
    let endpoint = '/estudantes';
    const params = new URLSearchParams();

    if (turmaId) params.append('turmaId', turmaId);
    if (classe) params.append('classe', classe);
    if (status) params.append('status', status);

    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    return this.get(endpoint);
  }

  /**
   * Obter estudante por ID
   */
  async getEstudante(id) {
    return this.get(`/estudantes/${id}`);
  }

  /**
   * Criar novo estudante
   */
  async createEstudante(data) {
    return this.post('/estudantes', data);
  }

  /**
   * Atualizar estudante
   */
  async updateEstudante(id, data) {
    return this.put(`/estudantes/${id}`, data);
  }

  /**
   * Desativar estudante
   */
  async deleteEstudante(id) {
    return this.delete(`/estudantes/${id}`);
  }

  // ============= PROFESSORES ENDPOINTS =============

  /**
   * Listar professores
   */
  async getProfessores() {
    return this.get('/professores');
  }

  /**
   * Obter professor por ID
   */
  async getProfessor(id) {
    return this.get(`/professores/${id}`);
  }

  /**
   * Obter professor por usuário ID (para o professor logado)
   */
  async getProfessorByUsuario(usuarioId) {
    return this.get(`/professores/usuario/${usuarioId}`);
  }

  /**
   * Criar novo professor
   */
  async createProfessor(data) {
    return this.post('/professores', data);
  }

  /**
   * Atualizar professor
   */
  async updateProfessor(id, data) {
    return this.put(`/professores/${id}`, data);
  }

  /**
   * Deletar professor
   */
  async deleteProfessor(id) {
    return this.delete(`/professores/${id}`);
  }

  // ============= TURMAS ENDPOINTS =============

  /**
   * Listar turmas
   */
  async getTurmas() {
    return this.get('/turmas');
  }

  /**
   * Obter turma por ID
   */
  async getTurma(id) {
    return this.get(`/turmas/${id}`);
  }

  /**
   * Criar nova turma
   */
  async createTurma(data) {
    return this.post('/turmas', data);
  }

  /**
   * Atualizar turma
   */
  async updateTurma(id, data) {
    return this.put(`/turmas/${id}`, data);
  }

  /**
   * Deletar turma
   */
  async deleteTurma(id) {
    return this.delete(`/turmas/${id}`);
  }

  /**
   * Obter turmas de um professor
   */
  async getTurmasProfessor(professorId) {
    return this.get(`/turmas/professor/${professorId}`);
  }

  // ============= DISCIPLINAS ENDPOINTS =============

  /**
   * Listar disciplinas
   */
  async getDisciplinas() {
    return this.get('/disciplinas');
  }

  /**
   * Obter disciplina por ID
   */
  async getDisciplina(id) {
    return this.get(`/disciplinas/${id}`);
  }

  /**
   * Criar nova disciplina
   */
  async createDisciplina(data) {
    return this.post('/disciplinas', data);
  }

  /**
   * Atualizar disciplina
   */
  async updateDisciplina(id, data) {
    return this.put(`/disciplinas/${id}`, data);
  }

  /**
   * Deletar disciplina
   */
  async deleteDisciplina(id) {
    return this.delete(`/disciplinas/${id}`);
  }

  // ============= CURSOS ENDPOINTS =============

  /**
   * Listar cursos
   */
  async getCursos() {
    return this.get('/cursos');
  }

  /**
   * Obter curso por ID
   */
  async getCurso(id) {
    return this.get(`/cursos/${id}`);
  }

  /**
   * Criar novo curso
   */
  async createCurso(data) {
    return this.post('/cursos', data);
  }

  /**
   * Atualizar curso
   */
  async updateCurso(id, data) {
    return this.put(`/cursos/${id}`, data);
  }

  /**
   * Deletar curso
   */
  async deleteCurso(id) {
    return this.delete(`/cursos/${id}`);
  }

  // ============= NOTAS ENDPOINTS =============

  /**
   * Listar notas com filtros opcionais
   */
  async getNotas(estudanteId = null, disciplinaId = null) {
    let endpoint = '/notas';
    const params = new URLSearchParams();

    if (estudanteId) params.append('estudanteId', estudanteId);
    if (disciplinaId) params.append('disciplinaId', disciplinaId);

    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    return this.get(endpoint);
  }

  /**
   * Obter nota por ID
   */
  async getNota(id) {
    return this.get(`/notas/${id}`);
  }

  /**
   * Criar nova nota
   */
  async createNota(data) {
    return this.post('/notas', data);
  }

  /**
   * Atualizar nota
   */
  async updateNota(id, data) {
    return this.put(`/notas/${id}`, data);
  }

  /**
   * Deletar nota
   */
  async deleteNota(id) {
    return this.delete(`/notas/${id}`);
  }

  // ============= FALTAS ENDPOINTS =============

  /**
   * Listar faltas
   */
  async getFaltas(estudanteId = null, disciplinaId = null) {
    let endpoint = '/faltas';
    const params = new URLSearchParams();

    if (estudanteId) params.append('estudanteId', estudanteId);
    if (disciplinaId) params.append('disciplinaId', disciplinaId);

    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    return this.get(endpoint);
  }

  /**
   * Obter falta por ID
   */
  async getFalta(id) {
    return this.get(`/faltas/${id}`);
  }

  /**
   * Criar nova falta
   */
  async createFalta(data) {
    return this.post('/faltas', data);
  }

  /**
   * Atualizar falta
   */
  async updateFalta(id, data) {
    return this.put(`/faltas/${id}`, data);
  }

  /**
   * Deletar falta
   */
  async deleteFalta(id) {
    return this.delete(`/faltas/${id}`);
  }

  // ============= AVISOS ENDPOINTS =============

  /**
   * Listar avisos
   */
  async getAvisos(tipo = null) {
    let endpoint = '/avisos';
    if (tipo) {
      endpoint += `?tipo=${tipo}`;
    }
    return this.get(endpoint);
  }

  /**
   * Obter aviso por ID
   */
  async getAviso(id) {
    return this.get(`/avisos/${id}`);
  }

  /**
   * Criar novo aviso
   */
  async createAviso(data) {
    return this.post('/avisos', data);
  }

  /**
   * Atualizar aviso
   */
  async updateAviso(id, data) {
    return this.put(`/avisos/${id}`, data);
  }

  /**
   * Deletar aviso
   */
  async deleteAviso(id) {
    return this.delete(`/avisos/${id}`);
  }

  // ============= VERIFICAR AUTENTICAÇÃO =============

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated() {
    return !!this.token;
  }

  /**
   * Obtém o role do usuário logado
   */
  getUserRole() {
    return localStorage.getItem('userRole');
  }

  /**
   * Obtém o ID do usuário logado
   */
  getUserId() {
    return localStorage.getItem('userId');
  }

  /**
   * Obtém o nome do usuário logado
   */
  getUserName() {
    return localStorage.getItem('userName');
  }
}

// Instância global do serviço
const api = new APIService();
