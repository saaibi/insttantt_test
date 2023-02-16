import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

declare global {
    interface Window {
        bootstrap: any;
    }
}
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
        hobbies: Array<string>,
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
        hobbies: [],
    },
    time: 600000,
    loggingIn: false,
    status: 'idle',
};

const makeRequest = async (apiUrl: string, method: string, data = {}) => {
    try {
        const response = await axios(`${apiUrl}`, { method, data });
        if (response.data.error) {
            return Promise.reject(response.data.error);
        }
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createUser = createAsyncThunk('api/users/createUser', async (user: object) => {
    return await makeRequest('http://localhost:4000/api/users', 'POST', user)
});
export const login = createAsyncThunk('api/users/login', async (user: object) => {
    return await makeRequest('http://localhost:4000/api/users/login', 'POST', user)
});
export const editUser = createAsyncThunk('api/users/edit', async ({ user, id }: { user: object, id: string }) => {
    return await makeRequest(`http://localhost:4000/api/users/${id}/user`, 'PUT', user)
});
export const addHobbie = createAsyncThunk('api/users/hobbies', async ({ hobbie, id }: { hobbie: any, id: string }) => {
    return await makeRequest(`http://localhost:4000/api/users/${id}/hobbies`, 'PUT', hobbie)
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
        logout: (state) => {
            sessionStorage.clear()
            state.loggingIn = false;
            state.user = initialState.user
        }
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
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggingIn = true
                state.user = action.payload.user;
                setTime(state.time);
                const myModalEl = document.getElementsByClassName('modal-backdrop')
                const mybodyEl = document.body;
                myModalEl[0]?.classList.remove("show");
                myModalEl[0]?.classList.remove("modal-backdrop");
                mybodyEl.removeAttribute('style');
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload.user;
                setTime(state.time);
            })
            .addCase(addHobbie.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user.hobbies = action.payload.hobbies;
            });
    },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
