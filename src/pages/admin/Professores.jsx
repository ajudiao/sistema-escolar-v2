import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { professoresList as initialList, disciplinas, turmasList } from '../../data/dados';

const emptyForm = { nome: '', email: '', telefone: '', disciplinas: '', senha: '' };

export default function AdminProfessores() {
  const [lista, setLista] = useState(initialList);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = lista.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.disciplinas.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => { setForm(emptyForm); setEditing(false); setShowModal(true); };
  const openEdit = (p) => {
    setForm({ nome: p.nome, email: p.email, telefone: p.telefone, disciplinas: p.disciplinas, senha: '' });
    setEditing(p.id);
    setShowModal(true);
  };
  const openDetails = (p) => { setSelected(p); setShowDetails(true); };

  const handleSave = () => {
    if (!form.nome) return;
    if (editing) {
      setLista(prev => prev.map(p => p.id === editing ? { ...p, ...form } : p));
    } else {
      setLista(prev => [...prev, { id: Date.now(), ...form, status: 'Activo', turmas: [] }]);
    }
    setShowModal(false);
  };

  const handleDelete = (p) => {
    setLista(prev => prev.filter(x => x.id !== p.id));
    setConfirmDelete(null);
  };

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Professores</h2>
        <p className="page-subtitle">Gestão do corpo docente</p>
      </div>

      <div className="table-container">
        <div className="table-header">
          <span className="table-title">Lista de Professores ({filtered.length})</span>
          <div className="d-flex gap-2 flex-wrap">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Pesquisar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: 220 }}
            />
            <button className="btn btn-primary btn-sm" onClick={openNew}>+ Novo Professor</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th><th>Nome</th><th>Email</th><th>Telefone</th>
                <th>Disciplinas</th><th>Status</th><th>Acções</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td><strong>{p.nome}</strong></td>
                  <td>{p.email}</td>
                  <td>{p.telefone}</td>
                  <td>{p.disciplinas}</td>
                  <td><span className="badge badge-success">{p.status}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => openDetails(p)}>Ver</button>
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => openEdit(p)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => setConfirmDelete(p)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-muted py-4">Nenhum professor encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Novo / Editar Professor */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? 'Editar Professor' : 'Novo Professor'}
        size="xl"
        footer={
          <>
            <button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
          </>
        }
      >
        <h6 className="text-primary border-bottom pb-2 mb-3">Dados Pessoais</h6>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nome Completo *</label>
            <input className="form-control" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Telefone</label>
            <input type="tel" className="form-control" value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Disciplina Principal</label>
            <select className="form-control form-select" value={form.disciplinas} onChange={e => setForm(f => ({ ...f, disciplinas: e.target.value }))}>
              <option value="">Seleccionar...</option>
              {disciplinas.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          {!editing && (
            <div className="col-md-6 mb-3">
              <label className="form-label">Senha Inicial *</label>
              <input type="password" className="form-control" value={form.senha} onChange={e => setForm(f => ({ ...f, senha: e.target.value }))} />
            </div>
          )}
        </div>
      </Modal>

      {/* Modal: Detalhes */}
      <Modal
        show={showDetails}
        onClose={() => setShowDetails(false)}
        title="Detalhes do Professor"
        size="lg"
        footer={<button className="btn btn-outline-secondary" onClick={() => setShowDetails(false)}>Fechar</button>}
      >
        {selected && (
          <div className="row">
            <div className="col-md-6 mb-3"><label className="form-label fw-bold">Nome</label><p>{selected.nome}</p></div>
            <div className="col-md-6 mb-3"><label className="form-label fw-bold">Email</label><p>{selected.email}</p></div>
            <div className="col-md-6 mb-3"><label className="form-label fw-bold">Telefone</label><p>{selected.telefone}</p></div>
            <div className="col-md-6 mb-3"><label className="form-label fw-bold">Disciplinas</label><p>{selected.disciplinas}</p></div>
            <div className="col-md-6 mb-3"><label className="form-label fw-bold">Status</label><p><span className="badge badge-success">{selected.status}</span></p></div>
          </div>
        )}
      </Modal>

      {/* Modal: Confirmar eliminação */}
      <Modal
        show={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Confirmar Eliminação"
        footer={
          <>
            <button className="btn btn-outline-secondary" onClick={() => setConfirmDelete(null)}>Cancelar</button>
            <button className="btn btn-danger" onClick={() => handleDelete(confirmDelete)}>Eliminar</button>
          </>
        }
      >
        <p>Tem a certeza que deseja eliminar o professor <strong>{confirmDelete?.nome}</strong>? Esta acção não pode ser desfeita.</p>
      </Modal>
    </>
  );
}
