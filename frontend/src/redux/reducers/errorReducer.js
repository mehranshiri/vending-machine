import { actionTypes } from "../actions/errorActions";

export function reducer(state={
    show: false,
    message: ''
}, action) {
    switch (action.type) {
        case actionTypes.Message:
            return {
                ...state,
                show: true,
                message: action.payload
            };
        case actionTypes.Clear:
            return {
                ...state,
                show: false,
                message: ''
            };
        default:
            return state;
    }
};