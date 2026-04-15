import React from 'react';

export default function AdminDashboard() {
  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Painel de Controlo</h2>
        <p className="page-subtitle">Ano Lectivo 2026/2025</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">1.245</div>
            <div className="stat-label">Alunos (11º–13ª)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">48</div>
            <div className="stat-label">Professores</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">18</div>
            <div className="stat-label">Turmas</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">5</div>
            <div className="stat-label">Avisos</div>
          </div>
        </div>
      </div>

      {/* Distribuição por Classe */}
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="card-title mb-0">Distribuição de Alunos</h5>
        </div>
        <div className="card-body">
          <div className="row text-center">
            {[
              { classe: '11ª', total: 350 },
              { classe: '12ª', total: 420 },
              { classe: '13ª', total: 475 },
            ].map(({ classe, total }) => (
              <div className="col-4 col-md-2" key={classe}>
                <div className="fw-bold text-primary">{classe}</div>
                <small className="text-muted">{total} alunos</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="row mt-4 g-3">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Acesso Rápido</h5>
            </div>
            <div className="card-body d-flex flex-wrap gap-2">
              {[
                { label: 'Novo Professor', href: '/admin/professores' },
                { label: 'Nova Turma', href: '/admin/turmas' },
                { label: 'Novo Aluno', href: '/admin/alunos' },
                { label: 'Publicar Aviso', href: '/admin/avisos' },
              ].map(link => (
                <a key={link.label} href={link.href} className="btn btn-outline-primary btn-sm">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Resumo Académico</h5>
            </div>
            <div className="card-body">
              <table className="table table-sm mb-0">
                <tbody>
                  <tr><td className="text-secondary">Disciplinas activas</td><td className="fw-bold">12</td></tr>
                  <tr><td className="text-secondary">Cursos</td><td className="fw-bold">4</td></tr>
                  <tr><td className="text-secondary">Período actual</td><td className="fw-bold">I Trimestre</td></tr>
                  <tr><td className="text-secondary">Ano Lectivo</td><td className="fw-bold">2026/2025</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
