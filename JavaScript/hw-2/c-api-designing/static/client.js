'use strict';

const transport = {};

transport.http = (url) => (structure) => {
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = (...args) => new Promise((resolve, reject) => {
        fetch(`${url}/api/${name}/${method}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ args }),
        }).then((res) => {
          if (res.status === 200) resolve(res.json());
          else reject(new Error(`Status Code: ${res.status}`));
        });
      });
    }
  }
  return Promise.resolve(api);
};

transport.ws = (url) => (structure) => {
  const socket = new WebSocket(url);
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = (...args) => new Promise((resolve) => {
        const packet = { name, method, args };
        socket.send(JSON.stringify(packet));
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          resolve(data);
        };
      });
    }
  }
  return new Promise((resolve) => {
    socket.addEventListener('open', () => resolve(api));
  });
};

const scaffold = (url) => {
  const protocol = url.startsWith('ws:') ? 'ws' : 'http';
  return transport[protocol](url);
};

(async () => {
  const api = await scaffold('http://localhost:8001')({
    auth: {
      signin: ['login', 'password'],
      signout: [],
      restore: ['token'],
    },
    messenger: {
      createArea: ['name', 'ownerId'],
      deleteArea: ['areaId', 'ownerId'],
      addUserToArea: ['areaId', 'ownerId', 'accountId'],
      getAreas: [],
      getAreaMessages: ['areaId', 'accountId', 'amount', 'dateFrom', 'dateTo'],
      subscribeToArea: ['areaId', 'accountId'],
      unsubscribeFromArea: ['areaId', 'accountId'],
      sendMessage: ['areaId', 'text'],
    },
    footballDB: {
      find: ['mask'],
      getPlayer: ['id'],
      getClub: ['id'],
      getStadium: ['id'],
      getTournament: ['id'],
      getPositions: [],
      getCities: [],
      getCountries: [],
      createPlayer: ['record'],
      updatePlayer: ['id', 'record'],
      deletePlayer: ['id'],
      createClub: ['record'],
      updateClub: ['id', 'record'],
      deleteClub: ['id'],
      createStadium: ['record'],
      updateStadium: ['id', 'record'],
      deleteStadium: ['id'],
      createTournament: ['record'],
      updateTournament: ['id', 'record'],
      deleteTournament: ['id'],
    },
  });

  window.api = api;

  const data = await api.auth.signin('marcus', 'marcus');
  console.dir({ data });
})();
