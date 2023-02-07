import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { createUser } from './userSlice';

export default function SignUp() {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({});

  const userOnChange = (field: string, data: any) => {
    setUser((state: any) => ({ ...state, [field]: data }))
 }

  return (
    <div className='row'>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input id='firstName' onChange={(e) => userOnChange('firstName', e.target.value)} type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input id='lastName' onChange={(e) => userOnChange('lastName', e.target.value)} type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input id='email' onChange={(e) => userOnChange('email', e.target.value)} type="email" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
        <input id='phoneNumber' onChange={(e) => userOnChange('phoneNumber', e.target.value)} type="number" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="documentType" className="form-label">Document Type</label>
        <input id='documentType' onChange={(e) => userOnChange('documentType', e.target.value)} type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="documentNumber" className="form-label">Document Number</label>
        <input id='documentNumber' onChange={(e) => userOnChange('documentNumber', e.target.value)} type="number" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="birthdate" className="form-label">Birthdate</label>
        <input id='birthdate' onChange={(e) => userOnChange('birthdate', e.target.value)} type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="expeditionDate" className="form-label">Expedition Date</label>
        <input id='expeditionDate' onChange={(e) => userOnChange('expeditionDate', e.target.value)} type="text" className="form-control" />
      </div>
      <button onClick={() => dispatch(createUser(user))} className="btn btn-secondary me-3" type="submit">Sign Up</button>
    </div>
  )
}
