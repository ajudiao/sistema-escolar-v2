// Dados fictícios para simulação - migrados do global.js original

export const demoUsers = [
  { username: 'admin', password: 'admin123', profile: 'admin' },
  { username: 'prof1', password: 'prof123', profile: 'professor' },
  { username: 'aluno1', password: 'aluno123', profile: 'aluno' },
];

export const redirectMap = {
  admin: '/admin/dashboard',
  professor: '/professor/dashboard',
  aluno: '/aluno/dashboard',
};

export const alunos = {
  '7A': [
    { numero: 1, nome: 'Ana Maria Santos', sexo: 'F' },
    { numero: 2, nome: 'António José Fernandes', sexo: 'M' },
    { numero: 3, nome: 'Beatriz Luísa Campos', sexo: 'F' },
    { numero: 4, nome: 'Carlos Eduardo Neto', sexo: 'M' },
    { numero: 5, nome: 'Diana Isabel Sousa', sexo: 'F' },
    { numero: 6, nome: 'Eduardo Manuel Silva', sexo: 'M' },
    { numero: 7, nome: 'Francisca Rosa Lima', sexo: 'F' },
    { numero: 8, nome: 'Gabriel Pedro Costa', sexo: 'M' },
    { numero: 9, nome: 'Helena Paula Ribeiro', sexo: 'F' },
    { numero: 10, nome: 'Igor António Mendes', sexo: 'M' },
  ],
  '8B': [
    { numero: 1, nome: 'Alberto João Dias', sexo: 'M' },
    { numero: 2, nome: 'Bruna Mariana Xavier', sexo: 'F' },
    { numero: 3, nome: 'César Augusto Pinto', sexo: 'M' },
    { numero: 4, nome: 'Daniela Patrícia Lopes', sexo: 'F' },
    { numero: 5, nome: 'Emanuel Francisco Ramos', sexo: 'M' },
  ],
  '10A': [
    { numero: 1, nome: 'Adriana Sofia Machado', sexo: 'F' },
    { numero: 2, nome: 'Bruno Alexandre Tavares', sexo: 'M' },
    { numero: 3, nome: 'Catarina Isabel Vieira', sexo: 'F' },
    { numero: 4, nome: 'David Fernando Cunha', sexo: 'M' },
    { numero: 5, nome: 'Elisa Margarida Rocha', sexo: 'F' },
  ],
};

export const classes = ['7ª', '8ª', '9ª', '10ª', '11ª', '12ª'];

export const turmas = {
  '7ª': ['A', 'B', 'C'],
  '8ª': ['A', 'B'],
  '9ª': ['A', 'B', 'C'],
  '10ª': ['A', 'B'],
  '11ª': ['A', 'B'],
  '12ª': ['A'],
};

export const cursos = [
  'Ciências Físicas e Biológicas',
  'Ciências Económicas e Jurídicas',
  'Ciências Humanas',
  'Artes Visuais',
];

export const disciplinas = [
  'Língua Portuguesa', 'Matemática', 'Física', 'Química',
  'Biologia', 'Geografia', 'História', 'Inglês',
  'Francês', 'Educação Física', 'Filosofia', 'Sociologia',
];

export const periodos = ['Manhã', 'Tarde', 'Noite'];

export const avisos = [
  {
    id: 1,
    titulo: 'Início do Ano Lectivo 2026/2025',
    conteudo: 'Informamos que o ano lectivo 2026/2025 terá início no dia 4 de Fevereiro de 2026. Todos os alunos devem comparecer devidamente uniformizados.',
    data: '2026-01-25',
    autor: 'Direcção',
    tipo: 'geral',
    lido: false,
  },
  {
    id: 2,
    titulo: 'Reunião de Encarregados de Educação',
    conteudo: 'Convocam-se todos os encarregados de educação para uma reunião no dia 10 de Fevereiro de 2026, às 14h00, no anfiteatro da escola.',
    data: '2026-02-01',
    autor: 'Direcção Pedagógica',
    tipo: 'encarregados',
    lido: false,
  },
  {
    id: 3,
    titulo: 'Entrega das Mini-Pautas do I Trimestre',
    conteudo: 'Lembra-se a todos os professores que a data limite para entrega das mini-pautas do I Trimestre é dia 30 de Abril de 2026.',
    data: '2026-04-15',
    autor: 'Secretaria Pedagógica',
    tipo: 'professores',
    lido: true,
  },
  {
    id: 4,
    titulo: 'Provas Trimestrais',
    conteudo: 'As provas trimestrais do I Trimestre decorrerão de 22 a 26 de Abril de 2026. O calendário detalhado será afixado nos placards.',
    data: '2026-04-10',
    autor: 'Direcção Pedagógica',
    tipo: 'geral',
    lido: true,
  },
];

