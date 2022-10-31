module.exports = ({ db, console }) => {
  const country = db('country');

  return {
    read(id) {
      console.log({ db });
      return country.read(id);
    },

    create({ name }) {
      console.debug(`create country ${name}`);
      return country.create({ name });
    },

    update(id, { name }) {
      console.debug(`update country #${id} with name: ${name}`);
      return country.update(id, { name });
    },

    delete(id) {
      console.debug(`remove country ${id}`);
      return country.delete(id);
    },

    find(mask) {
      const sql = 'SELECT * from country where name like $1';
      return country.query(sql, [mask]);
    },
  };
};
