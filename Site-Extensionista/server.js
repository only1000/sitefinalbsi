const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão MySQL
const db = mysql.createPool({
  host: "localhost",
  user: "root",      // coloque seu usuário MySQL
  password: "",    // coloque sua senha
  database: "sys"
});

// 🔹 Criação automática da tabela se não existir
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS acessos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip VARCHAR(45),
    user_agent VARCHAR(255),
    pagina VARCHAR(255),
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

// Servir arquivos estáticos
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/script", express.static(path.join(__dirname, "public/script")));
app.use("/img", express.static(path.join(__dirname, "public/img")));
app.use("/", express.static(path.join(__dirname, "public/html")));

// Registrar acesso
app.post("/api/acesso", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const pagina = req.body.pagina || "desconhecida";

  const sql = "INSERT INTO acessos (ip, user_agent, pagina) VALUES (?, ?, ?)";
  db.query(sql, [ip, userAgent, pagina], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ sucesso: true, id: result.insertId });
  });
});

// Consultar estatísticas
app.get("/api/acessos", (req, res) => {
  const sql = `
    SELECT pagina, COUNT(*) AS total,
           MIN(data_hora) AS primeiro_acesso,
           MAX(data_hora) AS ultimo_acesso
    FROM acessos
    GROUP BY pagina
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Iniciar servidor
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
