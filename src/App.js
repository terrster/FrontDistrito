import React from 'react';

// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/about-us.css'
import './css/account.css'
import './css/apply.css'
import './css/Chip.css'
import './css/custom-progress.css'
import './css/datepicker.css'
import './css/dnd.css'
import './css/doubts.css'
import './css/file-row.css'
import './css/footer.css'
import './css/general.css'
import './css/header.css'
import './css/land-simulator.css'
import './css/loader.css'
import './css/nav-bar.css'
import './css/progress-tracker.css'
import './css/signup.css'
import './css/tabs.css'
import './css/toast.css'
import './css/type-card.css'

import Landing from './components/Landing/Landing'


// ROUTER & REDUX
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
        <Switch>
          <Route path="/" exact component={Landing} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
