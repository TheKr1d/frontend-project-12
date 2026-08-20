const API_URL = import.meta.env.VITE_API_URL || '';

const routes = {
  newUser: () => `${API_URL}/api/v1/signup`,
  login: () => `${API_URL}/api/v1/login`,
  getChannels: () => `${API_URL}/api/v1/channels`,
  addChannel: () => `${API_URL}/api/v1/channels`,
  editChannel: (id) => `${API_URL}/api/v1/channels/${id}`,
  removeChannel: (id) => `${API_URL}/api/v1/channels/${id}`,
  getMessages: () => `${API_URL}/api/v1/messages`,
  addMessage: () => `${API_URL}/api/v1/messages`,
  editMessage: (id) => `${API_URL}/api/v1/messages/${id}`,
  removeMessage: (id) => `${API_URL}/api/v1/messages/${id}`,
};

export default routes;
