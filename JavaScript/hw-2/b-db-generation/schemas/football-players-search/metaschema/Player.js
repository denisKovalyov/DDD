({
  Entity: {},

  firstName: 'string',
  lastName: 'string',
  height: 'number',
  weight: 'number',
  dateOfBirth: 'string',
  roles: { many: 'Role' },
  nationality: 'Country',
  club: 'Club',
});
