import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RootState {
    auth: AuthState;
}

interface User {
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: RootState = {
    auth : {
        user: null,
        loading: false,
        error: null,
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.auth.loading = true;
            state.auth.error = null;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.auth.user = action.payload;
            state.auth.loading = false;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.auth.loading = false;
            state.auth.error = action.payload;
        },
        logout(state) {
            state.auth.user = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;