// features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    token: string;
    isAuthenticated: boolean;
    user : User;
}

interface User {
    email: string;
    name : string;
}

const initialState: UserState = {
    user : {
        email: '',
        name: ''
    },
    isAuthenticated: false,
    token: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserState>) {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.user.email = action.payload.user.email;
            state.user.name = action.payload.user.name;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = {
                email: '',
                name: ''
            };
            state.token = '';
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
