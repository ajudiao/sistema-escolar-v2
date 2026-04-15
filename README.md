# Sistema de Escola Conectada — React

> Migração do projecto `sistema-escolar-v2` (HTML/CSS/JS puro) para **React 18 + React Router v6**.  
> A interface visual foi preservada integralmente — nenhuma mudança de design foi feita.

---

## Como executar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm start

# 3. Build para produção
npm run build
```

**Credenciais de demo:**

| Perfil       | Utilizador | Palavra-passe |
|-------------|------------|---------------|
| Coordenador | `admin`    | `admin123`    |
| Professor   | `prof1`    | `prof123`     |
| Aluno       | `aluno1`   | `aluno123`    |

---

## Estrutura do projecto

```
src/
├── App.jsx                        # Raiz com todas as rotas
├── index.js                       # Entry point React
├── context/
│   └── AuthContext.jsx            # Contexto de autenticação
├── components/
│   ├── Layout.jsx                 # Layout partilhado (sidebar + header)
│   ├── Sidebar.jsx                # Sidebar reactiva e colapsável
│   └── Modal.jsx                  # Componente modal reutilizável
├── data/
│   └── dados.js                   # Dados fictícios (migrados do global.js)
├── styles/
│   └── global.css                 # CSS original integralmente preservado
└── pages/
    ├── Login.jsx                  # Página de login
    ├── admin/
    │   ├── Dashboard.jsx          # Painel do coordenador
    │   ├── Professores.jsx        # CRUD de professores
    │   ├── Turmas.jsx             # CRUD de turmas
    │   ├── Alunos.jsx             # CRUD de alunos
    │   ├── Avisos.jsx             # Gestão de avisos (com edição)
    │   └── AdminPages.jsx         # Notas, Análise, Disciplinas,
    │                              # Cursos, Usuários, Perfil
    ├── professor/
    │   └── ProfessorPages.jsx     # Dashboard, Turmas, Notas,
    │                              # Faltas, Avisos, Perfil
    └── aluno/
        └── AlunoPages.jsx         # Dashboard, Notas, Faltas,
                                   # Avisos, Perfil
```

---

## O que mudou: HTML → React

### 1. Navegação (routing)

| Antes | Depois |
|-------|--------|
| Links `<a href="dashboard.html">` | `<NavLink to="/admin/dashboard">` com React Router v6 |
| Redirecionamento via `window.location.href` | `useNavigate()` hook |
| Cada `.html` era uma página separada | SPA com rotas aninhadas via `<Outlet>` |
| Sem protecção de rotas | `<ProtectedRoute>` verifica autenticação e perfil |

### 2. Estado e dados

| Antes | Depois |
|-------|--------|
| Variáveis globais `const DadosFicticios = {...}` em `global.js` | `src/data/dados.js` com exports ES6 |
| Login com `localStorage` e `window.location` | `AuthContext` com `useState` e `useNavigate` |
| Manipulação do DOM (`document.getElementById`, `innerHTML`) | `useState` + JSX declarativo |
| Dados hardcoded no HTML | Props e state React |

### 3. Sidebar

| Antes | Depois |
|-------|--------|
| Código duplicado em cada `.html` (>150 linhas repetidas) | Componente `<Sidebar>` único reutilizado em todos os perfis |
| Estado colapsado gerido com `classList.add/remove` | `useState` + `localStorage` para persistência |
| Overlay e eventos geridos em `sidebar.js` | Lógica encapsulada no próprio componente |
| Abrir/fechar mobile via `SidebarController.openMobile()` | Props `mobileOpen` e `onCloseMobile` |

### 4. Modais Bootstrap

| Antes | Depois |
|-------|--------|
| `data-bs-toggle="modal"` + `data-bs-target="#profModal"` | Componente `<Modal show={bool}>` controlado por `useState` |
| Preencher campos via `document.getElementById(...).value = ...` | Estado do formulário com `useState` e `onChange` |
| Bootstrap JS necessário para abrir/fechar | Lógica própria em React, sem dependência de Bootstrap JS para modais |

### 5. Formulários e CRUD

| Antes | Depois |
|-------|--------|
| `form.addEventListener('submit', ...)` | `onSubmit` handler nativo em JSX |
| `document.querySelector('.btn-edit').addEventListener(...)` | `onClick={() => openEdit(item)}` directo |
| Adicionar linhas à tabela via `tbody.innerHTML += ...` | Re-renderização automática por mudança de state |
| Sem validação reactiva | Validação em tempo real com state |

### 6. Layout

| Antes | Depois |
|-------|--------|
| `<aside>`, `<header>`, `<footer>` repetidos em cada ficheiro HTML | Componente `<Layout>` com `<Outlet>` para conteúdo das páginas |
| Título do header hardcoded em cada página | `pageTitles` map dinâmico baseado na rota actual |
| `margin-left` gerido manualmente via JS | Gerido pelo estado `collapsed` no `Sidebar` via CSS class |

### 7. CSS

| Antes | Depois |
|-------|--------|
| `global.css`, `sidebar.css`, `aluno.css`, `professor.css` separados | Todos fundidos em `src/styles/global.css` (importado uma vez em `App.jsx`) |
| Nenhuma alteração de estilos | **Zero alterações visuais** — design 100% preservado |

---

## Dependências adicionadas

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "react-scripts": "5.0.1"
}
```

Bootstrap 5 e Google Fonts continuam a ser carregados via CDN no `public/index.html`, tal como no projecto original.

---

## Funcionalidades por página

### Admin
- **Dashboard** — estatísticas gerais, distribuição de alunos, acesso rápido
- **Professores** — listagem, pesquisa, criar/editar/eliminar, ver detalhes (modal)
- **Turmas** — listagem com filtro por classe, CRUD completo
- **Alunos** — listagem, pesquisa, CRUD completo
- **Avisos** — criar/editar/eliminar avisos, filtrar por tipo, marcar como lido
- **Notas** — consulta por turma/disciplina
- **Análise de Notas** — estatísticas e médias por disciplina
- **Disciplinas** — CRUD de disciplinas
- **Cursos** — CRUD de cursos
- **Usuários do Sistema** — listagem de utilizadores
- **Perfil** — dados do coordenador

### Professor
- **Dashboard** — resumo de turmas, disciplinas e alunos
- **Minhas Turmas** — lista das turmas com cards e modal de detalhe
- **Notas** — lançamento de notas com inputs editáveis (MAC/NPP/NPT → média automática)
- **Faltas** — registo de faltas por turma
- **Avisos** — avisos gerais e para professores
- **Perfil** — dados pessoais e académicos

### Aluno
- **Dashboard** — banner de boas-vindas, stats, tabelas de notas e faltas recentes
- **Notas** — notas por trimestre (I/II/III)
- **Faltas** — faltas por disciplina com status
- **Avisos** — comunicados da escola
- **Perfil** — dados pessoais e académicos

---

## Notas de arquitectura

- **Sem backend**: todos os dados são fictícios e geridos em memória com `useState`. Em produção, substituir as importações de `dados.js` por chamadas à API REST.
- **Autenticação**: simulada em `AuthContext`. Em produção, integrar com JWT ou session tokens.
- **Persistência**: o estado de colapso da sidebar é guardado em `localStorage`. Os dados de tabelas são reiniciados ao recarregar a página (comportamento esperado em modo demo).
- **Bootstrap JS**: ainda é necessário via CDN apenas para componentes que usam classes CSS do Bootstrap (ex: `spinner-border`, `badge`). Os modais são geridos pelo React, não pelo Bootstrap JS.
