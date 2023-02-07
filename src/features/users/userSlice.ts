import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export interface UserState {
    user: {
        _id: string,
        email: string,
        phoneNumber: number,
        firstName: string,
        lastName: string,
        documentType: string,
        documentNumber: number,
        birthdate: Date,
        expeditionDate: Date,
        country: string,
        city: string,
        address: string,
        photoProfile: string,
    };
    time: any;
    loggingIn: boolean;
    status: 'idle' | 'loading' | 'failed';
}


const initialState: UserState = {
    user: {
        _id: '',
        email: '',
        phoneNumber: 0,
        firstName: '',
        lastName: '',
        documentType: '',
        documentNumber: 0,
        country: '',
        city: '',
        address: '',
        expeditionDate: new Date(),
        birthdate: new Date(),
        photoProfile: '',
    },
    time: 600000,
    loggingIn: false,
    status: 'idle',
};

export const createUser = createAsyncThunk('api/users/createUser', async (user: object) => {
    const response = await axios.post('http://localhost:4000/api/users', user);
    return response.data;
});
export const login = createAsyncThunk('api/users/login', async (user: object) => {
    const response = await axios.post('http://localhost:4000/api/users/login', user);
    return response.data;
});
export const editUser = createAsyncThunk('api/users/edit', async ({ user, id }: { user: object, id: string }) => {
    const response = await axios.put(`http://localhost:4000/api/users/${id}/user`, user);
    return response.data;
});


const setTime = (time: any) => {
    const now: number = new Date().getTime();
    sessionStorage.setItem('timeExpiration', now + time);
}

// const getTime = sessionStorage.getItem('timeExpiration')

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'idle'
                state.loggingIn = true
                state.user = action.payload.user;
                setTime(state.time);
            })
            .addCase(createUser.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggingIn = true
                state.user = action.payload.user;
                setTime(state.time);
                const myModalEl = document.getElementsByClassName('modal-backdrop')
                myModalEl[0]?.classList.remove("show");
                myModalEl[0]?.classList.remove("modal-backdrop");
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload.user;
                setTime(state.time);
            });
    },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
