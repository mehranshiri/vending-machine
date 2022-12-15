import authService from "../services/authService";

export function updateStorage(data) {
    const newData = {
        token: authService.getToken(),
        user: data
    }
    localStorage.setItem("user", JSON.stringify(newData));
}