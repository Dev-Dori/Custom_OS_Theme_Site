import React from 'react';
import ReactDOM from 'react-dom/client';
import { Screen } from 'components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('Container'));
root.render(
  <Router>
    <Routes>
      <Route path="/*" element={<Screen />} />
    </Routes>
  </Router>
);