export const professorLogado = {
  nome: 'João Manuel Ferreira',
  initials: 'JF',
  bi: '000123456LA789',
  email: 'joao.ferreira@escola.med.ao',
  telefone: '+244 923 456 789',
  disciplinas: ['Matemática', 'Física'],
  turmasLecionadas: [
    { classe: '7ª', turma: 'A', disciplina: 'Matemática' },
    { classe: '8ª', turma: 'B', disciplina: 'Matemática' },
    { classe: '10ª', turma: 'A', disciplina: 'Física' },
  ],
};

export const alunoLogado = {
  nome: 'Maria Santos',
  initials: 'MS',
  numero: 1,
  turma: 'EIA-11AD',
  classe: '11ª',
  curso: 'Ciências Físicas e Biológicas',
  periodo: 'Manhã',
  email: 'maria.santos@aluno.escola.med.ao',
};

export const notasAluno = [
  { disciplina: 'Matemática', professor: 'Prof. João Ferreira', mac: 14, npp: 15, npt: 16, media: 15 },
  { disciplina: 'Física', professor: 'Prof. João Ferreira', mac: 12, npp: 13, npt: 14, media: 13 },
  { disciplina: 'Química', professor: 'Prof. Ana Rodrigues', mac: 13, npp: 14, npt: 15, media: 14 },
  { disciplina: 'Biologia', professor: 'Prof. Carlos Neto', mac: 16, npp: 15, npt: 17, media: 16 },
  { disciplina: 'Língua Portuguesa', professor: 'Prof. Maria Gomes', mac: 12, npp: 11, npt: 13, media: 12 },
  { disciplina: 'Inglês', professor: 'Prof. Sandra Lima', mac: 15, npp: 16, npt: 14, media: 15 },
];

export const faltasAluno = [
  { disciplina: 'Matemática', faltas: 2, limite: 10, status: 'OK' },
  { disciplina: 'Física', faltas: 1, limite: 10, status: 'OK' },
  { disciplina: 'Química', faltas: 0, limite: 10, status: 'OK' },
  { disciplina: 'Biologia', faltas: 1, limite: 10, status: 'OK' },
  { disciplina: 'Língua Portuguesa', faltas: 1, limite: 10, status: 'OK' },
];

export const professoresList = [
  { id: 1, nome: 'Maria João', email: 'maria.joao@escola.med.ao', telefone: '+244 923 000 002', disciplinas: 'Matemática', turmas: [1, 3], status: 'Activo' },
  { id: 2, nome: 'Joaquim Silva', email: 'joaquim.silva@escola.med.ao', telefone: '+244 923 000 003', disciplinas: 'Física', turmas: [2], status: 'Activo' },
  { id: 3, nome: 'Ana Rodrigues', email: 'ana.rodrigues@escola.med.ao', telefone: '+244 923 000 004', disciplinas: 'Química', turmas: [1, 2], status: 'Activo' },
  { id: 4, nome: 'Carlos Neto', email: 'carlos.neto@escola.med.ao', telefone: '+244 923 000 005', disciplinas: 'Biologia', turmas: [3], status: 'Activo' },
  { id: 5, nome: 'Sandra Lima', email: 'sandra.lima@escola.med.ao', telefone: '+244 923 000 006', disciplinas: 'Inglês', turmas: [1, 2, 3], status: 'Activo' },
];

