import React, { Fragment } from 'react';
import SignUp from './features/users/SignUp';
import { Route, Routes } from 'react-router-dom';

import Header from './Components/Header'
import Dashboard from './Components/Dashboard';

export default function App() {
  return (
    <Fragment>
      <Header />
        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Fragment>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}