-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 17. Apr 2023 um 12:47
-- Server-Version: 10.4.25-MariaDB
-- PHP-Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `bifwebscripting`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointments`
--

CREATE TABLE `appointments` (
  `ap_id` int(11) NOT NULL,
  `ap_name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `vote_start` datetime NOT NULL DEFAULT current_timestamp(),
  `vote_end` datetime NOT NULL,
  `creator_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `comments`
--

CREATE TABLE `comments` (
  `c_id` int(11) NOT NULL,
  `ap_id` int(11) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `comment_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `options`
--

CREATE TABLE `options` (
  `op_id` int(11) NOT NULL,
  `ap_id` int(11) NOT NULL,
  `op_start` datetime NOT NULL,
  `op_end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `votings`
--

CREATE TABLE `votings` (
  `v_id` int(11) NOT NULL,
  `ap_id` int(11) NOT NULL,
  `op_id` int(11) NOT NULL,
  `voter_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`ap_id`);

--
-- Indizes für die Tabelle `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`c_id`),
  ADD KEY `appointments3` (`ap_id`);

--
-- Indizes für die Tabelle `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`op_id`),
  ADD KEY `appointment` (`ap_id`);

--
-- Indizes für die Tabelle `votings`
--
ALTER TABLE `votings`
  ADD PRIMARY KEY (`v_id`),
  ADD KEY `appiontments2` (`ap_id`),
  ADD KEY `options` (`op_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `ap_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `comments`
--
ALTER TABLE `comments`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `options`
--
ALTER TABLE `options`
  MODIFY `op_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `votings`
--
ALTER TABLE `votings`
  MODIFY `v_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `appointments3` FOREIGN KEY (`ap_id`) REFERENCES `appointments` (`ap_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `appointment` FOREIGN KEY (`ap_id`) REFERENCES `appointments` (`ap_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `votings`
--
ALTER TABLE `votings`
  ADD CONSTRAINT `appiontments2` FOREIGN KEY (`ap_id`) REFERENCES `appointments` (`ap_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `options` FOREIGN KEY (`op_id`) REFERENCES `options` (`op_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
