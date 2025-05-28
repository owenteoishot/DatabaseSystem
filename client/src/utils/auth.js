export const getToken = () => localStorage.getItem('token');

export const getRole = () => localStorage.getItem('role') || 'user';

export const isAdmin = () => getRole() === 'admin';

export const isLoggedIn = () => !!getToken();

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/login';
};
