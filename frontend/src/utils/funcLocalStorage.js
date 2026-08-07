export const addToken = ({ username, token }) => {
  localStorage.setItem('user', JSON.stringify({ username, token }));
};

export const getToken = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeToken = () => {
  localStorage.removeItem('user');
};
