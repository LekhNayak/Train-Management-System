DELIMITER //
CREATE FUNCTION calculate_departure(arrival TIME, halt INT) 
RETURNS TIME
DETERMINISTIC
BEGIN
    RETURN ADDTIME(arrival, SEC_TO_TIME(halt * 60));
END;
//

DELIMITER $$
CREATE FUNCTION total_no_of_days_in_travelling(p_train_no int)
RETURNS INT
deterministic
begin
	declare v_days int;
    select max(day) into v_days from stops
    where train_no = p_train_no;
    return ifnull(v_days, 0); -- returns zero if not found
end $$
DELIMITER $$

DELIMITER $$
CREATE FUNCTION GetOperatingDays(p_train_no INT)
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE v_days VARCHAR(255);
    DECLARE v_result VARCHAR(255) DEFAULT ''; 
    DECLARE done INT DEFAULT FALSE;
    DECLARE days_cursor CURSOR FOR 
        SELECT days FROM train_days WHERE train_no = p_train_no;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN days_cursor;
    read_loop: LOOP
        FETCH days_cursor INTO v_days;  
        IF done THEN
            LEAVE read_loop;  
        END IF;
        SET v_result = CONCAT(v_result, v_days, ', ');
    END LOOP;
    CLOSE days_cursor;
    RETURN TRIM(TRAILING ', ' FROM v_result);
END $$
DELIMITER ;

DELIMITER $$
create function total_travelling_time(p_train_no int)
returns time
deterministic
begin
	declare p_departure time;
    declare p_arrive time;
    declare p_time_diff time;
    declare p_days int;
    
    select depart,arrive into p_departure,p_arrive from train where train_no = p_train_no;
    set p_days = total_no_of_days_in_travelling(p_train_no);
    
   IF p_arrive >= p_departure and p_days = 1 THEN
        SET p_time_diff = TIMEDIFF(p_arrive, p_departure);
    ELSE
		SET p_time_diff = ADDTIME(TIMEDIFF(p_arrive, p_departure), '24:00:00');
	END IF;
    IF p_days > 1 then
		SET p_time_diff = ADDTIME(TIMEDIFF('24:00:00',p_departure),TIMEDIFF(p_arrive,'00:00:00'));
		SET p_time_diff = ADDTIME(p_time_diff, SEC_TO_TIME(((p_days - 2) * 86400)));
	end if;
    return p_time_diff;
end $$
delimiter ;
select total_travelling_time(82902);

DELIMITER $$

delimiter $$
create function calculate_distance(p_train_no int, p_st1 varchar(5),p_st2 varchar(5))
returns int
deterministic
begin
	declare dist_st1 int;
    declare dist_st2 int;
    
    select distance into dist_st1 from stops where train_no = p_train_no AND station_id = 
    (select id from station where name = p_st1);
    select distance into dist_st2 from stops where train_no = p_train_no AND station_id = 
    (select id from station where name = p_st2);
    
	return (dist_st2 - dist_st1);
end $$
delimiter $$





