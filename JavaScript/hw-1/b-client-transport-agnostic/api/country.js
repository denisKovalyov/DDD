const country = db('country');

({
  read(id) {
    console.log({ db });
    return country.read(id);
  },

  create({ name }) {
    console.debug(`create country ${name}`);
    return country.create({ name });
  },

  delete(id) {
    console.debug(`remove country ${id}`);
    return country.delete(id);
  },

  find(mask) {
    const sql = 'SELECT * from country where name like $1';
    return country.query(sql, [mask]);
  },
});
