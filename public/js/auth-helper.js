/* ===========================================
   Auth Helper - Gerenciar Autenticação
   =========================================== */

class AuthHelper {
  /**
   * Verifica se o usuário está autenticado
   * Se não estiver, redireciona para login
   */
  static checkAuth() {
    if (!api.isAuthenticated()) {
      window.location.href = '/index.html';
    }
  }

  /**
   * Verifica se o usuário tem um role específico
   * Se não tiver, redireciona para login
   */
  static checkRole(allowedRoles) {
    this.checkAuth();
    
    const userRole = api.getUserRole();
    if (!allowedRoles.includes(userRole)) {
      alert('Acesso negado. Você não tem permissão para acessar esta página.');
      this.logout(); // Fazer logout automático
    }
  }

  /**
   * Fazer logout
   */
  static logout() {
    api.logout();
    window.location.href = '/index.html';
  }

  /**
   * Preencher informações do usuário na página
   */
  static fillUserInfo() {
    const userName = api.getUserName();
    const userRole = api.getUserRole();
    
    // Atualizar nome do usuário na sidebar ou header
    const userNameElements = document.querySelectorAll('[data-user-name]');
    userNameElements.forEach(el => {
      el.textContent = userName || 'Utilizador';
    });

    // Atualizar role do usuário
    const userRoleElements = document.querySelectorAll('[data-user-role]');
    userRoleElements.forEach(el => {
      el.textContent = this.translateRole(userRole);
    });

    // Adicionar event listener ao botão de logout
    const logoutBtns = document.querySelectorAll('[data-logout]');
    logoutBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
      });
    });
  }

  /**
   * Traduz roles para português
   */
  static translateRole(role) {
    const roleMap = {
      'ADMIN': 'Administrador',
      'PROFESSOR': 'Professor',
      'ALUNO': 'Aluno',
      'SECRETARIA': 'Secretaria',
      'ENCARREGADO': 'Encarregado de Educação'
    };
    return roleMap[role] || role;
  }

  /**
   * Remover itens de menu baseado em role
   */
  static applyRoleBasedVisibility() {
    const userRole = api.getUserRole();
    
    // Remover itens com role restriction
    document.querySelectorAll('[data-role-only]').forEach(el => {
      const allowedRoles = el.getAttribute('data-role-only').split(',');
      if (!allowedRoles.includes(userRole)) {
        el.style.display = 'none';
      }
    });
  }
}

// Chamar quando documento carregar
document.addEventListener('DOMContentLoaded', function() {
  // Verificar autenticação (opcional - só para páginas protegidas)
  if (document.body.getAttribute('data-protected') === 'true') {
    AuthHelper.checkAuth();
  }

  // Preencher informações do usuário
  if (api.isAuthenticated()) {
    AuthHelper.fillUserInfo();
    AuthHelper.applyRoleBasedVisibility();
  }
});
