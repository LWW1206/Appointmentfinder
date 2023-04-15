-- APPOINTMENTS
 INTO `appointments` (`ap_id`, `ap_name`, `location`, `description`, `vote_start`, `vote_end`, `creator_name`) VALUES (NULL, 'Appointment #1', 'FH Technikum Wien', 'Description #1', '2023-04-12', '2023-04-28', 'Matthias');
INSERT INTO `appointments` (`ap_id`, `ap_name`, `location`, `description`, `vote_start`, `vote_end`, `creator_name`) VALUES (NULL, 'Appointment #2', 'FH Technikum Wien', 'Description #2', '2023-04-15', '2023-04-30', 'Matthias');

-- OPTIONS
INSERT INTO `options` (`op_id`, `ap_id`, `op_start`, `op_end`) VALUES (NULL, '1', '2023-04-29 14:30', '2023-04-29 15:30');
INSERT INTO `options` (`op_id`, `ap_id`, `op_start`, `op_end`) VALUES (NULL, '1', '2023-04-29 15:30', '2023-04-29 16:30');
INSERT INTO `options` (`op_id`, `ap_id`, `op_start`, `op_end`) VALUES (NULL, '1', '2023-04-29 16:00', '2023-04-29 17:00');
INSERT INTO `options` (`op_id`, `ap_id`, `op_start`, `op_end`) VALUES (NULL, '2', '2023-05-01 12:00', '2023-05-01 14:00');
INSERT INTO `options` (`op_id`, `ap_id`, `op_start`, `op_end`) VALUES (NULL, '2', '2023-05-02 12:00', '2023-05-02 14:00');

-- VOTINGS
INSERT INTO `votings` (`v_id`, `ap_id`, `op_id`, `voter_name`) VALUES (NULL, '1', '1', 'Matthias');
INSERT INTO `votings` (`v_id`, `ap_id`, `op_id`, `voter_name`) VALUES (NULL, '1', '2', 'Matthias');
INSERT INTO `votings` (`v_id`, `ap_id`, `op_id`, `voter_name`) VALUES (NULL, '1', '2', 'Li');
INSERT INTO `votings` (`v_id`, `ap_id`, `op_id`, `voter_name`) VALUES (NULL, '2', '1', 'Matthias');
INSERT INTO `votings` (`v_id`, `ap_id`, `op_id`, `voter_name`) VALUES (NULL, '2', '1', 'Li');

-- COMMENTS
INSERT INTO `comments` (`c_id`, `author_name`, `comment_text`, `ap_id`) VALUES (NULL, 'Matthias', 'Hello World!', '1');
INSERT INTO `comments` (`c_id`, `author_name`, `comment_text`, `ap_id`) VALUES (NULL, 'Li', 'Hello World!', '1');