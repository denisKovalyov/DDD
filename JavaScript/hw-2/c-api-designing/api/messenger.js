({
  async createArea({ name, ownerId }) {
    console.log({ method: 'messenger.createNewArea', name, ownerId });
    return { status: 'ok', areaId: 'areaId' };
  },

  async deleteArea({ areaId, ownerId }) {
    console.log({ method: 'messenger.deleteArea', areaId, ownerId });
    // method should work only for users of the Area
    return { status: 'ok' };
  },

  async addUserToArea({ areaId, ownerId, accountId  }) {
    console.log({ method: 'messenger.addUserToArea', areaId, ownerId, accountId });
    // method should work only for users of the Area
    return { status: 'ok' };
  },

  async getAreas() {
    // method should work for all users logged in
    console.log({ method: 'messenger.getAreasList' });
    const areas = [
      { name: "Area 1", owner: "Owner name", members: 32 },
      { name: "Area 2", owner: "Owner name", members: 45 },
    ];
    return { status: 'ok', areas };
  },

  async getAreaMessages({ areaId, accountId, amount, dateFrom, dateTo }) {
    console.log({ method: 'messenger.getAreaMessages', areaId, accountId, amount, dateFrom, dateTo });
    // method should work only for users of the Area
    const messages = [
      { from: 'Account login', text: 'Hey everybody!' },
      { from: 'Account login', text: 'Some message!' },
    ];

    return { status: 'ok', messages };
  },

  async subscribeToArea({ areaId, accountId }) {
    console.log({ method: 'messenger.subscribeToArea', areaId, accountId });
    // method should work only for users of the Area
    return { status: 'ok' };
  },

  async unsubscribeFromArea({ areaId, accountId }) {
    console.log({ method: 'messenger.unsubscirbeFromArea', areaId, accountId });
    // method should work only for users of the Area
    return { status: 'ok' };
  },

  async sendMessage({ areaId, text }) {
    console.log({ method: 'messenger.sendMessage', areaId, text });
    // accountId (property "from") should be retrieved from Session
    // Session can be acceced by request token
    return { status: 'ok' };
  },
});
