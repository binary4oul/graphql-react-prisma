import React from 'react';
import logo from '../logo.svg';
// import '../styles/App.css';

import LinkList from './LinkList'
import CreateLink from './CreateLink';
import Login from './Login'
import { Route, Routes } from 'react-router-dom';
import Header from './Header';

function App() {
  return (
    <>
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<LinkList/>} />
          <Route
            path="/create"
            element={<CreateLink/>}
          />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </>
  )
}

export default App;
