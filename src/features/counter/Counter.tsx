import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getUser, createUser, updateUser, selectuser} from './userSlice';

export function Counter() {
  const count = useAppSelector(selectuser);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div >
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(getUser())}
        >
          -
        </button>
        <span>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(createUser())}
        >
          +
        </button>
      </div>
      <div >
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          onClick={() => dispatch(updateUser(incrementValue))}
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}
