import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/users/userSlice';
import Modal from './Modal'

export default function Header() {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const { loggingIn } = useAppSelector(selectUser);

    useEffect(() => {
        if (loggingIn) {
            navigate('/dashboard', { replace: true })
        }
    }, [loggingIn, navigate])


    return (
        <nav className="navbar bg-primary" data-bs-theme="dark">
            <div className='ms-3'>
                <Link className='text-decoration-none' to="/">
                    <h3>Hubbec</h3>
                </Link>
            </div>
            {!user.loggingIn && <form className=" d-flex align-items-end flex-grow-1 flex-row-reverse" role="search">
                <Link to="/signup">
                    <button className="btn btn-secondary me-3" type="button">Sign Up</button>
                </Link>
                <button className="btn btn-secondary me-3" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Sign In</button>
                <Modal />
            </form>}
        </nav>
    )
}
