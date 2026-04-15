import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { turmasList as initialList, classes, cursos, periodos, professoresList } from '../../data/dados';

const emptyForm = { nome: '', classe: '', turma: '', curso: '', periodo: '', professor: '', total: '' };

export default function AdminTurmas() {
  const [lista, setLista] = useState(initialList);
  const [search, setSearch] = useState('');
  const [filterClasse, setFilterClasse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = lista.filter(t =>
    (t.nome.toLowerCase().includes(search.toLowerCase()) || t.professor.toLowerCase().includes(search.toLowerCase())) &&
    (!filterClasse || t.classe === filterClasse)
  );

  const openNew = () => { setForm(emptyForm); setEditing(false); setShowModal(true); };
  const openEdit = (t) => { setForm({ nome: t.nome, classe: t.classe, turma: t.turma, curso: t.curso, periodo: t.periodo, professor: t.professor, total: t.total }); setEditing(t.id); setShowModal(true); };

  const handleSave = () => {
    if (!form.classe || !form.turma) return;
    const nome = `${form.classe} ${form.turma}`;
    if (editing) {
      setLista(prev => prev.map(t => t.id === editing ? { ...t, ...form, nome } : t));
    } else {
      setLista(prev => [...prev, { id: Date.now(), ...form, nome }]);
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Turmas</h2>
        <p className="page-subtitle">Gestão das turmas da escola</p>
      </div>

      <div className="table-container">
        <div className="table-header">
          <span className="table-title">Lista de Turmas ({filtered.length})</span>
          <div className="d-flex gap-2 flex-wrap">
            <select className="form-control form-select form-control-sm" style={{ width: 130 }} value={filterClasse} onChange={e => setFilterClasse(e.target.value)}>
              <option value="">Todas classes</option>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input className="form-control form-control-sm" placeholder="Pesquisar..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 200 }} />
            <button className="btn btn-primary btn-sm" onClick={openNew}>+ Nova Turma</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr><th>Turma</th><th>Curso</th><th>Período</th><th>Prof. Titular</th><th>Alunos</th><th>Acções</th></tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.nome}</strong></td>
                  <td>{t.curso}</td>
                  <td><span className="badge badge-info">{t.periodo}</span></td>
                  <td>{t.professor}</td>
                  <td>{t.total}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => { setSelected(t); setShowDetails(true); }}>Ver</button>
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => openEdit(t)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => setConfirmDelete(t)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="text-center text-muted py-4">Nenhuma turma encontrada.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Turma' : 'Nova Turma'} size="lg"
        footer={<><button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={handleSave}>Guardar</button></>}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Classe *</label>
            <select className="form-control form-select" value={form.classe} onChange={e => setForm(f => ({ ...f, classe: e.target.value }))}>
              <option value="">Seleccionar...</option>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Letra da Turma *</label>
            <input className="form-control" value={form.turma} onChange={e => setForm(f => ({ ...f, turma: e.target.value.toUpperCase() }))} maxLength={2} />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Período</label>
            <select className="form-control form-select" value={form.periodo} onChange={e => setForm(f => ({ ...f, periodo: e.target.value }))}>
              <option value="">Seleccionar...</option>
              {periodos.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="col-md-8 mb-3">
            <label className="form-label">Curso</label>
            <select className="form-control form-select" value={form.curso} onChange={e => setForm(f => ({ ...f, curso: e.target.value }))}>
              <option value="">Seleccionar...</option>
              {cursos.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Prof. Titular</label>
            <select className="form-control form-select" value={form.professor} onChange={e => setForm(f => ({ ...f, professor: e.target.value }))}>
              <option value="">Seleccionar...</option>
              {professoresList.map(p => <option key={p.id} value={p.nome}>{p.nome}</option>)}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Total de Alunos</label>
            <input type="number" className="form-control" value={form.total} onChange={e => setForm(f => ({ ...f, total: e.target.value }))} />
          </div>
        </div>
      </Modal>

      <Modal show={showDetails} onClose={() => setShowDetails(false)} title="Detalhes da Turma" size="lg"
        footer={<button className="btn btn-outline-secondary" onClick={() => setShowDetails(false)}>Fechar</button>}>
        {selected && (
          <div className="row">
            <div className="col-md-4 mb-2"><label className="form-label fw-bold">Turma</label><p>{selected.nome}</p></div>
            <div className="col-md-4 mb-2"><label className="form-label fw-bold">Curso</label><p>{selected.curso}</p></div>
            <div className="col-md-4 mb-2"><label className="form-label fw-bold">Período</label><p>{selected.periodo}</p></div>
            <div className="col-md-4 mb-2"><label className="form-label fw-bold">Professor Titular</label><p>{selected.professor}</p></div>
            <div className="col-md-4 mb-2"><label className="form-label fw-bold">Total Alunos</label><p>{selected.total}</p></div>
          </div>
        )}
      </Modal>

      <Modal show={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmar Eliminação"
        footer={<><button className="btn btn-outline-secondary" onClick={() => setConfirmDelete(null)}>Cancelar</button><button className="btn btn-danger" onClick={() => { setLista(prev => prev.filter(t => t.id !== confirmDelete.id)); setConfirmDelete(null); }}>Eliminar</button></>}>
        <p>Tem a certeza que deseja eliminar a turma <strong>{confirmDelete?.nome}</strong>?</p>
      </Modal>
    </>
  );
}
