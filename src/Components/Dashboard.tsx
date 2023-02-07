import React from 'react'
import { useAppSelector } from '../app/hooks';
import UserEdit from '../features/users/UserEdit';
import { selectUser } from '../features/users/userSlice';

export default function Dashboard() {
    const user = useAppSelector(selectUser);

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        <li className="list-group-item">{user.user.firstName}</li>
                        <li className="list-group-item">{user.user.lastName}</li>
                        <li className="list-group-item">{user.user.email}</li>
                        <li className="list-group-item">{`${user.user.phoneNumber}`}</li>
                        <li className="list-group-item">{user.user.documentType}</li>
                        <li className="list-group-item">{`${user.user.documentNumber}`}</li>
                        <li className="list-group-item">{`${user.user.birthdate}`}</li>
                        <li className="list-group-item">{`${user.user.expeditionDate}`}</li>
                        <li className="list-group-item">{user.user.country}</li>
                        <li className="list-group-item">{user.user.city}</li>
                        <li className="list-group-item">{user.user.address}</li>
                    </ul>
                </div>
                <div className="col">
                    <UserEdit id={user.user._id} />
                </div>
            </div>
        </div>
    )
}
