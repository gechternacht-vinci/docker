/****************************************************************************
 *                                                                          *
 *  FAETEC – FUNDAÇÃO DE APOIO À ESCOLA TÉCNICA DO ESTADO DO RIO DE JANEIRO *
 *  FAETERJ PETRÓPOLIS – DISCIPLINA SISTEMAS OPERACIONAIS 2                 *
 *                                                                          *
 *  Curso:      TIC FAETERJ Petrópolis                                      *
 *  Disciplina: SO2                                                         *
 *  Professor:  Henrique de Medeiros Kloh                                   *
 *                                                                          *
 *  Aluno:      Bruno Barreto Martins do Amaral                             *
 *  Matrícula:  1620486100013                                               *
 *  Email:      bamaral@faeterj-petropolis.edu.br                           *
 *                                                                          *
 *                                                                          *
 *  Aluno:      Gabriel Echternacht                                         *
 *  Email:      gechternacht@faeterj-petropolis.edu.br                      *
 *                                                                          *
 *                                                                          *
 *  Aluno:      Hélio Alonso Acacio Muniz                                   *
 *  Email:      hmuniz@faeterj-petropolis.edu.br                            *
 *                                                                          *
 *  Trabalho:   Node.js, MySQL e Docker                                     *
 *                                                                          *
 *  Enunciado:  O trabalho consiste na criação de um ambiente web formado   *
 *              por containers que contemple uma api em nodejs e um         *
 *              banco de dados mysql.                                       *
 *                                                                          *
 *              O trabalho deve contemplar os seguintes pontos:             *
 *                  - O trabalho é um grupo de ATÉ 3 PESSOAS, porém cada    *
 *                    aluno deve postar a sua atividade no classroom        *
 *                  - Espera-se que seja utilizado o docker compose para    *
 *                    criação do ambiente                                   *
 *                  - O ambiente deve ser formado por pelo menos            *
 *                    2 containers, um para a aplicação nodejs e            *
 *                    um para o banco.                                      *
 *                  - o container da API deve ter o nome de ApiFAETERJ e    *
 *                    o container de banco deve ser o nome de BDFAETERJ     *
 *                  - Tanto a aplicação nodejs como o banco devem           *
 *                    ficar em pastas compartilhadas entre o                *
 *                    hospedeiro e cada container.                          *
 *                  - Para teste e validação do ambiente, deve ser          *
 *                    desenvolvida uma API nodejs com uma rota de POST      *
 *                    para guardar no banco (um usuário e uma data) e       *
 *                    uma rota de GET que retornará um json com             *
 *                    todos os dados cadastrados.                           *
 *                  - No banco mysql deve haver uma tabela para             *
 *                    persistir usuario e data.                             *
 *                  - Entre os containers deve haver uma rede               *
 *                    virtual para que a api consiga estabelecer            *
 *                    a conexão com o banco                                 *
 *                  - Deve ser enviado como solução do trabalho             *
 *                    os dockers files e docker compose do ambiente         *
 *                                                                          *
 *              A entrega do trabalho será EM AULA, com apresentação de     *
 *              cada ambiente por grupo.                                    *
 *                                                                          *
 *  Arquivo:    index.js                                                     *
 *                                                                          *
 *  Data:       2020-11-27                                                  *
 *                                                                          *
 ****************************************************************************/

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


let navbar = `<a href="/">Clique aqui para inserir outro nome.</a>
            <br><br>
            <a href="/lista">Clique aqui para baixar a lista de nomes.</a>`;

app.get('/', (req, res)=> {
    res.sendFile(__dirname + "/form.html");
});

app.post('/add_user',(req, res)=>{
    let nome = req.body.nome.trim();

    if (nome.length > 0) {        
        let sql_insert = `INSERT INTO faeterj.usuarios (nome, criado_em) VALUES(?, NOW());`,
            valor = [nome, false];

        con.query(sql_insert, valor, (ins_err, ins_results, ins_fields)=>{
            if (ins_err) throw ins_err;
            console.log(`Novo nome inserido: ${nome}, id ${ins_results.insertId}.`);
        });
    }
    else
        console.log(`Nenhum nome informado.`);

    res.end(navbar);

}); // app.post('/add_user'...

app.get('/lista', (req, res)=> {
    let sql_select = `SELECT * FROM faeterj.usuarios;`;

    con.query(sql_select, (list_error, results, fields) =>{
        if (list_error) throw list_error;
        console.log(results);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(results));  
        res.end();
    });

}); // app.get('/lista'...

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
