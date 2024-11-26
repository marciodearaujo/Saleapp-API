use saleappdb;

create table client(
id int(10) primary key auto_increment,
name varchar(100) not null,
phone varchar(14)
);

create table product(
id int(10) primary key auto_increment,
description varchar(50) not null,
price float not null default 0,
amount int(10) default null,
sex enum('female','male','both') default 'both');

create table sale(
id int(10) primary key auto_increment,
sale_date datetime not null,
client_id int(10)
);

create table item(
id int(10) primary key auto_increment,
sale_id  int(10) not null,
product_id int(10) not null,
amount int (10) not null default 0);

alter table sale add constraint sale_client_reference foreign key(client_id) references client(id);
alter table item add constraint item_sale_reference foreign key(sale_id) references sale(id) on delete cascade on update cascade;
alter table item add constraint item_product_reference foreign key(product_id) references product(id) on delete cascade on update cascade;

alter table item drop constraint item_product_reference;
alter table item add constraint item_product_reference foreign key(product_id) references product(id) on delete no action on update cascade;

alter table Product add column removed boolean not null default true;