export const logout = () => {
  // Clear user data from local storage
  localStorage.removeItem('user');

  // Optionally, you can redirect the user to the login page or home page
  window.location.href = '/login';
};
