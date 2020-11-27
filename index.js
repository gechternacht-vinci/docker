const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
let con = mysql.createConnection({
  host: 'BDFAETERJ',
  user: 'root',
  password: 'root',
  database: 'faeterj'
});

con.connect(err => {
 if(err){console.log(err)}else{
  console.log("Connected")}
});


app.get('/', (req, res)=> {
  con.query("SELECT * FROM usuarios",(err, result, fields)=> {
    if (err) {
      console.log(err);
      res.json(err);
    };
    res.json(result);
  }); 
});



app.post('/', (req, res)=> {
  con.query("INSERT INTO usuarios (nome, criado_em) VALUES (?)", [[req.body.nome, req.body.data]] , (err, result, fields)=> {
    if (err) {
      console.log(err);
      res.json(err);
    };
    res.json("Tables: " + result.affectedRows);
  }); 
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
