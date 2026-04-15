import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const pageTitles = {
  dashboard: 'Dashboard',
  avisos: 'Avisos',
  professores: 'Professores',
  turmas: 'Turmas',
  notas: 'Notas',
  'analise-notas': 'Análise de Notas',
  'notas-detalhes': 'Detalhes das Notas',
  alunos: 'Alunos',
  perfil: 'Meu Perfil',
  usuarios: 'Usuários do Sistema',
  disciplinas: 'Disciplinas',
  cursos: 'Cursos',
  faltas: 'Faltas',
  'turma-detalhes': 'Detalhes da Turma',
};

const userInfo = {
  admin: { name: 'Administrador', initials: 'AD', role: 'Coordenador' },
  professor: { name: 'João Ferreira', initials: 'JF', role: 'Professor' },
  aluno: { name: 'Maria Santos', initials: 'MS', role: 'Aluna - EIA-11AD' },
};

export default function Layout({ profile }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const segment = location.pathname.split('/').pop();
  const title = pageTitles[segment] || 'SGE';
  const info = userInfo[profile] || userInfo.admin;

  return (
    <div className="main-wrapper">
      <Sidebar
        profile={profile}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>
              <IconMenu />
            </button>
            <h1 className="header-title">{title}</h1>
          </div>
          <div className="header-right">
            <div className="header-user">
              <div className="header-user-avatar">{info.initials}</div>
              <div className="header-user-info">
                <span className="header-user-name">{info.name}</span>
                <span className="header-user-role">{info.role}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>

        <footer className="main-footer">
          <p className="mb-0">Sistema de Gestão Escolar © 2026 — Ministério da Educação de Angola</p>
        </footer>
      </main>
    </div>
  );
}
