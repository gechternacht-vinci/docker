CREATE DATABASE IF NOT EXISTS faeterj;

use faeterj;


create table usuarios(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(300) NOT NULL,
    criado_em datetime NOT NULL
)