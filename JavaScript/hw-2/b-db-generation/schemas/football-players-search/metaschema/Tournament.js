({
  Entity: {},

  name: { type: 'string', unique: true },
  country: '?string',
  teamsNumber: 'number',
  teams: { many: 'Country' || 'Club' },
});
