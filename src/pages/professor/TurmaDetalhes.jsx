import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { professorLogado, alunos } from '../../data/dados';

const turmasData = [
  {
    codigo: '7A',
    nome: '7ª A',
    curso: 'Ciências Físicas e Biológicas',
    classe: '7ª',
    turno: 'Matutino',
    sala: 'Bloco A - Sala 101',
    criacao: '10 de Janeiro de 2026',
    diretor: { nome: 'Maria João dos Santos', especialidade: 'Matemática', email: 'maria.joao@escola.med.ao', telefone: '+244 923 000 002' },
  },
  {
    codigo: '8B',
    nome: '8ª B',
    curso: 'Ciências Económicas e Jurídicas',
    classe: '8ª',
    turno: 'Vespertino',
    sala: 'Bloco B - Sala 203',
    criacao: '10 de Janeiro de 2026',
    diretor: { nome: 'Joaquim Silva', especialidade: 'Física', email: 'joaquim.silva@escola.med.ao', telefone: '+244 923 000 003' },
  },
  {
    codigo: '10A',
    nome: '10ª A',
    curso: 'Ciências Humanas',
    classe: '10ª',
    turno: 'Matutino',
    sala: 'Bloco C - Sala 305',
    criacao: '10 de Janeiro de 2026',
    diretor: { nome: 'Ana Rodrigues', especialidade: 'Química', email: 'ana.rodrigues@escola.med.ao', telefone: '+244 923 000 004' },
  },
];

export default function ProfessorTurmaDetalhes() {
  const navigate = useNavigate();
  const prof = professorLogado;
  const [selectedCodigo, setSelectedCodigo] = useState('');

  const turma = turmasData.find(t => t.codigo === selectedCodigo);
  const alunosDaTurma = selectedCodigo ? (alunos[selectedCodigo] || []) : [];

  return (
    <>
      <div className="page-header mb-4">
        <h2 className="page-title">Detalhes da Turma</h2>
        <p className="page-subtitle">Informações detalhadas sobre a turma</p>
      </div>

      {/* Selector */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Seleccionar Turma</label>
              <select
                className="form-control form-select"
                value={selectedCodigo}
                onChange={e => setSelectedCodigo(e.target.value)}
              >
                <option value="">Escolher turma...</option>
                {prof.turmasLecionadas.map((t, i) => (
                  <option key={i} value={`${t.classe.replace('ª', '')}${t.turma}`}>
                    {t.classe} {t.turma} — {t.disciplina}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <button className="btn btn-outline-secondary" onClick={() => navigate('/professor/turmas')}>
                ← Voltar às Turmas
              </button>
            </div>
          </div>
        </div>
      </div>

      {turma && (
        <>
          {/* Header */}
          <div className="card mb-4" style={{ background: 'linear-gradient(135deg, #1a4480, #0d2f5c)', color: 'white' }}>
            <div className="card-body py-4">
              <h2 className="mb-1" style={{ color: 'white' }}>{turma.nome}</h2>
              <p className="mb-0" style={{ opacity: 0.85 }}>{turma.curso}</p>
            </div>
          </div>

          {/* Info grid */}
          <div className="card mb-4">
            <div className="card-header"><h5 className="card-title mb-0">Informações da Turma</h5></div>
            <div className="card-body">
              <div className="row g-3">
                {[
                  { label: 'Código da Turma', value: turma.nome },
                  { label: 'Curso', value: turma.curso },
                  { label: 'Classe', value: turma.classe },
                  { label: 'Turno', value: turma.turno },
                  { label: 'Sala de Aula', value: turma.sala },
                  { label: 'Data de Criação', value: turma.criacao },
                ].map(item => (
                  <div className="col-md-4" key={item.label}>
                    <div className="p-3 rounded bg-light border">
                      <small className="text-muted text-uppercase">{item.label}</small>
                      <div className="fw-bold mt-1">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Director de turma */}
          <div className="card mb-4">
            <div className="card-header"><h5 className="card-title mb-0">Director de Turma</h5></div>
            <div className="card-body">
              <div className="row g-3">
                {Object.entries({
                  Nome: turma.diretor.nome,
                  Especialidade: turma.diretor.especialidade,
                  Email: turma.diretor.email,
                  Telefone: turma.diretor.telefone,
                }).map(([label, value]) => (
                  <div className="col-md-3" key={label}>
                    <label className="form-label fw-bold">{label}</label>
                    <p className="mb-0">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alunos */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                Alunos Inscritos ({alunosDaTurma.length} alunos)
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr><th>Nº</th><th>Nome</th><th>Sexo</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {alunosDaTurma.length > 0 ? alunosDaTurma.map(a => (
                      <tr key={a.numero}>
                        <td>{a.numero}</td>
                        <td><strong>{a.nome}</strong></td>
                        <td>{a.sexo === 'F' ? 'Feminino' : 'Masculino'}</td>
                        <td><span className="badge badge-success">Activo</span></td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4} className="text-center text-muted py-4">Sem alunos registados para esta turma.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {!turma && selectedCodigo === '' && (
        <div className="card">
          <div className="card-body text-center py-5 text-muted">
            Seleccione uma turma para ver os detalhes.
          </div>
        </div>
      )}
    </>
  );
}
