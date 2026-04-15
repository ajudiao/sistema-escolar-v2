// Admin Notas
import React, { useState } from 'react';
import { turmasList, disciplinas, notasAluno } from '../../data/dados';

export function AdminNotas() {
  const [selectedTurma, setSelectedTurma] = useState('');
  const [selectedDisciplina, setSelectedDisciplina] = useState('');

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Notas</h2>
        <p className="page-subtitle">Consulta e gestão de avaliações</p>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Turma</label>
              <select className="form-control form-select" value={selectedTurma} onChange={e => setSelectedTurma(e.target.value)}>
                <option value="">Seleccionar turma...</option>
                {turmasList.map(t => <option key={t.id} value={t.nome}>{t.nome}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Disciplina</label>
              <select className="form-control form-select" value={selectedDisciplina} onChange={e => setSelectedDisciplina(e.target.value)}>
                <option value="">Seleccionar disciplina...</option>
                {disciplinas.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button className="btn btn-primary w-100">Consultar Notas</button>
            </div>
          </div>
        </div>
      </div>

      {selectedTurma && (
        <div className="table-container">
          <div className="table-header">
            <span className="table-title">Notas — {selectedTurma} {selectedDisciplina && `/ ${selectedDisciplina}`}</span>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr><th>Aluno</th><th>Disciplina</th><th className="text-center">MAC</th><th className="text-center">NPP</th><th className="text-center">NPT</th><th className="text-center">Média</th></tr>
              </thead>
              <tbody>
                {notasAluno.filter(n => !selectedDisciplina || n.disciplina === selectedDisciplina).map((n, i) => (
                  <tr key={i}>
                    <td>Aluno {i + 1}</td>
                    <td>{n.disciplina}</td>
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
      )}

      {!selectedTurma && (
        <div className="card">
          <div className="card-body text-center py-5 text-muted">
            Seleccione uma turma para consultar as notas.
          </div>
        </div>
      )}
    </>
  );
}

export function AdminAnáliseNotas() {
  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Análise de Notas</h2>
        <p className="page-subtitle">Estatísticas e relatórios académicos</p>
      </div>
      <div className="stats-grid">
        {[
          { label: 'Média Geral da Escola', value: '13.8', color: 'success' },
          { label: 'Alunos com positiva', value: '78%', color: 'primary' },
          { label: 'Alunos em risco', value: '22%', color: 'danger' },
          { label: 'Disciplinas avaliadas', value: '12', color: 'info' },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>📊</div>
            <div className="stat-content">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card mt-4">
        <div className="card-header"><h5 className="card-title mb-0">Médias por Disciplina</h5></div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead><tr><th>Disciplina</th><th className="text-center">Média</th><th className="text-center">% Positivas</th><th className="text-center">Situação</th></tr></thead>
              <tbody>
                {[
                  { d: 'Matemática', media: 12.4, pos: 68 },
                  { d: 'Física', media: 11.8, pos: 62 },
                  { d: 'Química', media: 13.2, pos: 72 },
                  { d: 'Biologia', media: 14.1, pos: 80 },
                  { d: 'Língua Portuguesa', media: 13.8, pos: 78 },
                ].map(r => (
                  <tr key={r.d}>
                    <td><strong>{r.d}</strong></td>
                    <td className="text-center">{r.media}</td>
                    <td className="text-center">{r.pos}%</td>
                    <td className="text-center"><span className={`badge ${r.media >= 10 ? 'badge-success' : 'badge-danger'}`}>{r.media >= 10 ? 'OK' : 'Atenção'}</span></td>
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

export function AdminDisciplinas() {
  const [lista, setLista] = useState([
    { id: 1, nome: 'Matemática', codigo: 'MAT', cargaHoraria: 4, professores: 3 },
    { id: 2, nome: 'Física', codigo: 'FIS', cargaHoraria: 3, professores: 2 },
    { id: 3, nome: 'Química', codigo: 'QUI', cargaHoraria: 3, professores: 2 },
    { id: 4, nome: 'Biologia', codigo: 'BIO', cargaHoraria: 3, professores: 2 },
    { id: 5, nome: 'Língua Portuguesa', codigo: 'LP', cargaHoraria: 5, professores: 4 },
    { id: 6, nome: 'Inglês', codigo: 'ING', cargaHoraria: 3, professores: 3 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nome: '', codigo: '', cargaHoraria: '' });
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (!form.nome) return;
    if (editing) setLista(prev => prev.map(d => d.id === editing ? { ...d, ...form } : d));
    else setLista(prev => [...prev, { id: Date.now(), ...form, professores: 0 }]);
    setShowModal(false);
  };

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Disciplinas</h2>
        <p className="page-subtitle">Gestão das disciplinas curriculares</p>
      </div>
      <div className="table-container">
        <div className="table-header">
          <span className="table-title">Disciplinas ({lista.length})</span>
          <button className="btn btn-primary btn-sm" onClick={() => { setForm({ nome: '', codigo: '', cargaHoraria: '' }); setEditing(false); setShowModal(true); }}>+ Nova Disciplina</button>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>#</th><th>Nome</th><th>Código</th><th>Carga Horária</th><th>Professores</th><th>Acções</th></tr></thead>
            <tbody>
              {lista.map((d, i) => (
                <tr key={d.id}>
                  <td>{i + 1}</td><td><strong>{d.nome}</strong></td><td><code>{d.codigo}</code></td>
                  <td>{d.cargaHoraria}h/sem</td><td>{d.professores}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => { setForm({ nome: d.nome, codigo: d.codigo, cargaHoraria: d.cargaHoraria }); setEditing(d.id); setShowModal(true); }}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => setLista(prev => prev.filter(x => x.id !== d.id))}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Disciplina' : 'Nova Disciplina'}
        footer={<><button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={handleSave}>Guardar</button></>}>
        <div className="row">
          <div className="col-md-6 mb-3"><label className="form-label">Nome *</label><input className="form-control" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} /></div>
          <div className="col-md-3 mb-3"><label className="form-label">Código</label><input className="form-control" value={form.codigo} onChange={e => setForm(f => ({ ...f, codigo: e.target.value.toUpperCase() }))} /></div>
          <div className="col-md-3 mb-3"><label className="form-label">Carga (h/sem)</label><input type="number" className="form-control" value={form.cargaHoraria} onChange={e => setForm(f => ({ ...f, cargaHoraria: e.target.value }))} /></div>
        </div>
      </Modal>
    </>
  );
}

export function AdminCursos() {
  const [lista, setLista] = useState([
    { id: 1, nome: 'Ciências Físicas e Biológicas', codigo: 'CFB', turmas: 4, alunos: 120 },
    { id: 2, nome: 'Ciências Económicas e Jurídicas', codigo: 'CEJ', turmas: 3, alunos: 90 },
    { id: 3, nome: 'Ciências Humanas', codigo: 'CH', turmas: 3, alunos: 85 },
    { id: 4, nome: 'Artes Visuais', codigo: 'AV', turmas: 2, alunos: 50 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nome: '', codigo: '' });
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (!form.nome) return;
    if (editing) setLista(prev => prev.map(c => c.id === editing ? { ...c, ...form } : c));
    else setLista(prev => [...prev, { id: Date.now(), ...form, turmas: 0, alunos: 0 }]);
    setShowModal(false);
  };

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Cursos</h2>
        <p className="page-subtitle">Gestão dos cursos oferecidos pela escola</p>
      </div>
      <div className="table-container">
        <div className="table-header">
          <span className="table-title">Cursos ({lista.length})</span>
          <button className="btn btn-primary btn-sm" onClick={() => { setForm({ nome: '', codigo: '' }); setEditing(false); setShowModal(true); }}>+ Novo Curso</button>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>#</th><th>Nome</th><th>Código</th><th>Turmas</th><th>Alunos</th><th>Acções</th></tr></thead>
            <tbody>
              {lista.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td><td><strong>{c.nome}</strong></td><td><code>{c.codigo}</code></td>
                  <td>{c.turmas}</td><td>{c.alunos}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => { setForm({ nome: c.nome, codigo: c.codigo }); setEditing(c.id); setShowModal(true); }}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => setLista(prev => prev.filter(x => x.id !== c.id))}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Curso' : 'Novo Curso'}
        footer={<><button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={handleSave}>Guardar</button></>}>
        <div className="row">
          <div className="col-md-8 mb-3"><label className="form-label">Nome *</label><input className="form-control" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} /></div>
          <div className="col-md-4 mb-3"><label className="form-label">Código</label><input className="form-control" value={form.codigo} onChange={e => setForm(f => ({ ...f, codigo: e.target.value.toUpperCase() }))} /></div>
        </div>
      </Modal>
    </>
  );
}

export function AdminUsuarios() {
  const [lista] = useState([
    { id: 1, nome: 'Administrador Principal', username: 'admin', perfil: 'Admin', email: 'admin@escola.med.ao', status: 'Activo' },
    { id: 2, nome: 'João Manuel Ferreira', username: 'prof1', perfil: 'Professor', email: 'joao.ferreira@escola.med.ao', status: 'Activo' },
    { id: 3, nome: 'Maria Santos', username: 'aluno1', perfil: 'Aluno', email: 'maria.santos@aluno.escola.med.ao', status: 'Activo' },
  ]);

  const perfilBadge = { Admin: 'badge-danger', Professor: 'badge-info', Aluno: 'badge-primary' };

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Usuários do Sistema</h2>
        <p className="page-subtitle">Gestão de acessos e permissões</p>
      </div>
      <div className="table-container">
        <div className="table-header">
          <span className="table-title">Usuários ({lista.length})</span>
          <button className="btn btn-primary btn-sm">+ Novo Usuário</button>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>#</th><th>Nome</th><th>Utilizador</th><th>Perfil</th><th>Email</th><th>Status</th><th>Acções</th></tr></thead>
            <tbody>
              {lista.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td><strong>{u.nome}</strong></td>
                  <td><code>{u.username}</code></td>
                  <td><span className={`badge ${perfilBadge[u.perfil] || 'badge-primary'}`}>{u.perfil}</span></td>
                  <td>{u.email}</td>
                  <td><span className="badge badge-success">{u.status}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-1">Editar</button>
                    <button className="btn btn-sm btn-outline-danger">Eliminar</button>
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

export function AdminPerfil() {
  const [form, setForm] = useState({
    nome: 'Administrador Geral',
    email: 'admin@escola.med.ao',
    telefone: '+244 923 000 001',
    cargo: 'Administrador do Sistema',
  });
  const [pwForm, setPwForm] = useState({ atual: '', nova: '', confirmar: '' });
  const [saved, setSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePwSave = (e) => {
    e.preventDefault();
    if (pwForm.nova !== pwForm.confirmar) return alert('As palavras-passe não coincidem.');
    setPwForm({ atual: '', nova: '', confirmar: '' });
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  };

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Meu Perfil</h2>
        <p className="page-subtitle">Informações e configurações da conta</p>
      </div>

      {saved && <div className="alert alert-success mb-4">✔ Perfil actualizado com sucesso.</div>}
      {pwSaved && <div className="alert alert-success mb-4">✔ Palavra-passe alterada com sucesso.</div>}

      <div className="row g-4">
        {/* Profile card */}
        <div className="col-lg-4">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar" style={{ width: 80, height: 80, fontSize: '2rem', margin: '0 auto 1rem' }}>AD</div>
              <div className="profile-name">{form.nome}</div>
              <div className="profile-role">Administração do Sistema</div>
            </div>
            <div className="profile-body">
              <div className="profile-info-group">
                <div className="profile-info-title">Informações de Conta</div>
                {[
                  { label: 'Utilizador:', value: 'admin' },
                  { label: 'Último acesso:', value: 'Hoje, 08:45' },
                  { label: 'Estado:', value: <span className="badge badge-success">Activo</span> },
                ].map(item => (
                  <div className="profile-info-item" key={item.label}>
                    <span className="profile-info-label">{item.label}</span>
                    <span className="profile-info-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings form */}
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Configurações da Conta</h5>
              <button className="btn btn-sm btn-outline-primary" onClick={() => setEditing(e => !e)}>
                {editing ? 'Cancelar' : 'Editar'}
              </button>
            </div>
            <div className="card-body">
              <form onSubmit={handleSave}>
                <h6 className="mb-3">Informações Pessoais</h6>
                <div className="row g-3">
                  {[
                    { id: 'nome', label: 'Nome Completo', type: 'text', readonly: true },
                    { id: 'email', label: 'Email Institucional', type: 'email' },
                    { id: 'telefone', label: 'Telefone', type: 'tel' },
                    { id: 'cargo', label: 'Cargo', type: 'text', readonly: true },
                  ].map(field => (
                    <div className="col-md-6" key={field.id}>
                      <label className="form-label">{field.label}</label>
                      <input
                        type={field.type}
                        className="form-control"
                        value={form[field.id]}
                        readOnly={!editing || field.readonly}
                        onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
                {editing && (
                  <button type="submit" className="btn btn-primary mt-3">Guardar Alterações</button>
                )}
              </form>

              <hr className="my-4" />

              <form onSubmit={handlePwSave}>
                <h6 className="mb-3">Alterar Palavra-passe</h6>
                <div className="row g-3">
                  {[
                    { id: 'atual', label: 'Palavra-passe Actual' },
                    { id: 'nova', label: 'Nova Palavra-passe' },
                    { id: 'confirmar', label: 'Confirmar Nova' },
                  ].map(field => (
                    <div className="col-md-4" key={field.id}>
                      <label className="form-label">{field.label}</label>
                      <input
                        type="password"
                        className="form-control"
                        value={pwForm[field.id]}
                        onChange={e => setPwForm(f => ({ ...f, [field.id]: e.target.value }))}
                        autoComplete="new-password"
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3">Alterar Palavra-passe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
