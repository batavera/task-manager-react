# 🚀 Task Manager App

Aplicação de gerenciamento de tarefas desenvolvida com foco em prática de **CRUD**, **integração com API** e **componentização em React**.

---

## 📸 Demonstração

> Interface simples, funcional e responsiva para gerenciamento de tarefas com persistência de dados.

---

## ✨ Funcionalidades

* ✅ Criar novas tarefas
* ✏️ Editar tarefas existentes (duplo clique)
* ✔️ Marcar como concluída
* ❌ Remover tarefas
* 💾 Persistência com API (JSON Server)
* 🔄 Atualização em tempo real da interface
* ⏳ Feedback de carregamento (UX)

---

## 🛠️ Tecnologias utilizadas

* **React**
* **JavaScript (ES6+)**
* **Vite**
* **JSON Server**
* **CSS**

---

## 🧱 Arquitetura do projeto

```
src/
 ├── components/
 │    ├── PrivateRoute.jsx
 │    └── TaskItem.jsx
 │
 ├── pages/
 │    └── Dashboard.jsx
 │
 ├── services/
 │    └── api.js
 │
 └── App.jsx
```

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/batavera/task-manager-react
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Inicie o front-end

```bash
npm run dev
```

---

### 4. Inicie a API (JSON Server)

```bash
npx json-server --watch db.json --port 3000
```

---

## 🌐 Endpoints da API

* `GET /tasks` → lista tarefas
* `POST /tasks` → cria tarefa
* `PUT /tasks/:id` → atualiza tarefa
* `DELETE /tasks/:id` → remove tarefa

---

## 📌 Objetivo do projeto

Este projeto foi desenvolvido com foco em:

* Prática de operações CRUD
* Consumo de API REST
* Organização de código com componentização
* Simulação de um fluxo real de aplicação

---

## 🚧 Melhorias futuras

* 🔄 Loading individual por tarefa
* 🎨 Melhorias de UI/UX
* 🔐 Autenticação real com backend
* ☁️ Integração com API real (Node.js / banco de dados)

---

## 👨‍💻 Autor

Desenvolvido por **Fernando Camacho**

---

## 📄 Licença

Este projeto está sob a licença MIT.
