const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

app.get('/', function(req, res) {
  con.query("SELECT nome, criado_em FROM usuarios", function (err, result, fields) {
    if (err) {
      console.log(err);
      res.json(err);
    };
    res.json(result);
  }); 
});

app.post('/', function(req, res) {
  con.query("INSERT INTO usuarios (nome, criado_em) VALUES (?)", [[req.body.nome, req.body.data]] , function (err, result, fields) {
    if (err) {
      console.log(err);
      res.json(err);
    };
    res.json("Número de tabelas inseridas: " + result.affectedRows);
  }); 
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);