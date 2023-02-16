import React from 'react'
import { useAppSelector } from '../app/hooks';
import UserEdit from '../features/users/UserEdit';
import { selectUser } from '../features/users/userSlice';
import Hobbies from './Hobbies';

export default function Dashboard() {
    const { user } = useAppSelector(selectUser);

    const formatDate = (date: any) => date && new Date(date).toISOString().split('T')[0];

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        <li className="list-group-item">{user.firstName}</li>
                        <li className="list-group-item">{user.lastName}</li>
                        <li className="list-group-item">{user.email}</li>
                        <li className="list-group-item">{`${user.phoneNumber}`}</li>
                        <li className="list-group-item">{user.documentType}</li>
                        <li className="list-group-item">{`${user.documentNumber}`}</li>
                        <li className="list-group-item">{`${formatDate(user.birthdate)}`}</li>
                        <li className="list-group-item">{`${formatDate(user.expeditionDate)}`}</li>
                        <li className="list-group-item">{user.country}</li>
                        <li className="list-group-item">{user.city}</li>
                        <li className="list-group-item">{user.address}</li>
                    </ul>
                </div>
                <div className="col">
                    <UserEdit id={user._id} />
                </div>
            </div>
            <Hobbies />
        </div>
    )
}
