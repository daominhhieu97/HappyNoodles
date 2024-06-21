// reducer.js
const initialState = { isLoggedIn: false, token: null };
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, isLoggedIn: true};
        case 'LOGIN_FAIL':
            return { ...state, isLoggedIn: false};
        // ... other cases
        default:
            return state;
    }
};