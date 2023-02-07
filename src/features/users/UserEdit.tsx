import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { editUser } from './userSlice';

type UserEdits = {
    id: string;
};

export default function UserEdit({ id }: UserEdits) {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState({});

    const userOnChange = (field: string, data: any) => {
        setUser((state: any) => ({ ...state, [field]: data, id }))
    }
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input id='country' onChange={(e) => userOnChange('country', e.target.value)} type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input id='city' onChange={(e) => userOnChange('city', e.target.value)} type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input id='address' onChange={(e) => userOnChange('address', e.target.value)} type="text" className="form-control" />
            </div>
            <button onClick={() => dispatch(editUser({ user, id })).unwrap()} className="btn btn-secondary me-3" type="button">Save</button>
        </div>
    )
}
