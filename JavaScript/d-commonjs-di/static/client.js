'use strict';

// To be filled on static server start
const API_URL = 'ws://127.0.0.1:8001';

const createMethodHttp = ({ serviceName, methodName, parameters }) => (...args) =>
  new Promise((resolve, reject) => {
    let url = `${API_URL}/${serviceName}/${methodName}`;
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

const createMethodWs = ({ serviceName, methodName, socket }) => (...args) =>
  new Promise((resolve) => {
    const packet = { name: serviceName, method: methodName, args };
    socket.send(JSON.stringify(packet));
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      resolve(data);
    };
  });

const TRANSPORT = {
  'ws': createMethodWs,
  'http': createMethodHttp,
};

const scaffold = (url, structure) => {
  const protocol = url.startsWith('ws:') ? 'ws' : 'http';
  const socket = protocol === 'ws' ? new WebSocket(API_URL) : null;

  const api = {};
  const services = Object.keys(structure);
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      api[serviceName][methodName] = TRANSPORT[protocol]({
        serviceName,
        methodName,
        socket,
        parameters: service[methodName],
      });
    }
  }

  return new Promise((resolve) => {
    socket ? socket.addEventListener('open', () => resolve(api)) : resolve(api);
  });
};

(async () => {
  const api = await scaffold(API_URL, {
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

  window.api = api;

  console.log('API_URL: ', API_URL);
  const user = await api.user.read(2);
  const countries = await api.country.read();
  console.dir({ user, countries });
  document.getElementById('output').innerText = JSON.stringify(user) + '\n' + JSON.stringify(countries);
})();
