import React from 'react';
import ReactDOM from 'react-dom/client';
import { Screen,Login } from 'components';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('Container'));
root.render(
  <Router>
    <Routes>
      <Route path="/*" element={<Screen />} />
      {/* <Route path="/" element={<Login />} /> */}
    </Routes>
  </Router>
);

