import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div>
          <h1>Front</h1>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
