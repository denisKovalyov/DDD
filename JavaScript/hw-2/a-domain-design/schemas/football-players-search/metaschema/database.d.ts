interface Player {
  id: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  dateOfBirth: Date;
  rolesId: string[];
  nationalityId: string;
  clubId: string;
}

interface Club {
  id: string;
  name: string;
  foundation: number;
  cityId: string;
  stadiumId: string;
}

interface City {
  id: string;
  name: string;
  countryId: string;
}

interface Stadium {
  id: string;
  name: string;
  capacity: number;
  constructed: number;
  cityId: string;
}

interface Country {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
  shortName: string;
  positionId: string;
}

interface Position {
  id: string;
  name: string;
  shortName: string;
}

interface Tournament {
  id: string;
  name: string;
  teamsNumber: number;
  countryId?: string;
  teams: string[]; // either Country ids or Club ids
}
