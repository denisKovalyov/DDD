CREATE TABLE Role (
  "id" smallint generated always as identity,
  "name" varchar NOT NULL,
  "shortName" varchar NOT NULL,
  "position" varchar NOT NULL
);

ALTER TABLE Role ADD CONSTRAINT "pkRole" PRIMARY KEY ("id");
CREATE UNIQUE INDEX "akRoleName" ON Role ("name");

CREATE TABLE Country (
  "id" smallint generated always as identity,
  "name" varchar NOT NULL,
  "shortName" varchar NOT NULL
);

ALTER TABLE Country ADD CONSTRAINT "pkCountry" PRIMARY KEY ("id");
CREATE UNIQUE INDEX "akCountryName" ON Country ("name");

CREATE TABLE City (
  "id" int generated always as identity,
  "name" varchar NOT NULL,
  "countryId" int NOT NULL
);

ALTER TABLE City ADD CONSTRAINT "pkCity" PRIMARY KEY ("id");
CREATE UNIQUE INDEX "akCityName" ON City ("name");

CREATE TABLE Stadium (
  "id" int generated always as identity,
  "name" varchar NOT NULL,
  "capacity" int NOT NULL,
  "constructed" int,
  "cityId" int NOT NULL
);

ALTER TABLE Stadium ADD CONSTRAINT "pkStadium" PRIMARY KEY ("id");
CREATE UNIQUE INDEX "akStadiumNameCity" ON Stadium ("name", "cityId");
ALTER TABLE Stadium ADD CONSTRAINT "fkStadiumCity" FOREIGN KEY ("cityId") REFERENCES City ("id") ON DELETE CASCADE;

CREATE TABLE Club (
  "id" int generated always as identity,
  "name" varchar NOT NULL,
  "founded" Date NOT NULL,
  "cityId" int NOT NULL,
  "stadiumId" int NOT NULL
);

ALTER TABLE Club ADD CONSTRAINT "pkClub" PRIMARY KEY ("id");
CREATE UNIQUE INDEX "akClubNameCity" ON Club ("name", "cityId");
ALTER TABLE Club ADD CONSTRAINT "fkClubCity" FOREIGN KEY ("cityId") REFERENCES City ("id") ON DELETE CASCADE;
ALTER TABLE Club ADD CONSTRAINT "fkClubStadium" FOREIGN KEY ("stadiumId") REFERENCES Stadium ("id") ON DELETE CASCADE;

CREATE TABLE Player (
  "id" int generated always as identity,
  "firstName" varchar NOT NULL,
  "lastName" varchar NOT NULL,
  "height" int,
  "weight" int,
  "dateOfBirth" Date,
  "nationalityId" int NOT NULL,
  "clubId" int NOT NULL
);

ALTER TABLE Player ADD CONSTRAINT "pkPlayer" PRIMARY KEY ("id");
ALTER TABLE Player ADD CONSTRAINT "fkPlayerCountry" FOREIGN KEY ("nationalityId") REFERENCES Country ("id") ON DELETE CASCADE;
ALTER TABLE Player ADD CONSTRAINT "fkPlayerClub" FOREIGN KEY ("clubId") REFERENCES Club ("id") ON DELETE CASCADE;

CREATE TABLE PlayerRole (
  "playerId" int NOT NULL,
  "roleId" smallint NOT NULL
);

ALTER TABLE PlayerRole ADD CONSTRAINT "pkPlayerRole" PRIMARY KEY ("playerId", "roleId");
ALTER TABLE PlayerRole ADD CONSTRAINT "fkPlayerRolePlayer" FOREIGN KEY ("playerId") REFERENCES Player ("id") ON DELETE CASCADE;
ALTER TABLE PlayerRole ADD CONSTRAINT "fkPlayerRoleRole" FOREIGN KEY ("roleId") REFERENCES Role ("id") ON DELETE CASCADE;

CREATE TABLE Tournament (
  "id" smallint generated always as identity,
  "name" varchar NOT NULL,
  "teamsNumber" int NOT NULL,
  "countryId" int
);

ALTER TABLE Tournament ADD CONSTRAINT "pkTournament" PRIMARY KEY ("id");
CREATE UNIQUE INDEX "akTournamentNameCountry" ON Tournament ("name", COALESCE("countryId", 0));
ALTER TABLE Tournament ADD CONSTRAINT "fkTournamentCountry" FOREIGN KEY ("countryId") REFERENCES Country ("id") ON DELETE CASCADE;

CREATE TABLE TournamentTeam (
  "id" bigint generated always as identity,
  "tournamentId" smallint NOT NULL,
  "clubId" int,
  "nationalTeamId" smallint
);

ALTER TABLE TournamentTeam ADD CONSTRAINT "pkTournamentTeam" PRIMARY KEY ("id");
ALTER TABLE TournamentTeam ADD CONSTRAINT "fkTournamentTeam" FOREIGN KEY ("tournamentId") REFERENCES Tournament ("id") ON DELETE CASCADE;
ALTER TABLE TournamentTeam ADD CONSTRAINT "fkTournamentClub" FOREIGN KEY ("clubId") REFERENCES Club ("id") ON DELETE CASCADE;
ALTER TABLE TournamentTeam ADD CONSTRAINT "fkTournamentNationalTeam" FOREIGN KEY ("nationalTeamId") REFERENCES Country ("id") ON DELETE CASCADE;
ALTER TABLE TournamentTeam ADD CONSTRAINT "notNullableTeams" CHECK ("nationalTeamId" is not null or "clubId" is not null);
