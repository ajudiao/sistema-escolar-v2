import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { professorLogado, turmasList, notasAluno, faltasAluno, avisos as avisosData } from '../../data/dados';

export function ProfessorDashboard() {
  const prof = professorLogado;
  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Painel do Professor</h2>
        <p className="page-subtitle">Ano Lectivo 2026/2025 — I Trimestre</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary"></div>
          <div className="stat-content">
            <div className="stat-value">{prof.turmasLecionadas.length}</div>
            <div className="stat-label">Turmas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"></div>
          <div className="stat-content">
            <div className="stat-value">{prof.disciplinas.length}</div>
            <div className="stat-label">Disciplinas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning"></div>
          <div className="stat-content">
            <div className="stat-value">87</div>
            <div className="stat-label">Alunos Total</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info"></div>
          <div className="stat-content">
            <div className="stat-value">2</div>
            <div className="stat-label">Avisos</div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header"><h5 className="card-title mb-0">Minhas Turmas</h5></div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead><tr><th>Classe</th><th>Turma</th><th>Disciplina</th></tr></thead>
              <tbody>
                {prof.turmasLecionadas.map((t, i) => (
                  <tr key={i}>
                    <td>{t.classe}</td>
                    <td>{t.turma}</td>
                    <td><span className="badge badge-primary">{t.disciplina}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export function ProfessorTurmas() {
  const prof = professorLogado;
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Minhas Turmas</h2>
        <p className="page-subtitle">Turmas que lecciono este ano</p>
      </div>

      <div className="row g-3">
        {prof.turmasLecionadas.map((t, i) => (
          <div className="col-md-4" key={i}>
            <div className="card h-100" style={{ cursor: 'pointer' }} onClick={() => setSelected(t)}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{t.classe} {t.turma}</h5>
                  <span className="badge badge-primary">{t.disciplina}</span>
                </div>
                <p className="text-muted small mb-2">Alunos: ~29</p>
                <button className="btn btn-outline-primary btn-sm w-100">Ver Detalhes</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={!!selected} onClose={() => setSelected(null)} title={`Turma ${selected?.classe} ${selected?.turma}`} size="lg"
        footer={<button className="btn btn-outline-secondary" onClick={() => setSelected(null)}>Fechar</button>}>
        {selected && (
          <div>
            <div className="row mb-3">
              <div className="col-md-4"><label className="form-label fw-bold">Classe</label><p>{selected.classe}</p></div>
              <div className="col-md-4"><label className="form-label fw-bold">Turma</label><p>{selected.turma}</p></div>
              <div className="col-md-4"><label className="form-label fw-bold">Disciplina</label><p>{selected.disciplina}</p></div>
            </div>
            <div className="alert alert-info">
              <strong>Lista de alunos:</strong> Esta turma tem aproximadamente 29 alunos matriculados no I Trimestre.
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export function ProfessorNotas() {
  const [selectedTurma, setSelectedTurma] = useState('');
  const [notas, setNotas] = useState(
    notasAluno.map((n, i) => ({ ...n, id: i + 1, aluno: `Aluno ${i + 1}`, mac: n.mac, npp: n.npp, npt: n.npt }))
  );

  const handleNotaChange = (id, campo, valor) => {
    const v = Math.max(0, Math.min(20, Number(valor)));
    setNotas(prev => prev.map(n => {
      if (n.id !== id) return n;
      const updated = { ...n, [campo]: v };
      const media = ((updated.mac + updated.npp + updated.npt) / 3).toFixed(1);
      return { ...updated, media: parseFloat(media) };
    }));
  };

  const prof = professorLogado;

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Lançamento de Notas</h2>
        <p className="page-subtitle">I Trimestre — 2026/2025</p>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Turma</label>
              <select className="form-control form-select" value={selectedTurma} onChange={e => setSelectedTurma(e.target.value)}>
                <option value="">Seleccionar turma...</option>
                {prof.turmasLecionadas.map((t, i) => <option key={i} value={`${t.classe}${t.turma}`}>{t.classe} {t.turma} — {t.disciplina}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {selectedTurma ? (
        <div className="table-container">
          <div className="table-header">
            <span className="table-title">Notas — Turma {selectedTurma}</span>
            <button className="btn btn-primary btn-sm">Guardar Notas</button>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr><th>#</th><th>Aluno</th><th className="text-center">MAC</th><th className="text-center">NPP</th><th className="text-center">NPT</th><th className="text-center">Média</th></tr>
              </thead>
              <tbody>
                {notas.map(n => (
                  <tr key={n.id}>
                    <td>{n.id}</td>
                    <td>{n.disciplina}</td>
                    {['mac', 'npp', 'npt'].map(campo => (
                      <td key={campo} className="text-center">
                        <input
                          type="number"
                          className="form-control nota-input"
                          min={0} max={20}
                          value={n[campo]}
                          onChange={e => handleNotaChange(n.id, campo, e.target.value)}
                          style={{ maxWidth: 70, margin: '0 auto' }}
                        />
                      </td>
                    ))}
                    <td className="text-center">
                      <span className={`badge ${n.media >= 10 ? 'badge-success' : 'badge-danger'}`}>{n.media}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card"><div className="card-body text-center py-5 text-muted">Seleccione uma turma para lançar notas.</div></div>
      )}
    </>
  );
}

export function ProfessorFaltas() {
  const [selectedTurma, setSelectedTurma] = useState('');
  const prof = professorLogado;

  const faltas = [
    { id: 1, aluno: 'Ana Maria Santos', faltas: 2, justificadas: 1 },
    { id: 2, aluno: 'António José Fernandes', faltas: 0, justificadas: 0 },
    { id: 3, aluno: 'Beatriz Luísa Campos', faltas: 1, justificadas: 0 },
    { id: 4, aluno: 'Carlos Eduardo Neto', faltas: 3, justificadas: 2 },
    { id: 5, aluno: 'Diana Isabel Sousa', faltas: 0, justificadas: 0 },
  ];

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Registo de Faltas</h2>
        <p className="page-subtitle">I Trimestre — 2026/2025</p>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Turma</label>
              <select className="form-control form-select" value={selectedTurma} onChange={e => setSelectedTurma(e.target.value)}>
                <option value="">Seleccionar turma...</option>
                {prof.turmasLecionadas.map((t, i) => <option key={i} value={`${t.classe}${t.turma}`}>{t.classe} {t.turma}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {selectedTurma ? (
        <div className="table-container">
          <div className="table-header">
            <span className="table-title">Faltas — Turma {selectedTurma}</span>
            <button className="btn btn-primary btn-sm">Guardar</button>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead><tr><th>#</th><th>Aluno</th><th className="text-center">Faltas</th><th className="text-center">Justificadas</th><th className="text-center">Injustificadas</th><th className="text-center">Status</th></tr></thead>
              <tbody>
                {faltas.map(f => (
                  <tr key={f.id}>
                    <td>{f.id}</td>
                    <td><strong>{f.aluno}</strong></td>
                    <td className="text-center">{f.faltas}</td>
                    <td className="text-center">{f.justificadas}</td>
                    <td className="text-center">{f.faltas - f.justificadas}</td>
                    <td className="text-center">
                      <span className={`badge ${f.faltas > 8 ? 'badge-danger' : 'badge-success'}`}>{f.faltas > 8 ? 'Risco' : 'OK'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card"><div className="card-body text-center py-5 text-muted">Seleccione uma turma para ver as faltas.</div></div>
      )}
    </>
  );
}

export function ProfessorAvisos() {
  const lista = avisosData.filter(a => a.tipo === 'geral' || a.tipo === 'professores');
  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Avisos</h2>
        <p className="page-subtitle">Comunicados da direcção</p>
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

export function ProfessorPerfil() {
  const prof = professorLogado;
  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Meu Perfil</h2>
        <p className="page-subtitle">Informações pessoais e académicas</p>
      </div>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{prof.initials}</div>
          <div className="profile-name">{prof.nome}</div>
          <div className="profile-role">Professor — {prof.disciplinas.join(', ')}</div>
        </div>
        <div className="profile-body">
          <div className="profile-info-group">
            <div className="profile-info-title">Dados Pessoais</div>
            {[
              { label: 'Nome Completo', value: prof.nome },
              { label: 'BI', value: prof.bi },
              { label: 'Email', value: prof.email },
              { label: 'Telefone', value: prof.telefone },
            ].map(item => (
              <div className="profile-info-item" key={item.label}>
                <span className="profile-info-label">{item.label}</span>
                <span className="profile-info-value">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="profile-info-group">
            <div className="profile-info-title">Académico</div>
            <div className="profile-info-item">
              <span className="profile-info-label">Disciplinas</span>
              <span className="profile-info-value">{prof.disciplinas.join(', ')}</span>
            </div>
            <div className="profile-info-item">
              <span className="profile-info-label">Turmas</span>
              <span className="profile-info-value">{prof.turmasLecionadas.map(t => `${t.classe} ${t.turma}`).join(', ')}</span>
            </div>
          </div>
          <button className="btn btn-primary">Editar Perfil</button>
        </div>
      </div>
    </>
  );
}
