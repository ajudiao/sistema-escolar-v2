import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notasAluno, turmasList, disciplinas } from '../../data/dados';

const pautas = [
  {
    id: '001', disciplina: 'Matemática', turma: '10A', trimestre: '1º Trimestre',
    notas: [
      { aluno: 'Ana Pereira',    mac: 15, npp: 14, npt: 16 },
      { aluno: 'Pedro Santos',   mac: 12, npp: 12, npt: 12 },
      { aluno: 'João Carlos',    mac: 9,  npp: 10, npt: 8  },
      { aluno: 'Mariana Sousa',  mac: 17, npp: 16, npt: 18 },
      { aluno: 'Eduardo Lima',   mac: 11, npp: 13, npt: 12 },
    ],
  },
  {
    id: '002', disciplina: 'Física', turma: '8B', trimestre: '1º Trimestre',
    notas: [
      { aluno: 'Sofia Neto',     mac: 14, npp: 13, npt: 15 },
      { aluno: 'Ricardo Faria',  mac: 10, npp: 11, npt: 9  },
      { aluno: 'Catarina Reis',  mac: 16, npp: 15, npt: 17 },
    ],
  },
];

function calcMedia(n) {
  return ((n.mac + n.npp + n.npt) / 3).toFixed(1);
}

export default function AdminNotasDetalhes() {
  const navigate = useNavigate();
  const [selectedPauta, setSelectedPauta] = useState(null);
  const [search, setSearch] = useState('');

  const pauta = pautas.find(p => p.id === selectedPauta);

  const filteredNotas = pauta
    ? pauta.notas.filter(n => n.aluno.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Detalhes de Notas</h2>
        <p className="page-subtitle">Consulta detalhada por pauta</p>
      </div>

      {/* Selector */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Seleccionar Pauta</label>
              <select
                className="form-control form-select"
                value={selectedPauta || ''}
                onChange={e => { setSelectedPauta(e.target.value || null); setSearch(''); }}
              >
                <option value="">Escolher pauta...</option>
                {pautas.map(p => (
                  <option key={p.id} value={p.id}>
                    Pauta {p.id} — {p.disciplina} ({p.turma})
                  </option>
                ))}
              </select>
            </div>
            {pauta && (
              <div className="col-md-4">
                <label className="form-label">Pesquisar aluno</label>
                <input
                  className="form-control"
                  placeholder="Nome do aluno..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {pauta && (
        <>
          {/* Summary cards */}
          <div className="row g-3 mb-4">
            {[
              { label: 'Pauta', value: pauta.id },
              { label: 'Disciplina', value: pauta.disciplina },
              { label: 'Turma', value: pauta.turma },
              { label: 'Trimestre', value: pauta.trimestre },
            ].map(item => (
              <div className="col-md-3" key={item.label}>
                <div className="p-3 rounded bg-light border">
                  <small className="text-uppercase text-muted">{item.label}</small>
                  <div className="h4 mb-0 mt-2">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Notes table */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Notas da Pauta</h5>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate('/admin/notas')}
              >
                ← Voltar
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Aluno</th>
                      <th className="text-center">MAC</th>
                      <th className="text-center">NPP</th>
                      <th className="text-center">NPT</th>
                      <th className="text-center">Média</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotas.map((n, i) => {
                      const media = parseFloat(calcMedia(n));
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td><strong>{n.aluno}</strong></td>
                          <td className="text-center">{n.mac}</td>
                          <td className="text-center">{n.npp}</td>
                          <td className="text-center">{n.npt}</td>
                          <td className="text-center">
                            <strong className={media >= 10 ? 'text-success' : 'text-danger'}>{media}</strong>
                          </td>
                          <td className="text-center">
                            <span className={`badge ${media >= 10 ? 'badge-success' : 'badge-danger'}`}>
                              {media >= 10 ? 'Positiva' : 'Negativa'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredNotas.length === 0 && (
                      <tr><td colSpan={7} className="text-center text-muted py-4">Nenhum aluno encontrado.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {!pauta && (
        <div className="card">
          <div className="card-body text-center py-5 text-muted">
            Seleccione uma pauta para ver os detalhes das notas.
          </div>
        </div>
      )}
    </>
  );
}
