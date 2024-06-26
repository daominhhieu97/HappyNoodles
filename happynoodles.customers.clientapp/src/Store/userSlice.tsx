// features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    email: string;
    name: string;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    email: '',
    name: '',
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserState>) {
            state.isAuthenticated = true;
            state.email = action.payload.email
            state.name = action.payload.name
        },
        logout(state) {
            state.isAuthenticated = false;
            state.email = '';
            state.name = '';
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
