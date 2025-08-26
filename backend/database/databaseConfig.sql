----- Cria um banco de dados
-- create database dw3;

create table IF NOT EXISTS salasDeAula (
    salasdeaulaid bigserial constraint pk_salas PRIMARY KEY UNIQUE,
    descricao VARCHAR(60),
    localizacao VARCHAR(60),
    capacidade integer,
    removido boolean DEFAULT false
);

