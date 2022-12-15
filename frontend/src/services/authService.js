const getCurrentUser = () => {
  return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).user : null;
};

const getToken = () => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
}

const authService = {
  getCurrentUser,
  getToken
};

export default authService;