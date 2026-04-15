import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { alunosList as initialList, classes, cursos, periodos, turmasList } from '../../data/dados';

const emptyForm = { nome: '', turma: '', curso: '', periodo: '', status: 'Activo' };

export default function AdminAlunos() {
  const [lista, setLista] = useState(initialList);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = lista.filter(a =>
    a.nome.toLowerCase().includes(search.toLowerCase()) ||
    a.turma.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => { setForm(emptyForm); setEditing(false); setShowModal(true); };
  const openEdit = (a) => { setForm({ nome: a.nome, turma: a.turma, curso: a.curso, periodo: a.periodo, status: a.status }); setEditing(a.id); setShowModal(true); };

  const handleSave = () => {
    if (!form.nome) return;
    if (editing) {
      setLista(prev => prev.map(a => a.id === editing ? { ...a, ...form } : a));
    } else {
      const numero = lista.length + 1;
      setLista(prev => [...prev, { id: Date.now(), numero, ...form }]);
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Alunos</h2>
        <p className="page-subtitle">Gestão dos alunos matriculados</p>
      </div>

      <div className="table-container">
        <div className="table-header">
          <span className="table-title">Lista de Alunos ({filtered.length})</span>
          <div className="d-flex gap-2 flex-wrap">
            <input className="form-control form-control-sm" placeholder="Pesquisar..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 220 }} />
            <button className="btn btn-primary btn-sm" onClick={openNew}>+ Novo Aluno</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr><th>#</th><th>Nome</th><th>Turma</th><th>Curso</th><th>Período</th><th>Status</th><th>Acções</th></tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id}>
                  <td>{a.numero || i + 1}</td>
                  <td><strong>{a.nome}</strong></td>
                  <td>{a.turma}</td>
                  <td>{a.curso}</td>
                  <td>{a.periodo}</td>
                  <td><span className="badge badge-success">{a.status}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => { setSelected(a); setShowDetails(true); }}>Ver</button>
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => openEdit(a)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => setConfirmDelete(a)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={7} className="text-center text-muted py-4">Nenhum aluno encontrado.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Aluno' : 'Novo Aluno'} size="lg"
        footer={<><button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={handleSave}>Guardar</button></>}>
        <div className="row">
          <div className="col-md-8 mb-3">
            <label className="form-label">Nome Completo *</label>
            <input className="form-control" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Turma</label>
            <select className="form-control form-select" value={form.turma} onChange={e => setForm(f => ({ ...f, turma: e.target.value }))}>
              <option value="">Seleccionar...</option>
              {turmasList.map(t => <option key={t.id} value={t.nome}>{t.nome}</option>)}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Curso</label>
            <select className="form-control form-select" value={form.curso} onChange={e => setForm(f => ({ ...f, curso: e.target.value }))}>
              <option value="">Seleccionar...</option>
              {cursos.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Período</label>
            <select className="form-control form-select" value={form.periodo} onChange={e => setForm(f => ({ ...f, periodo: e.target.value }))}>
              <option value="">Seleccionar...</option>
              {periodos.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Status</label>
            <select className="form-control form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option>Activo</option><option>Inactivo</option><option>Transferido</option>
            </select>
          </div>
        </div>
      </Modal>

      <Modal show={showDetails} onClose={() => setShowDetails(false)} title="Detalhes do Aluno" size="lg"
        footer={<button className="btn btn-outline-secondary" onClick={() => setShowDetails(false)}>Fechar</button>}>
        {selected && (
          <div className="row">
            <div className="col-md-6 mb-2"><label className="form-label fw-bold">Nome</label><p>{selected.nome}</p></div>
            <div className="col-md-3 mb-2"><label className="form-label fw-bold">Número</label><p>{selected.numero}</p></div>
            <div className="col-md-3 mb-2"><label className="form-label fw-bold">Turma</label><p>{selected.turma}</p></div>
            <div className="col-md-6 mb-2"><label className="form-label fw-bold">Curso</label><p>{selected.curso}</p></div>
            <div className="col-md-3 mb-2"><label className="form-label fw-bold">Período</label><p>{selected.periodo}</p></div>
            <div className="col-md-3 mb-2"><label className="form-label fw-bold">Status</label><p><span className="badge badge-success">{selected.status}</span></p></div>
          </div>
        )}
      </Modal>

      <Modal show={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmar Eliminação"
        footer={<><button className="btn btn-outline-secondary" onClick={() => setConfirmDelete(null)}>Cancelar</button><button className="btn btn-danger" onClick={() => { setLista(prev => prev.filter(a => a.id !== confirmDelete.id)); setConfirmDelete(null); }}>Eliminar</button></>}>
        <p>Tem a certeza que deseja eliminar o aluno <strong>{confirmDelete?.nome}</strong>?</p>
      </Modal>
    </>
  );
}
