import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { login } from './userSlice';

export default function SignIn() {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState({});

    const userOnChange = (field: string, data: any) => {
        setUser((state: any) => ({ ...state, [field]: data }))
    }
    return (
        <>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input id='email' onChange={(e) => userOnChange('email', e.target.value)} type="email" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input id='phoneNumber' onChange={(e) => userOnChange('phoneNumber', e.target.value)} type="number" className="form-control" />
            </div>
            <button onClick={() => dispatch(login(user))} className="btn btn-secondary me-3" type="button">Sign In</button>
        </>
    )
}
