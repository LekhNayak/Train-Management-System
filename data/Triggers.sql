DELIMITER //
CREATE TRIGGER before_insert_stops
BEFORE INSERT ON stops
FOR EACH ROW
BEGIN
    DECLARE temp_departure TIME;
    IF NEW.departure IS NULL THEN
        SET temp_departure = calculate_departure(NEW.arrival, NEW.halt);
        SET NEW.departure = temp_departure;
    END IF;
END;
//
DELIMITER ;
DELIMITER //
