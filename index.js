const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
var con = mysql.createConnection({
  host: 'BDFAETERJ',
  user: 'root',
  password: 'root',
  database: 'faeterj'
});

con.connect(err => {
 if(err){console.log(err)}else{
  console.log("AGORA FOI KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")}
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

/*app.get('/',(req,res)=>{
  res.send("num é que foi kkkkk")
})
*/


app.post('/', (req, res)=> {
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