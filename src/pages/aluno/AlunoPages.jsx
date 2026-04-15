import React, { useState } from 'react';
import { alunoLogado, notasAluno, faltasAluno, avisos as avisosData } from '../../data/dados';

export function AlunoDashboard() {
  const aluno = alunoLogado;
  const mediaGeral = (notasAluno.reduce((sum, n) => sum + n.media, 0) / notasAluno.length).toFixed(1);
  const posCount = notasAluno.filter(n => n.media >= 10).length;
  const totalFaltas = faltasAluno.reduce((sum, f) => sum + f.faltas, 0);
  const unreadAvisos = avisosData.filter(a => !a.lido).length;

  return (
    <>
      {/* Welcome Banner */}
      <div className="card mb-4" style={{ background: 'linear-gradient(135deg, #1a4480, #1e40af)', color: 'white' }}>
        <div className="card-body py-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h3 className="mb-2">Bem-vinda, {aluno.nome.split(' ')[0]}!</h3>
              <p className="mb-0 opacity-90">{aluno.turma} — {aluno.curso} | Período: {aluno.periodo} | Ano Lectivo 2026/2025</p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.875rem', padding: '0.5rem 1rem' }}>I Trimestre</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>📊</div>
          <div className="stat-content">
            <span className="stat-value">{mediaGeral}</span>
            <span className="stat-label">Média Geral</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>✅</div>
          <div className="stat-content">
            <span className="stat-value">{posCount} / {notasAluno.length}</span>
            <span className="stat-label">Disciplinas Positivas</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>❌</div>
          <div className="stat-content">
            <span className="stat-value">{totalFaltas}</span>
            <span className="stat-label">Faltas Totais</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>📢</div>
          <div className="stat-content">
            <span className="stat-value">{unreadAvisos}</span>
            <span className="stat-label">Avisos Novos</span>
          </div>
        </div>
      </div>

      {/* Tables row */}
      <div className="row g-4 mt-2">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0">Avaliações Recentes</h6>
              <a href="/aluno/notas" className="btn btn-sm btn-outline-primary">Ver Todas</a>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead><tr><th>Disciplina</th><th className="text-center">MAC</th><th className="text-center">Média</th></tr></thead>
                  <tbody>
                    {notasAluno.slice(0, 5).map((n, i) => (
                      <tr key={i}>
                        <td><strong>{n.disciplina}</strong><br /><small className="text-muted">{n.professor}</small></td>
                        <td className="text-center">{n.mac}</td>
                        <td className="text-center"><span className={`badge ${n.media >= 10 ? 'badge-success' : 'badge-danger'}`}>{n.media}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0">Faltas por Disciplina</h6>
              <a href="/aluno/faltas" className="btn btn-sm btn-outline-primary">Ver Todas</a>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead><tr><th>Disciplina</th><th className="text-center">Faltas</th><th className="text-center">Limite</th><th className="text-center">Status</th></tr></thead>
                  <tbody>
                    {faltasAluno.map((f, i) => (
                      <tr key={i}>
                        <td><strong>{f.disciplina}</strong></td>
                        <td className="text-center">{f.faltas}</td>
                        <td className="text-center text-muted">{f.limite}</td>
                        <td className="text-center"><span className={`badge ${f.status === 'OK' ? 'badge-success' : 'badge-warning'}`}>{f.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function AlunoNotas() {
  const [periodo, setPeriodo] = useState('I');

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Minhas Notas</h2>
        <p className="page-subtitle">Avaliações do ano lectivo 2026/2025</p>
      </div>

      <div className="card mb-4">
        <div className="card-body py-2">
          <div className="d-flex gap-2">
            {['I', 'II', 'III'].map(p => (
              <button key={p} className={`btn btn-sm ${periodo === p ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setPeriodo(p)}>
                {p} Trimestre
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <span className="table-title">Notas — {periodo} Trimestre</span>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr><th>Disciplina</th><th>Professor</th><th className="text-center">MAC</th><th className="text-center">NPP</th><th className="text-center">NPT</th><th className="text-center">Média</th></tr>
            </thead>
            <tbody>
              {notasAluno.map((n, i) => (
                <tr key={i}>
                  <td><strong>{n.disciplina}</strong></td>
                  <td className="text-muted">{n.professor}</td>
                  <td className="text-center">{n.mac}</td>
                  <td className="text-center">{n.npp}</td>
                  <td className="text-center">{n.npt}</td>
                  <td className="text-center">
                    <span className={`badge ${n.media >= 10 ? 'badge-success' : 'badge-danger'}`}>{n.media}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export function AlunoFaltas() {
  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Minhas Faltas</h2>
        <p className="page-subtitle">Registo de presenças — I Trimestre</p>
      </div>

      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div className="stat-icon danger">❌</div>
          <div className="stat-content">
            <span className="stat-value">{faltasAluno.reduce((s, f) => s + f.faltas, 0)}</span>
            <span className="stat-label">Total de Faltas</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">✅</div>
          <div className="stat-content">
            <span className="stat-value">{faltasAluno.filter(f => f.status === 'OK').length}</span>
            <span className="stat-label">Disciplinas OK</span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <span className="table-title">Faltas por Disciplina</span>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr><th>Disciplina</th><th className="text-center">Faltas</th><th className="text-center">Limite</th><th className="text-center">Disponível</th><th className="text-center">Status</th></tr>
            </thead>
            <tbody>
              {faltasAluno.map((f, i) => (
                <tr key={i}>
                  <td><strong>{f.disciplina}</strong></td>
                  <td className="text-center">{f.faltas}</td>
                  <td className="text-center text-muted">{f.limite}</td>
                  <td className="text-center">{f.limite - f.faltas}</td>
                  <td className="text-center">
                    <span className={`badge ${f.faltas > 7 ? 'badge-danger' : f.faltas > 4 ? 'badge-warning' : 'badge-success'}`}>{f.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export function AlunoAvisos() {
  const lista = avisosData.filter(a => a.tipo === 'geral');
  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Avisos</h2>
        <p className="page-subtitle">Comunicados da escola</p>
      </div>
      <div className="avisos-list">
        {lista.map(aviso => (
          <div key={aviso.id} className={`aviso-item${!aviso.lido ? ' unread' : ''}`}>
            <div className="aviso-header">
              <span className="aviso-title">{aviso.titulo}</span>
              <span className="aviso-date">{aviso.data}</span>
            </div>
            <div className="aviso-content">{aviso.conteudo}</div>
            <div className="aviso-footer"><span>Por: {aviso.autor}</span></div>
          </div>
        ))}
      </div>
    </>
  );
}

export function AlunoPerfil() {
  const aluno = alunoLogado;
  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Meu Perfil</h2>
        <p className="page-subtitle">Informações pessoais e académicas</p>
      </div>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{aluno.initials}</div>
          <div className="profile-name">{aluno.nome}</div>
          <div className="profile-role">Aluno — {aluno.turma}</div>
        </div>
        <div className="profile-body">
          <div className="profile-info-group">
            <div className="profile-info-title">Dados Pessoais</div>
            {[
              { label: 'Nome Completo', value: aluno.nome },
              { label: 'Nº de Aluno', value: aluno.numero },
              { label: 'Email', value: aluno.email },
            ].map(item => (
              <div className="profile-info-item" key={item.label}>
                <span className="profile-info-label">{item.label}</span>
                <span className="profile-info-value">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="profile-info-group">
            <div className="profile-info-title">Dados Académicos</div>
            {[
              { label: 'Turma', value: aluno.turma },
              { label: 'Classe', value: aluno.classe },
              { label: 'Curso', value: aluno.curso },
              { label: 'Período', value: aluno.periodo },
            ].map(item => (
              <div className="profile-info-item" key={item.label}>
                <span className="profile-info-label">{item.label}</span>
                <span className="profile-info-value">{item.value}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary">Editar Perfil</button>
        </div>
      </div>
    </>
  );
}
