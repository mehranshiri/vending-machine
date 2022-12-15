export const actionTypes = {
    Login: "[Login] Action",
    Logout: "[Logout] Action",
    Register: "[Register] Action",
    UserRequested: "[Request User] Action",
    Update: "[Update User] Auth API",
    SetToken: "SetToken"
  };

export const authActions = {
    login: data => ({ type: actionTypes.Login, payload:  data }),
    register: data => ({ type: actionTypes.Register, payload:  data }),
    update: data => ({ type: actionTypes.Update, payload:  data }),
    logout: () => ({ type: actionTypes.Logout, payload:  {} }),
}