export const turmasList = [
  { id: 1, nome: '7ª A', classe: '7ª', turma: 'A', curso: 'Ciências Físicas e Biológicas', periodo: 'Manhã', total: 35, professor: 'Maria João' },
  { id: 2, nome: '8ª B', classe: '8ª', turma: 'B', curso: 'Ciências Económicas e Jurídicas', periodo: 'Tarde', total: 30, professor: 'Joaquim Silva' },
  { id: 3, nome: '10ª A', classe: '10ª', turma: 'A', curso: 'Ciências Humanas', periodo: 'Manhã', total: 28, professor: 'Ana Rodrigues' },
  { id: 4, nome: '11ª A', classe: '11ª', turma: 'A', curso: 'Ciências Físicas e Biológicas', periodo: 'Manhã', total: 32, professor: 'Carlos Neto' },
  { id: 5, nome: '12ª A', classe: '12ª', turma: 'A', curso: 'Artes Visuais', periodo: 'Tarde', total: 25, professor: 'Sandra Lima' },
];

export const alunosList = [
  { id: 1, nome: 'Ana Maria Santos', numero: 1, turma: '11ª A', curso: 'CFB', periodo: 'Manhã', status: 'Activo' },
  { id: 2, nome: 'António José Fernandes', numero: 2, turma: '11ª A', curso: 'CFB', periodo: 'Manhã', status: 'Activo' },
  { id: 3, nome: 'Beatriz Luísa Campos', numero: 3, turma: '12ª A', curso: 'CEJ', periodo: 'Tarde', status: 'Activo' },
  { id: 4, nome: 'Carlos Eduardo Neto', numero: 4, turma: '10ª A', curso: 'CH', periodo: 'Manhã', status: 'Activo' },
  { id: 5, nome: 'Diana Isabel Sousa', numero: 5, turma: '8ª B', curso: 'CFB', periodo: 'Tarde', status: 'Activo' },
];

export const disciplinasList = [
  { id: 1, nome: 'Matemática', codigo: 'MAT', cargaHoraria: 4, professores: 3 },
  { id: 2, nome: 'Física', codigo: 'FIS', cargaHoraria: 3, professores: 2 },
  { id: 3, nome: 'Química', codigo: 'QUI', cargaHoraria: 3, professores: 2 },
  { id: 4, nome: 'Biologia', codigo: 'BIO', cargaHoraria: 3, professores: 2 },
  { id: 5, nome: 'Língua Portuguesa', codigo: 'LP', cargaHoraria: 5, professores: 4 },
  { id: 6, nome: 'Inglês', codigo: 'ING', cargaHoraria: 3, professores: 3 },
  { id: 7, nome: 'História', codigo: 'HIS', cargaHoraria: 2, professores: 2 },
  { id: 8, nome: 'Geografia', codigo: 'GEO', cargaHoraria: 2, professores: 1 },
];

export const cursosList = [
  { id: 1, nome: 'Ciências Físicas e Biológicas', codigo: 'CFB', turmas: 4, alunos: 120 },
  { id: 2, nome: 'Ciências Económicas e Jurídicas', codigo: 'CEJ', turmas: 3, alunos: 90 },
  { id: 3, nome: 'Ciências Humanas', codigo: 'CH', turmas: 3, alunos: 85 },
  { id: 4, nome: 'Artes Visuais', codigo: 'AV', turmas: 2, alunos: 50 },
];

export const usuariosSistema = [
  { id: 1, nome: 'Administrador Principal', username: 'admin', perfil: 'Admin', email: 'admin@escola.med.ao', status: 'Activo' },
  { id: 2, nome: 'João Manuel Ferreira', username: 'prof1', perfil: 'Professor', email: 'joao.ferreira@escola.med.ao', status: 'Activo' },
  { id: 3, nome: 'Maria Santos', username: 'aluno1', perfil: 'Aluno', email: 'maria.santos@aluno.escola.med.ao', status: 'Activo' },
  { id: 4, nome: 'Maria João', username: 'prof2', perfil: 'Professor', email: 'maria.joao@escola.med.ao', status: 'Activo' },
];
