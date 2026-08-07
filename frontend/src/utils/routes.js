const routes = {
  newUser: () => '/api/v1/signup',
  login: () => '/api/v1/login',
  getChannels: () => '/api/v1/channels',
  addChannel: () => '/api/v1/channels',
  editChannel: (id) => `/api/v1/channels/${id}`,
  removeChannel: (id) => `/api/v1/channels/${id}`,
  getMessages: () => '/api/v1/messages',
  addMessage: () => '/api/v1/messages',
  editMessage: (id) => `/api/v1/messages/${id}`,
  removeMessage: (id) => `/api/v1/messages/${id}`,
};

export default routes;
