import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { avisos as initialAvisos } from '../../data/dados';

const emptyForm = { titulo: '', conteudo: '', tipo: 'geral', autor: 'Direcção' };

export default function Avisos({ canEdit = false }) {
  const [lista, setLista] = useState(initialAvisos);
  const [filterTipo, setFilterTipo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = lista.filter(a => !filterTipo || a.tipo === filterTipo);
  const unread = lista.filter(a => !a.lido).length;

  const markRead = (id) => setLista(prev => prev.map(a => a.id === id ? { ...a, lido: true } : a));
  const markAllRead = () => setLista(prev => prev.map(a => ({ ...a, lido: true })));

  const openNew = () => { setForm(emptyForm); setEditing(false); setShowModal(true); };
  const openEdit = (a) => { setForm({ titulo: a.titulo, conteudo: a.conteudo, tipo: a.tipo, autor: a.autor }); setEditing(a.id); setShowModal(true); };

  const handleSave = () => {
    if (!form.titulo) return;
    if (editing) {
      setLista(prev => prev.map(a => a.id === editing ? { ...a, ...form } : a));
    } else {
      const today = new Date().toISOString().split('T')[0];
      setLista(prev => [...prev, { id: Date.now(), ...form, data: today, lido: false }]);
    }
    setShowModal(false);
  };

  const tipoLabel = { geral: 'Geral', professores: 'Professores', encarregados: 'Enc. Educação' };
  const tipoBadge = { geral: 'badge-primary', professores: 'badge-info', encarregados: 'badge-warning' };

  return (
    <>
      <div className="page-header mb-4">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
          <div>
            <h2 className="page-title">Avisos</h2>
            <p className="page-subtitle">{unread > 0 ? `${unread} aviso(s) por ler` : 'Todos os avisos lidos'}</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-outline-secondary btn-sm" onClick={markAllRead}>Marcar todos como lido</button>
            {canEdit && <button className="btn btn-primary btn-sm" onClick={openNew}>+ Novo Aviso</button>}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body py-2">
          <div className="d-flex gap-2 flex-wrap align-items-center">
            <span className="text-secondary small">Filtrar por:</span>
            {['', 'geral', 'professores', 'encarregados'].map(tipo => (
              <button
                key={tipo}
                className={`btn btn-sm ${filterTipo === tipo ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setFilterTipo(tipo)}
              >
                {tipo === '' ? 'Todos' : tipoLabel[tipo]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="avisos-list">
        {filtered.map(aviso => (
          <div key={aviso.id} className={`aviso-item${!aviso.lido ? ' unread' : ''}`}>
            <div className="aviso-header">
              <div>
                <span className="aviso-title">{aviso.titulo}</span>
                {!aviso.lido && <span className="badge badge-primary ms-2">Novo</span>}
              </div>
              <div className="d-flex gap-2 align-items-center">
                <span className={`badge ${tipoBadge[aviso.tipo] || 'badge-primary'}`}>{tipoLabel[aviso.tipo] || aviso.tipo}</span>
                <span className="aviso-date">{aviso.data}</span>
              </div>
            </div>
            <div className="aviso-content">{aviso.conteudo}</div>
            <div className="aviso-footer">
              <span>Por: {aviso.autor}</span>
              <div className="ms-auto d-flex gap-2">
                {!aviso.lido && (
                  <button className="btn btn-sm btn-outline-primary" onClick={() => markRead(aviso.id)}>Marcar como lido</button>
                )}
                {canEdit && (
                  <>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => openEdit(aviso)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => setConfirmDelete(aviso)}>Eliminar</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-muted py-5">Nenhum aviso encontrado.</div>
        )}
      </div>

      {/* Modal: Novo / Editar */}
      <Modal show={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Aviso' : 'Novo Aviso'} size="lg"
        footer={<><button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={handleSave}>Publicar</button></>}>
        <div className="row">
          <div className="col-12 mb-3">
            <label className="form-label">Título *</label>
            <input className="form-control" value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Destinatário</label>
            <select className="form-control form-select" value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}>
              <option value="geral">Geral</option>
              <option value="professores">Professores</option>
              <option value="encarregados">Enc. Educação</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Autor</label>
            <input className="form-control" value={form.autor} onChange={e => setForm(f => ({ ...f, autor: e.target.value }))} />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Conteúdo *</label>
            <textarea className="form-control" rows={4} value={form.conteudo} onChange={e => setForm(f => ({ ...f, conteudo: e.target.value }))} />
          </div>
        </div>
      </Modal>

      <Modal show={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Eliminar Aviso"
        footer={<><button className="btn btn-outline-secondary" onClick={() => setConfirmDelete(null)}>Cancelar</button><button className="btn btn-danger" onClick={() => { setLista(prev => prev.filter(a => a.id !== confirmDelete.id)); setConfirmDelete(null); }}>Eliminar</button></>}>
        <p>Tem a certeza que deseja eliminar o aviso <strong>"{confirmDelete?.titulo}"</strong>?</p>
      </Modal>
    </>
  );
}
