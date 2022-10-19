'use strict';

const TRANSPORT = {
  WS: 'ws://127.0.0.1:8001',
  HTTP: 'http://127.0.0.1:8001',
};

let socket;

const createMethodHttp = (serviceName, methodName, parameters) => (...args) =>
  new Promise((resolve, reject) => {
    let url = `${TRANSPORT.HTTP}/${serviceName}/${methodName}`;
    const id = parameters.includes("id") ? args[0] : null;
    if (id) url += `/${id}`;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args[id ? 1 : 0] || {}),
    }).then((res) => {
      const { status } = res;
      if (status !== 200) {
        reject(new Error(`Status Code: ${status}`));
        return;
      }
      const isJson = res.headers.get('Content-Type')?.includes('application/json');
      resolve(isJson ? res.json() : res.text());
    });
  });

const createMethodWs = (serviceName, methodName) => (...args) =>
  new Promise((resolve) => {
    const packet = {name: serviceName, method: methodName, args};
    socket.send(JSON.stringify(packet));
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      resolve(data);
    };
  });

const createMethod = ({ url, serviceName, methodName, parameters }) => {
  switch (url) {
    case TRANSPORT.WS: return createMethodWs(serviceName, methodName);
    case TRANSPORT.HTTP:
    default: return createMethodHttp(serviceName, methodName, parameters);
  }
};

const scaffold = (url, structure) => {
  if (url === TRANSPORT.WS && !socket) {
    socket = new WebSocket(TRANSPORT.WS);
  };

  const api = {};
  const services = Object.keys(structure);
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      api[serviceName][methodName] = createMethod({
        url,
        serviceName,
        methodName,
        parameters: service[methodName],
      });
    }
  }
  return api;
};

const api = scaffold(TRANSPORT.WS, {
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
  country: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
});

const testApi = async () => {
  const user = await api.user.read(2);
  const countries = await api.country.read();
  console.dir({ user, countries });
  document.getElementById('output').innerText = JSON.stringify(user) + '\n' + JSON.stringify(countries);
};

if (socket) {
  socket.addEventListener('open', testApi);
} else {
  testApi();
};
