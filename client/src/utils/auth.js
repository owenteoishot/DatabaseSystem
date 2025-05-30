export function isLoggedIn() {
  return !!localStorage.getItem('token');
}

export function getUserRole() {
  return localStorage.getItem('role');
}

export function isAdmin() {
  return getUserRole() === 'admin';
}

export function isMod() {
  return getUserRole() === 'moderator';
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/login';
}
