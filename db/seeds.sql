insert into users (username, `password`, family_status, createdAt, updatedAt) values ('Dad', "111111", 'Owner', current_timestamp(), current_timestamp());
insert into users (username, `password`, family_status, createdAt, updatedAt) values ('Maman', "111112", 'Parent', current_timestamp(), current_timestamp());
insert into users (username, `password`, family_status, createdAt, updatedAt) values ('Rémi', "111113", 'Child', current_timestamp(), current_timestamp());
insert into users (username, `password`, family_status, createdAt, updatedAt) values ('Juliette', "111114", 'Child', current_timestamp(), current_timestamp());

insert into chores (user_id, chore, overview, chore_state, due_date, createdAt, updatedAt) values (1, "Mow", "Front and back", 0, "2019-05-19", current_timestamp(), current_timestamp());
insert into chores (user_id, chore, overview, chore_state, due_date, createdAt, updatedAt) values (2, "Courses", "Whole Foods", 0, "2019-05-19", current_timestamp(), current_timestamp());
insert into chores (user_id, chore, overview, chore_state, due_date, createdAt, updatedAt) values (1, "Courses", "Trader Joes", 0, "2019-05-19", current_timestamp(), current_timestamp());
insert into chores (user_id, chore, overview, chore_state, due_date, createdAt, updatedAt) values (3, "Chambre", "Ranger chambre", 0, "2019-05-19", current_timestamp(), current_timestamp());
insert into chores (user_id, chore, overview, chore_state, due_date, createdAt, updatedAt) values (4, "Piano", "30 minutes", 0, "2019-05-19", current_timestamp(), current_timestamp());
