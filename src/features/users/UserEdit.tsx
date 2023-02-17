import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { editUser } from './userSlice';

type UserEdits = {
    id: string;
};

// type UserState {
//     country: string,
//     city: string,
//     address: string,
//     photoProfile: string,
// }

export default function UserEdit({ id }: UserEdits) {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<object>({});

    const userOnChange = (field: string, data: any) => {
        setUser((state: any) => ({ ...state, [field]: data, id }))
    }

    const uploadImage = async (field: string, event: any) => {
        // const file = event.target.files[0];
        // userOnChange(field, file);
    };

    const onClickBtn = () => {
        // const formData = new FormData();
        // Object.keys(user).forEach((k) => {
        //     formData.append(k, user[k])
        // })
        dispatch(editUser({ user, id })).unwrap()
    }


    return (
        <>
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
                <input id='address' onChange={(e) => userOnChange('address', e.target.value)} type="text" maxLength={100} className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Photo Profile</label>
                <input className="form-control" accept="image/*" onChange={(e) => uploadImage('photoProfile', e)} type="file" id="formFile" />
            </div>
            <button onClick={onClickBtn} className="btn btn-secondary me-3" type="button">Save</button>
        </>
    )
}
