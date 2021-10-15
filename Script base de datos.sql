drop database if exists peliculas;
create database peliculas;
use peliculas;

create table pelicula(
    id bigint(30) not null auto_increment,
    imagen varchar(100),
    titulo varchar(50),
    descripcion text,
    duracion varchar(50),
    trailer varchar(250),
    fecha_estreno date,
    primary key(id)
);

create table categoria(
    id bigint(30) not null auto_increment,
    nombre varchar(70),
    primary key(id)
);

create table usuario(
    id bigint(30) not null auto_increment,
    nombre varchar(70) not null,
    primary key(id)
);

create table pelicula_categoria(
    id_pelicula_fk bigint(30) not null,
    id_categoria_fk bigint(30) not null,
    primary key(id_pelicula_fk,id_categoria_fk),
    foreign key(id_pelicula_fk) references pelicula(id),
    foreign key(id_categoria_fk) references categoria(id) 
);

create table pelicula_usuario(
    id_pelicula_fk bigint(30) not null,
    id_usuario_fk bigint(30) not null,
    calificacion int(2),
    vista int(1),
    primary key(id_pelicula_fk,id_usuario_fk),
    foreign key(id_pelicula_fk) references pelicula(id),
    foreign key(id_usuario_fk) references usuario(id)
);
