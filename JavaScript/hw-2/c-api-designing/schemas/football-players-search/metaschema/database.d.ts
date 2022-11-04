interface Player {
  id: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  dateOfBirth: Date;
  positionsId: string[];
  nationalityId: string;
  clubId: string;
}

interface Club {
  id: string;
  name: string;
  founded: Date;
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
  shortName: string;
}

interface Position {
  id: string;
  name: string;
  shortName: string;
  generalName: string;
}

interface Tournament {
  id: string;
  name: string;
  teamsNumber: number;
  countryId?: string;
  teams: string[]; // either Country ids or Club ids
}
