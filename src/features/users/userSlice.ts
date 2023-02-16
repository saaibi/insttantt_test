import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { setTime, validateTime } from '../../app/utils';

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
        birthdate: any,
        expeditionDate: any,
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
        expeditionDate: '',
        birthdate: '',
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

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            sessionStorage.clear()
            state.loggingIn = false;
            state.user = initialState.user
        },
        sessiontime: (state) => {
            if (!validateTime(initialState.time))
                userSlice.caseReducers.logout(state)
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
            .addCase(editUser.pending, (state, action) => {
                state.status = 'loading';
                userSlice.caseReducers.sessiontime(state)
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload.user;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addHobbie.pending, (state, action) => {
                state.status = 'loading';
                userSlice.caseReducers.sessiontime(state)
            })
            .addCase(addHobbie.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user.hobbies = action.payload.hobbies;
            });
    },
});

export const { logout, sessiontime } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
