import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout, selectUser } from '../features/users/userSlice';
import Modal from './Modal'

export default function Header() {
    const [signup, setSignup] = useState(false)
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.loggingIn) {
            setSignup(false)
            navigate('/dashboard', { replace: true })
        }
        if (!user.loggingIn && !signup) {
            navigate('/', { replace: true })
        }
    }, [user.loggingIn, signup, navigate])

    return (
        <nav className="navbar bg-primary" data-bs-theme="dark">
            <div className='ms-3'>
                <Link className='text-decoration-none' to="/">
                    <h3>Hubbec</h3>
                </Link>
            </div>
            {!user.loggingIn && <div className="d-flex align-items-end flex-grow-1 flex-row-reverse" role="search">
                <Link to="/signup">
                    <button onClick={() => setSignup(true)} className="btn btn-secondary me-3" type="button">Sign Up</button>
                </Link>
                <button className="btn btn-secondary me-3" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Sign In</button>
                <Modal />
            </div>}
            {user.loggingIn && <button onClick={() => dispatch(logout())} className="btn btn-secondary me-3" type="button">Logout</button>}
        </nav>
    )
}
