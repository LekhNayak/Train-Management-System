create database trainsystem;
use trainsystem;

create table zones(
	id varchar(4) unique not null,
    zone varchar(40) not null,
    headquarters varchar(30),
    primary key(id)
);

create table divisions(
	id varchar(5) unique not null,
    zone_id varchar(4) not null,
    division varchar(30),
    primary key(id),
    foreign key(zone_id) references zones(id)
);

create table station(
	id varchar(5) unique not null,
    division_id varchar(5) not null,
    name varchar(50),
    primary key(id),
    foreign key(division_id) references divisions(id)
);

create table route(
	id int unique not null,
    end1_id varchar(5),
    end2_id varchar(5),
    primary key(id),
    foreign key(end1_id) references station(id),
    foreign key(end2_id) references station(id)
);

create table train_type(
	type varchar(50),
    fare int,
    primary key(type)
);

create table train(
	train_no int unique not null,
    name varchar(100),
    type varchar(50),
    status enum('Running','Inactive'),
    depart time,
    arrive time,
    route_id int,
    direction enum('UP','DOWN'),
    primary key(train_no),
    foreign key(route_id) references route(id),
    foreign key(type) references train_type(type)
);

create table train_days(
	train_no int not null,
    days enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'),
    primary key(train_no, days),
    foreign key(train_no) references train(train_no)
);

create table schedule(
	id int unique not null auto_increment,
    train_no int,
    departfromsource datetime,
    arrivetodestination datetime,
    foreign key(train_no) references train(train_no)
);

create table stops(
	train_no int,
	station_id varchar(5),
    route_id int,
    stop_order int,
    arrival time,
    departure time,
    halt int,
    distance int,
    day int,
	PRIMARY KEY (train_no,station_id,route_id),  
    FOREIGN KEY (station_id) REFERENCES station(id), 
    FOREIGN KEY (route_id) REFERENCES route(id),
    foreign key(train_no) references train(train_no)
);

create table person(
	id int unique not null,
    name varchar(50),
    residentcity varchar(30),
    dob date,
    flag enum('0','1'),
    primary key(id, flag)
);

create table staff(
	id int,
    leaveday enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'),
    role enum('Locopilot','Attendant','Ticket Collector','Policemen'),
    foreign key(id) references person(id)
);

create table shifts(
	id int not null,
    shift_start time,
    shift_end time,
    train_no int,
    foreign key(id) references staff(id),
    foreign key(train_no) references train(train_no)
);

CREATE TABLE class_type (
    class VARCHAR(50) NOT NULL,
    initials varchar(5) not null,
    fare int,
    PRIMARY KEY(initials)
);

create table fareperkm(
	type varchar(50),
    class varchar(5),
    fare_per_km float,
    foreign key(type) references train_type(type),
    foreign key(class) references class_type(initials)
);

create table seat(
	coach_no int not null,
    seat_no varchar(15) not null,
    class varchar(5),
    fare int not null,
    status enum('Available','Booked','Blocked') not null,
    train_no int not null,
    PRIMARY KEY (coach_no, seat_no,train_no), 
    FOREIGN KEY (train_no) REFERENCES train(train_no),
    foreign key (class) references class_type(initials)
);

create table passenger(
	id int,
	name varchar(50) not null,
    coach_no int not null,
    seat_no varchar(15) not null,
    ticket_mode enum('Normal','Tatkal','Premium Tatkal'),
    farepaid int,
    boarding_st_id varchar(5),
    departing_st_id varchar(5),
    journey_date date,
    foreign key(id) references person(id),
    foreign key(coach_no,seat_no) references seat(coach_no,seat_no),
    FOREIGN KEY (boarding_st_id) REFERENCES station(id),  
    FOREIGN KEY (departing_st_id) REFERENCES station(id)
);
