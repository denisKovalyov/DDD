const player = db('player');
const club = db('club');
const tournament = db('tournament');
const stadium = db('stadium');

({
  async find(mask) {
    // "mask" could be Player first or last name, Club name, Tournament name or Stadium name
    console.log({method: 'footballPlayersSearch.find', mask });
    const maskString = `%${mask[0].toLowerCase()}%`;

    const playerSql = 'SELECT * from player where LOWER("firstName") like $1 OR LOWER("lastName") like $1';
    const clubSql = 'SELECT * from club where LOWER("name") like $1';
    const tournamentSql = 'SELECT * from tournament where LOWER("name") like $1';
    const stadiumSql = 'SELECT * from stadium where LOWER("name") like $1';

    const playersByFirstName = await player.query(playerSql, [maskString]);
    const playersByLastName = await player.query(playerSql, [maskString]);
    const clubs = await club.query(clubSql, [maskString]);
    const tournaments = await tournament.query(tournamentSql, [maskString]);
    const stadiums = await stadium.query(stadiumSql, [maskString]);

    const players = [
      ...playersByFirstName,
      ...playersByLastName
        .filter(({ id }) => !playersByFirstName.find(({ id: playerId }) => playerId === id))
    ];

    const results = {
      players,
      clubs,
      tournaments,
      stadiums,
    };
    return { status: 'ok', results };
  },

  getPlayer(id) {
    console.log({ method: 'footballPlayersSearch.getPlayer', id });
    const player = {
      id: 1,
      firstName: 'Neymar',
      lastName: 'da Silva Santos, Jr.',
      height: 175,
      weight: 68,
      dateOfBirth: '1992-02-05',
      position: [{
        name: 'Left Winger',
        generalName: 'Forward'
      }, {
        name: 'Attacking Midfield',
        generalName: 'Midfielder'
      }],
      nationality: 'Brazil',
      clubName: 'PSG',
    };
    return { status: 'ok', result: player };
  },

  getClub(id) {
    console.log({ method: 'footballPlayersSearch.getClub', id });
    const club = {
      id: 2,
      name: 'AS Roma',
      stadium: {
        name: 'Stadio Olimpico',
        capacity: 70634,
      },
      city: 'Rome',
      country: 'Italy',
      players: [{
        id: 1,
        firstName: 'Lorenzo',
        lastName: 'Pellegrini',
        position: {
          shortName: 'CM',
          generalName: 'Midfielder'
        },
      }]
    };
    return { status: 'ok', result: club };
  },

  getStadium(id) {
    console.log({ method: 'footballPlayersSearch.getStadium', id });
    const stadium = {
      name: 'Parc des Princes',
      capacity: 48712,
      constructed: 1897,
      city: 'Paris',
    };
    return { status: 'ok', result: stadium };
  },

  getTournament(id) {
    console.log({ method: 'footballPlayersSearch.getTournament', id });
    const tournament = {
      name: 'UEFA Champions League',
      teamsNumber: 32,
      country: null,
      teams: [
        { id: 1, name: 'FC Dynamo Kyiv' },
        { id: 2, name: 'AS Roma' },
        { id: 6, name: 'FC Barcelona' },
      ],
    };
    return { status: 'ok', result: tournament };
  },

  getPositions() {
    console.log({ method: 'footballPlayersSearch.getPositions' });
    const positions = [
      { id: 1, name: 'Goalkeeper', shortName: 'GK' },
      { id: 9, name: 'Right Winger', shortName: 'RW' },
    ];
    return { status: 'ok', result: positions };
  },

  getCities() {
    console.log({ method: 'footballPlayersSearch.getCities' });
    const cites = [
      { id: 1, name: 'Ukraine' },
      { id: 2, name: 'Rome' },
      { id: 5, name: 'Barcelona' },
    ];
    return { status: 'ok', result: cites };
  },

  getCountries() {
    console.log({ method: 'footballPlayersSearch.getCountries' });
    const countires = [
      { id: 1, name: 'Kyiv' },
      { id: 2, name: 'Italy' },
      { id: 12, name: 'Argentina' },
    ];
    return { status: 'ok', result: countires };
  },

  async createPlayer({ firstName, lastName, height, weight, dateOfBirth, nationalityId, clubId }) {
    console.log({ method: 'footballPlayersSearch.createPlayer', firstName, lastName, height, weight, dateOfBirth, nationalityId, clubId });
    return { status: 'ok' };
  },

  async updatePlayer(id, options) {
    // "options" could contain any Player attributes, e.g. firstName, lastName, height, weight, clubId, positionId
    console.log({ method: 'footballPlayersSearch.updatePlayer', id, options });
    return { status: 'ok' };
  },

  async deletePlayer(id) {
    console.log({ method: 'footballPlayersSearch.deletePlayer', id });
    return { status: 'ok' };
  },

  async createClub({ name, founded, cityId, stadiumId }) {
    console.log({ method: 'footballPlayersSearch.createClub', name, founded, cityId, stadiumId });
    return { status: 'ok' };
  },

  async updateClub(id, options) {
    // "options" could contain any Club attributes, e.g. name, founded, cityId, stadiumId
    console.log({ method: 'footballPlayersSearch.updatePlayer', id, options });
    return { status: 'ok' };
  },

  async deleteClub(id) {
    console.log({ method: 'footballPlayersSearch.deleteClub', id });
    return { status: 'ok' };
  },

  async createStadium({ name, capacity, constructed, cityId }) {
    console.log({ method: 'footballPlayersSearch.createStadium', name, capacity, constructed, cityId });
    return { status: 'ok' };
  },

  async updateStadium(id, options) {
    // "options" could contain any Stadium attributes, e.g. name, capacity, constructed, cityId
    console.log({ method: 'footballPlayersSearch.updateStadium', id, options });
    return { status: 'ok' };
  },

  async deleteStadium(id) {
    console.log({ method: 'footballPlayersSearch.deleteStadium', id });
    return { status: 'ok' };
  },

  async createTournament({ name, teamsNumber, countryId }) {
    console.log({ method: 'footballPlayersSearch.createTournament', name, teamsNumber, countryId });
    return { status: 'ok' };
  },

  async updateTournament(id, options) {
    // "options" could contain any Tournament attributes, e.g. name, teamsNumber or countryId
    console.log({ method: 'footballPlayersSearch.updateTournament', id, options });
    return { status: 'ok' };
  },

  async deleteTournament(id) {
    console.log({ method: 'footballPlayersSearch.deleteTournament', id });
    return { status: 'ok' };
  },
});
