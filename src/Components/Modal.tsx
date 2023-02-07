import React from 'react'
import SignIn from '../features/users/SignIn'

export default function Modal() {
    return (
        <div>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <SignIn />
                    </div>
                </div>
            </div>
        </div>
    )
}
