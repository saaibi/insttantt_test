import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/users/userSlice';
import socket from '../socket';

export default function Hobbies() {
  const { user } = useAppSelector(selectUser);
  const [hobbie, setHobbie] = useState<string>('');
  const [items, setItems] = useState<Array<any>>([]);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (!user.email || email === user.email) return
    socket.auth = { username: user.email };
    socket.connect();
    socket.on("connect", () => {
      console.log('connect')
    });
    socket.on("add hobbie", ({ hobbies }) => {
      setItems(hobbies)
    });
    socket.on("connect_error", (err) => {
      console.error(err)
    });
    setEmail(user.email)
  }, [user.email, email])

  useEffect(() => {
    setItems(user.hobbies)
  }, [user.hobbies])


  return (
    <div className="container text-center">
      <h2>Hobbies</h2>
      <div className="row">
        <div className="col">
          <ul className="list-group app-list">
            {
              items.slice(0).reverse().map((item: any) => <li key={item} className="list-group-item">{item}</li>)
            }
          </ul>
        </div>
        <div className="col">
          <div className="mb-3">
            <input id='hobbie' value={hobbie} onChange={(e) => setHobbie(e.target.value)} type="text" className="form-control" />
          </div>
          <button
            onClick={() => {
              setHobbie('');
              socket.emit("add hobbie", {
                content: hobbie,
                _id: user._id,
                email: email,
              });
            }}
            className="btn btn-secondary me-3" type="button">Add Hobbie</button>
        </div>
      </div>
    </div>
  )
}
