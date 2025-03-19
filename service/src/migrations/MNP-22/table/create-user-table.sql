create table if not exists users (
    id varchar(64) primary key,
    email varchar(100) not null unique,
    "passwordHash" text not null,
    name varchar(100) not null
)
