const API_URL = import.meta.env.VITE_API_URL || '';

export const getSocketConfig = () => {
  // Используем URL бэкенда для WebSocket
  const socketUrl = API_URL || window.location.origin;

  return {
    url: socketUrl,
    options: {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      // Если нужно, добавьте путь к socket.io на бэкенде
      // path: '/socket.io',
    },
  };
};
