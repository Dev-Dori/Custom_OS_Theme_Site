import React from 'react';
import ReactDOM from 'react-dom/client';
import { Screen } from 'components';
import { HashRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('Container'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<Screen />} />
      {/* <Route path="/" element={<Login />} /> */}
    </Routes>
  </BrowserRouter>
);

