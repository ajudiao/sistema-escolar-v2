import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProfessores from './pages/admin/Professores';
import AdminTurmas from './pages/admin/Turmas';
import AdminAlunos from './pages/admin/Alunos';
import AdminAvisos from './pages/admin/Avisos';
import AdminNotasDetalhes from './pages/admin/NotasDetalhes';
import {
  AdminNotas, AdminAnáliseNotas, AdminDisciplinas, AdminCursos,
  AdminUsuarios, AdminPerfil
} from './pages/admin/AdminPages';

// Professor pages
import {
  ProfessorDashboard, ProfessorTurmas, ProfessorNotas,
  ProfessorFaltas, ProfessorAvisos, ProfessorPerfil
} from './pages/professor/ProfessorPages';
import ProfessorTurmaDetalhes from './pages/professor/TurmaDetalhes';

// Aluno pages
import {
  AlunoDashboard, AlunoNotas, AlunoFaltas, AlunoAvisos, AlunoPerfil
} from './pages/aluno/AlunoPages';

import './styles/global.css';

// Protected route wrapper
function ProtectedRoute({ profile, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.profile !== profile) return <Navigate to={`/${user.profile}/dashboard`} replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute profile="admin">
          <Layout profile="admin" />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="avisos" element={<AdminAvisos canEdit={true} />} />
        <Route path="professores" element={<AdminProfessores />} />
        <Route path="turmas" element={<AdminTurmas />} />
        <Route path="alunos" element={<AdminAlunos />} />
        <Route path="notas" element={<AdminNotas />} />
        <Route path="analise-notas" element={<AdminAnáliseNotas />} />
        <Route path="notas-detalhes" element={<AdminNotasDetalhes />} />
        <Route path="disciplinas" element={<AdminDisciplinas />} />
        <Route path="cursos" element={<AdminCursos />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="perfil" element={<AdminPerfil />} />
      </Route>

      {/* Professor routes */}
      <Route path="/professor" element={
        <ProtectedRoute profile="professor">
          <Layout profile="professor" />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ProfessorDashboard />} />
        <Route path="turmas" element={<ProfessorTurmas />} />
        <Route path="notas" element={<ProfessorNotas />} />
        <Route path="faltas" element={<ProfessorFaltas />} />
        <Route path="turma-detalhes" element={<ProfessorTurmaDetalhes />} />
        <Route path="avisos" element={<ProfessorAvisos />} />
        <Route path="perfil" element={<ProfessorPerfil />} />
      </Route>

      {/* Aluno routes */}
      <Route path="/aluno" element={
        <ProtectedRoute profile="aluno">
          <Layout profile="aluno" />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AlunoDashboard />} />
        <Route path="notas" element={<AlunoNotas />} />
        <Route path="faltas" element={<AlunoFaltas />} />
        <Route path="avisos" element={<AlunoAvisos />} />
        <Route path="perfil" element={<AlunoPerfil />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
