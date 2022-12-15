export const actionTypes = {
    Message: "[Message] Action",
    Clear: "[Clear] Action"
};

export const actions = {
    show: message => ({type: actionTypes.Message, message}),
    clear: () => ({type: actionTypes.Clear}),

};