import authService from "../../services/authService";
import { actionTypes } from "../actions/authActions";

export function reducer(state={
    user: authService.getCurrentUser(),
    token: authService.getToken()
}, action) {
    switch (action.type) {
        case actionTypes.Login:
            return {
                ...state,
                ...action.payload
            };
        case actionTypes.Register:
            return {
                ...state,
                ...action.payload
            };
        case actionTypes.Update:
            return {
                ...state,
                ...action.payload
            };
        case actionTypes.Logout:
            return {}
        default:
            return state;
    }
};