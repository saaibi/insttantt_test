import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { createUser } from './userSlice';

export default function SignUp() {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({ phoneNumber: '' });

  const userOnChange = (field: string, data: any) => {
    setUser((state: any) => ({ ...state, [field]: data }))
  }
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container text-center">
      <div className="row justify-content-md-center">
        <div className=" col-sm-12 col-md-7 col-lg-7 mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input id='firstName' onChange={(e) => userOnChange('firstName', e.target.value)} type="text" maxLength={100} className="form-control" />
        </div>
        <div className=" col-sm-12 col-md-7 col-lg-7 mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input id='lastName' onChange={(e) => userOnChange('lastName', e.target.value)} type="text" maxLength={100} className="form-control" />
        </div>
        <div className=" col-sm-12 col-md-7 col-lg-7 mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input id='email' onChange={(e) => userOnChange('email', e.target.value)} type="email" required className="form-control" />
        </div>
        <div className=" col-sm-12 col-md-7 col-lg-7 mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input id='phoneNumber' value={user.phoneNumber} onChange={(e) => userOnChange('phoneNumber', e.target.value.slice(0, 10))} type="number" className="form-control" />
        </div>
        <div className=" col-sm-12 col-md-7 col-lg-7 mb-3">
          <label htmlFor="documentType" className="form-label">Document Type</label>
          <select onChange={(e) => userOnChange('documentType', e.target.value)} className="form-select" aria-label="Default select example">
            <option defaultValue='CC'>Select</option>
            <option value="CC">CC</option>
            <option value="CE">CE</option>
            <option value="TI">TI</option>
            <option value="PA">PA</option>
          </select>
        </div>
        <div className=" col-sm-12 col-md-7 col-lg-7 mb-3">
          <label htmlFor="documentNumber" className="form-label">Document Number</label>
          <input id='documentNumber' onChange={(e) => userOnChange('documentNumber', e.target.value)} type="number" className="form-control" />
        </div>
        <div className=" col-sm-12 col-md-7 col-lg-7 mb-3">
          <label htmlFor="birthdate" className="form-label">Birthdate</label>
          <input id='birthdate' onChange={(e) => userOnChange('birthdate', e.target.value)} type="date" max={today} className="form-control" />
        </div>
        <div className=" col-sm-12 col-md-7 col-lg-7 mb-3">
          <label htmlFor="expeditionDate" className="form-label">Expedition Date</label>
          <input id='expeditionDate' onChange={(e) => userOnChange('expeditionDate', e.target.value)} type="date" max={today} className="form-control" />
        </div>
      </div>
      <button onClick={() => dispatch(createUser(user))} className="btn btn-secondary me-3" type="button">Sign Up</button>
      <div className="toast" id='toast_id' role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
    </div>
  )
}
