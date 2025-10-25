# 🧠 BSI - Bacharelado em Sistemas de Informação

Site do curso **BSI** com integração a banco de dados MySQL e servidor Node.js.

---

## 🚀 Requisitos

Antes de iniciar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [MySQL](https://www.mysql.com/)
- Git (opcional)

---

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/bsi-site.git
   cd bsi-site
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

---

## ⚙️ Configuração do banco de dados

1. Crie um banco de dados no MySQL (exemplo: `bsi`).
2. Atualize o arquivo de conexão no projeto conforme necessário, por exemplo:

   ```js
   const db = mysql.createPool({
     host: "localhost",
     user: "root",
     password: "",
     database: "bsi"
   });
   ```

3. Certifique-se de que o MySQL esteja rodando antes de iniciar o servidor.

---

## 🧩 Estrutura do projeto

```
bsi-site/
│
├── server.js              # Arquivo principal do servidor Node.js
├── package.json           # Dependências e scripts npm
├── /public                # Arquivos estáticos (HTML, CSS, JS, imagens)
│   ├── css/
│   ├── js/
│   ├── img/
│   └── videos/
└── /node_modules          # Criada automaticamente após npm install
```

---

## ▶️ Executar o servidor

1. Para iniciar o servidor:
   ```bash
   node server.js
   ```

2. Ou (se configurado no `package.json`):
   ```bash
   npm run server
   ```

---

## 🌐 Acessar o site

Após iniciar o servidor, acesse no navegador:

```
http://localhost:3000
```

(Ou na porta configurada dentro do `server.js`)

---

## 🧠 Tecnologias utilizadas

- **Node.js** – Ambiente de execução JavaScript
- **Express.js** – Framework para servidor web
- **MySQL2** – Driver MySQL para Node.js
- **CORS** – Controle de acesso entre origens
- **HTML / CSS / JS** – Estrutura do frontend

---

## 🛠️ Dependências principais

Instaladas automaticamente com `npm install`:

```
npm install express mysql2 cors path
```

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos.  
Todos os direitos reservados © 2025 - BSI.
