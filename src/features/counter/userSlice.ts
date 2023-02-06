import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
    user: object;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
    user: {},
    status: 'idle',
};


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUser: (state) => {
            state.user = { id: '123' };
        },
        createUser: (state) => {
            state.user = { id: '456' };
        },
        updateUser: (state, action: PayloadAction<number>) => {
            console.log(action)
            state.user = { id: '789' };
        },
    },
});

export const { getUser, createUser, updateUser } = userSlice.actions;

export const selectuser = (state: RootState) => state;

export default userSlice.reducer;
