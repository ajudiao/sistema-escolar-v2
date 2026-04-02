# 🎓 Sistema de Gestão Escolar (SGE)

Sistema web para gestão escolar, permitindo o controlo centralizado de alunos, professores, turmas, disciplinas e processos académicos.

---

## 📌 Visão Geral

O Sistema de Gestão Escolar (SGE) foi desenvolvido para digitalizar e automatizar processos administrativos e académicos de instituições de ensino.

O sistema possui três tipos principais de utilizadores:

* 👨‍💼 **Administrador**
* 👨‍🏫 **Professor**
* 👨‍🎓 **Aluno**

Cada perfil possui permissões e funcionalidades específicas.

---

## 🎯 Objetivos

* Centralizar informações académicas
* Reduzir processos manuais
* Melhorar a comunicação entre escola, professores e alunos
* Facilitar gestão de turmas, disciplinas e avaliações

---

## 👥 Tipos de Utilizadores

### 🔹 Administrador

Responsável pela gestão global do sistema.

**Permissões:**

* Gerir professores, alunos e turmas
* Criar e editar disciplinas
* Associar disciplinas a cursos
* Definir horários e salas
* Gerir anos letivos
* Acompanhar relatórios

---

### 🔹 Professor

Responsável pela gestão académica das suas turmas.

**Permissões:**

* Visualizar turmas atribuídas
* Registar notas
* Marcar presenças
* Consultar disciplinas
* Atualizar informações básicas

---

### 🔹 Aluno

Utilizador final do sistema.

**Permissões:**

* Consultar notas
* Ver horários
* Acompanhar disciplinas
* Visualizar informações pessoais

---

## 🧩 Funcionalidades Principais

* 📚 Gestão de Disciplinas
* 🏫 Gestão de Turmas
* 👨‍🏫 Gestão de Professores
* 👨‍🎓 Gestão de Alunos
* 🗓️ Gestão de Ano Letivo
* 🧾 Registo de Notas
* 📊 Relatórios Académicos
* 🧑‍🤝‍🧑 Associação entre entidades (Curso ↔ Disciplina ↔ Turma)

---

## 🗄️ Estrutura do Sistema (Entidades)

### Principais tabelas:

* `usuarios`
* `professores`
* `alunos`
* `turmas`
* `disciplinas`
* `cursos`
* `notas`
* `presencas`

### Relações importantes:

* Curso ↔ Disciplina (N:N)
* Turma ↔ Aluno (1:N)
* Professor ↔ Turma (1:N)
* Turma ↔ Disciplina (N:N)

---

## 🏗️ Arquitetura

* **Frontend:** HTML, Bootstrap 5, JavaScript
* **Backend:** (PHP / Node.js / outro)
* **Base de Dados:** MySQL
* **API:** RESTful

---

## 🖥️ Interface

* Interface responsiva
* Uso de modais para criação/edição
* Layout organizado por módulos
* UX focada em simplicidade e produtividade

---

## 🔐 Autenticação e Permissões

* Sistema de login com níveis de acesso
* Controle por perfil (Admin, Professor, Aluno)
* Proteção de rotas no backend

---

## ⚙️ Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-repo/sge.git

# Entrar no projeto
cd sge

# Instalar dependências (se aplicável)
npm install
```

Configurar base de dados:

```sql
CREATE DATABASE sge;
```

---

## ▶️ Execução

```bash
# Iniciar servidor
npm start
```

Ou configurar servidor local (XAMPP, Laragon, etc.)

---

## 📊 Boas Práticas Aplicadas

* Separação de responsabilidades
* Uso de tabelas relacionais (normalização)
* Interface limpa com Bootstrap
* Estrutura modular
* Preparado para escalabilidade

---

## 🚀 Futuras Melhorias

* 📱 Aplicação mobile
* 📧 Notificações por email
* 📈 Dashboard com métricas
* 📅 Gestão de horários avançada
* 💳 Integração com pagamentos (propinas)

---

## 🧑‍💻 Tecnologias Utilizadas

* HTML5
* CSS3 / Bootstrap 5
* JavaScript
* MySQL
* Backend (PHP ou Node.js)

---

## 📌 Observações

Este sistema foi desenvolvido com foco em instituições de ensino de pequeno a médio porte, podendo ser expandido conforme necessidade.

---

## 📄 Licença

Este projeto é de uso livre para fins educativos e institucionais.

---
