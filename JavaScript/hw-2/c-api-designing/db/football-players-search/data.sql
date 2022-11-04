INSERT INTO Position ("name", "shortName", "generalName") VALUES
    ('Goalkeeper', 'GK', 'Goalkeeper'),
    ('Centre-Back', 'CB', 'Defender'),
    ('Left-Back', 'LB', 'Defender'),
    ('Right-Back', 'RB', 'Defender'),
    ('Defensive Midfield', 'DM', 'Midfielder'),
    ('Central Midfield', 'CM', 'Midfielder'),
    ('Attacking Midfield', 'AM', 'Midfielder'),
    ('Left Winger', 'LW', 'Forward'),
    ('Right Winger', 'RW', 'Forward'),
    ('Centre-Forward', 'CF', 'Forward');

INSERT INTO Country ("name", "shortName") VALUES
    ('Ukraine', 'UA'),
    ('Italy', 'IT'),
    ('Spain', 'ES'),
    ('England', 'EN'),
    ('Germany', 'DE'),
    ('France', 'FR'),
    ('Portugal', 'PT'),
    ('Netherlands', 'NL'),
    ('Croatia', 'CR'),
    ('Ireland', 'IE'),
    ('Brazil', 'BR'),
    ('Argentina', 'AR');

INSERT INTO City ("name", "countryId") VALUES
    ('Kyiv', 1),
    ('Roma', 2),
    ('Milan', 2),
    ('Madrid', 3),
    ('Barcelona', 3),
    ('Bilbao', 3),
    ('London', 4),
    ('Manchester', 4),
    ('Liverpool', 4),
    ('Munich', 5),
    ('Dortmund', 5),
    ('Paris', 6),
    ('Marseille', 6),
    ('Porto', 7),
    ('Amsterdam', 8);

INSERT INTO Stadium ("name", "capacity", "constructed", "cityId") VALUES
    ('NSC Olimpiiskyi', 70050, 1923, 1),
    ('Stadio Olimpico', 70634, 1927, 2),
    ('Stadio Giuseppe Meazza', 80018, 1926, 3),
    ('Estadio Santiago Bernabéu', 81044, 1947, 4),
    ('Camp Nou', 99354, 1957, 5),
    ('Estadio de San Mamés', 53289, 2013, 6),
    ('Wembley Stadium', 90000, 2007, 7),
    ('Tottenham Hotspur Stadium', 62062, 2019, 7),
    ('Stamford Bridge', 41841, 1877, 7),
    ('Ashburton Grove', 60704, 2006, 7),
    ('City of Manchester', 53400, 1999, 8),
    ('Old Trafford', 74310, 1910, 8),
    ('Anfield', 54074, 1884, 9),
    ('Allianz Arena', 66000, 2005, 10),
    ('Westfalenstadion', 81365, 1974, 11),
    ('Parc des Princes', 48712, 1897, 12),
    ('Stade Vélodrome', 67000, 1937, 13),
    ('Estádio do Dragão', 50399, 2003, 14),
    ('Johan Cruijff ArenA', 56120, 1996, 15);

INSERT INTO Club ("name", "founded", "cityId", "stadiumId") VALUES
    ('FC Dynamo Kyiv', '1927-05-13', 1, 1),
    ('AS Roma', '1927-06-07', 2, 2),
    ('Internazionale', '1908-03-09', 3, 3),
    ('AC Milan', '1899-12-16', 3, 3),
    ('Real Madrid', '1902-03-06', 4, 4),
    ('FC Barcelona', '1899-11-29', 5, 5),
    ('Atletic Bilbao', '1898-01-01', 6, 6),
    ('Chelsea', '1905-03-10', 7, 9),
    ('Arsenal FC', '1886-10-01', 7, 10),
    ('Tottenham Hotspur', '1882-09-05', 7, 8),
    ('Manchester United', '1878-01-01', 8, 12),
    ('Manchester City', '1880-01-01', 8, 11),
    ('Liverpool FC', '1892-06-03', 9, 13),
    ('Bayern Munich', '1900-02-27', 10, 14),
    ('Borussia Dortmund', '1909-12-19', 11, 15),
    ('Paris Saint-Germain', '1970-08-12', 12, 16),
    ('Olympique Marseille', '1899-08-31', 13, 17),
    ('FC Porto', '1893-09-28', 14, 18),
    ('Ajax', '1900-03-18', 15, 19);

INSERT INTO Player ("firstName", "lastName", "height", "weight", "dateOfBirth", "nationalityId", "clubId") VALUES
    ('Neymar', 'da Silva Santos, Jr.', 175, 68, '1992-02-05', 11, 16),
    ('Cristiano', 'Ronaldo', 187, 83, '1985-02-05', 7, 11),
    ('Lautaro', 'Martínez', 174, 72, '1997-05-15', 12, 3),
    ('Pedri', '', 174, 68, '2002-11-25', 3, 6),
    ('Lorenzo', 'Pellegrini', 186, 77, '1996-06-19', 2, 2),
    ('Leon', 'Goretzka', 189, 76, '1995-02-06', 5, 14),
    ('Oleksandr', 'Zinchenko', 175, 62, '1996-12-15', 1, 9),
    ('Rúben', 'Dias', 187, 70, '1997-05-14', 7, 12),
    ('Virgil', 'van Dijk', 193, 92, '1991-07-08', 8, 13),
    ('Trent', 'Alexander-Arnold', 180, 69, '1998-10-07', 4, 13),
    ('Andriy', 'Lunin', 191, 80, '1999-02-11', 1, 5);

INSERT INTO PlayerPosition ("playerId", "positionId") VALUES
    (1, 8),
    (1, 7),
    (2, 10),
    (2, 8),
    (2, 9),
    (3, 9),
    (4, 6),
    (4, 7),
    (4, 8),
    (5, 7),
    (5, 5),
    (5, 6),
    (6, 6),
    (7, 3),
    (7, 6),
    (8, 2),
    (9, 2),
    (10, 4),
    (11, 1);

INSERT INTO Tournament ("name", "teamsNumber", "countryId") VALUES
    ('Serie A', 20, 2),
    ('La Liga', 20, 3),
    ('Premier League', 20, 4),
    ('Bundesliga', 18, 4),
    ('Ligue 1', 20, 4),
    ('UEFA Champions League', 32, null),
    ('FIFA World Cup', 32, null);

INSERT INTO TournamentTeam ("tournamentId", "clubId", "nationalTeamId") VALUES
    (1, 2, null), (1, 3, null), (1, 4, null),
    (2, 5, null), (2, 6, null), (2, 7, null),
    (3, 8, null), (3, 9, null), (3, 10, null), (3, 11, null), (3, 12, null), (3, 13, null),
    (4, 14, null), (4, 15,  null),
    (5, 16, null), (5, 17, null),
    (6, 1, null), (6, 2, null), (6, 3, null), (6, 4, null), (6, 5, null),
    (6, 6, null), (6, 7, null), (6, 8, null), (6, 10, null), (6, 12, null),
    (6, 13, null), (6, 14, null), (6, 15, null), (6, 16, null), (6, 17, null),
    (6, 18, null), (6, 19, null),
    (7, null, 1), (7, null, 2), (7, null, 3), (7, null, 4), (7, null, 5), (7, null, 6),
    (7, null, 7), (7, null, 8), (7, null, 9), (7, null, 10), (7, null, 11), (7, null, 12);
