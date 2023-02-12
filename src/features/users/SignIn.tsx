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
        <div className="container text-center">
            <div className="row justify-content-md-center">
                <div className="col-sm-12 col-md-7 col-lg-7 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id='email' onChange={(e) => userOnChange('email', e.target.value)} type="text" className="form-control" />
                </div>
                <div className="col-sm-12 col-md-7 col-lg-7 mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Password</label>
                    <input
                        id='phoneNumber'
                        onChange={(e) => {
                            const val = parseInt(e.target.value.slice(0, 10))
                            userOnChange('phoneNumber', val)
                        }}
                        type="password"
                        className="form-control"
                    />
                </div>
            </div>
            <button onClick={() => dispatch(login(user))} className="btn btn-secondary mb-3" type="button">Sign In</button>
        </div>
    )
}
