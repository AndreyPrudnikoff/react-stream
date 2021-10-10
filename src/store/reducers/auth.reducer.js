const initialState = {
    error: ''
}
export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'error':
            return {...state, error: action.payload}
        default:
            return state
    }
}
