import React from 'react';
import { Route, Routes, NavLink, BrowserRouter } from 'react-router-dom';
import DynamicFormPlayground from '../pages/dynamic-form';

export function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <NavLink to="/dynamic-form">/dynamic-form</NavLink>
        </li>
        <li>
          <NavLink to="/">/</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<div>hello react !</div>} />
        <Route path="/dynamic-form" element={<DynamicFormPlayground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
