# 🎓 Sistema de Gestão Escolar (SGE)

Sistema web para gestão escolar desenvolvido para fins de aprendizado, com foco em integração entre frontend e API.

---

## 📌 Visão Geral

O Sistema de Gestão Escolar (SGE) permite gerir alunos, professores, turmas e disciplinas de forma simples e organizada.

Este projeto é dividido em:

* 🎨 **Frontend:** HTML, CSS, Bootstrap 5 e JavaScript
* ⚙️ **Backend (API):** NestJS (consumida via HTTP)

---

## 🎯 Objetivo do Projeto

Este sistema foi desenvolvido com fins educacionais para:

* Praticar consumo de APIs REST
* Trabalhar com manipulação de DOM
* Aplicar Bootstrap 5 em interfaces reais
* Entender arquitetura cliente-servidor

---

## 👥 Tipos de Utilizadores

### 👨‍💼 Administrador

* Gerir professores, alunos e turmas
* Criar disciplinas
* Associar entidades

### 👨‍🏫 Professor

* Visualizar turmas
* Consultar disciplinas
* Notas (via API)

### 👨‍🎓 Aluno

* Consultar notas
* Ver disciplinas
* Acompanhar dados académicos

---

## 🧩 Funcionalidades

* 📚 Cadastro de Disciplinas
* 🏫 Gestão de Turmas
* 👨‍🏫 Gestão de Professores
* 👨‍🎓 Gestão de Alunos
* 🔗 Relacionamento entre entidades
* 🌐 Consumo de API REST

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript (Vanilla)

### Backend (API)

* NestJS
* REST API

---

## 🔗 Integração com API

O frontend comunica com a API através de requisições HTTP usando `fetch`.

### 📌 Link da API

```
https://SEU-LINK-DA-API-AQUI.com
```

---

## 📡 Exemplo de Consumo da API

```javascript id="api-example"
fetch('https://SEU-LINK-DA-API-AQUI.com/disciplinas')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error(error));
```

---

## 📁 Estrutura do Projeto

```bash id="proj-struct"
📁 projeto-sge
│
├── index.html
├── professores.html
├── alunos.html
├── turmas.html
├── disciplinas.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── api.js
│   ├── professores.js
│   ├── alunos.js
│   └── disciplinas.js
│
└── assets/
```

---

## ▶️ Como Executar

1. Clonar o repositório:

```bash id="clone"
git clone https://github.com/seu-repo/sge-frontend.git
```

2. Abrir o projeto:

* Basta abrir o arquivo `index.html` no navegador

3. Garantir que a API está ativa:

* A API (NestJS) deve estar rodando localmente ou online

---

## ⚠️ Observações Importantes

* Este projeto **não possui backend próprio no frontend**
* Todas as operações dependem da API
* Certifique-se que o CORS está habilitado na API

---

## 🚀 Aprendizados Envolvidos

* Consumo de APIs REST
* Organização de frontend sem framework
* Manipulação de formulários
* Estruturação de sistemas reais
* Integração frontend + backend

---

## 🔮 Melhorias Futuras

* Autenticação (JWT)
* Dashboard administrativo
* Upload de arquivos
* Validação avançada de formulários
* Migração para framework (React/Vue)

---

## 📌 Status do Projeto

🚧 Em desenvolvimento (Projeto educacional)

---

## 📄 Licença

Projeto criado para fins de aprendizado.

---
