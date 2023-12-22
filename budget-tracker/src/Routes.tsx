// src/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route,  } from 'react-router-dom';

import Home from './components/Home/Home.tsx';
import Send from './components/Send';
import Buy from './components/Buy';

const Routes: React.FC = () => {
  return (
    <Router>
      <Route>
        <Route path="/"  Component={Home} />
        <Route path="/send" Component={Send} />
        <Route path="/buy" Component={Buy} />
      </Route>
    </Router>
  );
};

export default Routes;
