import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ---- Icon helpers ----
const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const IconAvisos = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
  </svg>
);
const IconProfessores = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
  </svg>
);
const IconTurmas = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconNotas = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
);
const IconFaltas = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="10" y1="14" x2="14" y2="18"/><line x1="14" y1="14" x2="10" y2="18"/>
  </svg>
);
const IconUsuarios = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-4-4h-1"/><circle cx="17" cy="7" r="4"/>
  </svg>
);
const IconDisciplinas = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4h7a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H2z"/>
    <path d="M22 4h-7a4 4 0 0 0-4 4v12a4 4 0 0 1 4-4h7z"/>
  </svg>
);
const IconCursos = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l9 4.9v9.8L12 22 3 16.7V6.9L12 2z"/>
  </svg>
);
const IconAlunos = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconPerfil = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconSair = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconAnalise = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

// Nav item map per profile
const navConfig = {
  admin: [
    { group: 'Principal', items: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: <IconDashboard /> },
    ]},
    { group: 'Comunicação', items: [
      { to: '/admin/avisos', label: 'Avisos', icon: <IconAvisos />, badge: 2 },
    ]},
    { group: 'Gestão', items: [
      { to: '/admin/professores', label: 'Professores', icon: <IconProfessores /> },
      { to: '/admin/turmas', label: 'Turmas', icon: <IconTurmas /> },
      { to: '/admin/notas', label: 'Notas', icon: <IconNotas /> },
      { to: '/admin/notas-detalhes', label: 'Detalhes de Notas', icon: <IconNotas /> },
      { to: '/admin/usuarios', label: 'Usuários do Sistema', icon: <IconUsuarios /> },
      { to: '/admin/disciplinas', label: 'Disciplinas', icon: <IconDisciplinas /> },
      { to: '/admin/cursos', label: 'Cursos', icon: <IconCursos /> },
      { to: '/admin/alunos', label: 'Alunos', icon: <IconAlunos /> },
      { to: '/admin/analise-notas', label: 'Análise de Notas', icon: <IconAnalise /> },
    ]},
    { group: 'Conta', items: [
      { to: '/admin/perfil', label: 'Meu Perfil', icon: <IconPerfil /> },
    ]},
  ],
  professor: [
    { group: 'Principal', items: [
      { to: '/professor/dashboard', label: 'Dashboard', icon: <IconDashboard /> },
    ]},
    { group: 'Académico', items: [
      { to: '/professor/turmas', label: 'Minhas Turmas', icon: <IconTurmas /> },
      { to: '/professor/turma-detalhes', label: 'Detalhes da Turma', icon: <IconTurmas /> },
      { to: '/professor/notas', label: 'Notas', icon: <IconNotas /> },
      { to: '/professor/faltas', label: 'Faltas', icon: <IconFaltas /> },
    ]},
    { group: 'Comunicação', items: [
      { to: '/professor/avisos', label: 'Avisos', icon: <IconAvisos /> },
    ]},
    { group: 'Conta', items: [
      { to: '/professor/perfil', label: 'Meu Perfil', icon: <IconPerfil /> },
    ]},
  ],
  aluno: [
    { group: 'Principal', items: [
      { to: '/aluno/dashboard', label: 'Dashboard', icon: <IconDashboard /> },
    ]},
    { group: 'Académico', items: [
      { to: '/aluno/notas', label: 'Minhas Notas', icon: <IconNotas /> },
      { to: '/aluno/faltas', label: 'Minhas Faltas', icon: <IconFaltas /> },
    ]},
    { group: 'Comunicação', items: [
      { to: '/aluno/avisos', label: 'Avisos', icon: <IconAvisos /> },
    ]},
    { group: 'Conta', items: [
      { to: '/aluno/perfil', label: 'Meu Perfil', icon: <IconPerfil /> },
    ]},
  ],
};

export default function Sidebar({ profile, mobileOpen, onCloseMobile }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const nav = navConfig[profile] || [];

  // Restore collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved === 'true') setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    setCollapsed(prev => {
      localStorage.setItem('sidebarCollapsed', !prev);
      return !prev;
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarClass = [
    'sidebar',
    collapsed ? 'collapsed' : '',
    mobileOpen ? 'mobile-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`} onClick={onCloseMobile} />
      <aside className={sidebarClass}>
        <button className="sidebar-close" onClick={onCloseMobile}>
          <IconClose />
        </button>

        <div className="sidebar-brand">
          <div className="sidebar-logo">SGE</div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-title">Escola Conectada</span>
            <span className="sidebar-brand-subtitle">MED Angola</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {nav.map(group => (
            <div className="nav-group" key={group.group}>
              <div className="nav-group-title">{group.group}</div>
              {group.items.map(item => (
                <div className="nav-item" key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    data-title={item.label}
                    onClick={onCloseMobile}
                  >
                    <span className="nav-link-icon">{item.icon}</span>
                    <span className="nav-link-text">{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </NavLink>
                </div>
              ))}
            </div>
          ))}

          {/* Logout */}
          <div className="nav-group">
            <div className="nav-item">
              <button
                className="nav-link w-100 border-0 bg-transparent text-start"
                style={{ cursor: 'pointer' }}
                data-title="Sair"
                onClick={handleLogout}
              >
                <span className="nav-link-icon"><IconSair /></span>
                <span className="nav-link-text">Sair</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-toggle" onClick={toggleCollapse}>
            <span className="sidebar-toggle-icon"><IconChevronLeft /></span>
            <span className="sidebar-toggle-text">Recolher menu</span>
          </button>
        </div>
      </aside>
    </>
  );
}
