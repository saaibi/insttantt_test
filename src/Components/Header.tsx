import React from 'react'

export default function Header() {
    return (
        <nav className="navbar bg-primary" data-bs-theme="dark">
            <form className=" d-flex align-items-end flex-grow-1 flex-row-reverse" role="search">
                <button className="btn btn-secondary me-3" type="submit">Sign Up</button>
                <button className="btn btn-secondary me-3" type="submit">Sign In</button>
            </form>
        </nav>  
    )
}
