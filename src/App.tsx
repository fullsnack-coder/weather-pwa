import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import { AppContextProvider } from './context/app';
import ENavigator from './components/eNavigator/eNavigator';
import Profile from './pages/Profile/Profile';
import { kick } from './services/userAccount';
import { UserProvider } from './context/userContext';
import AppContainer from './utils/hocs/AppContainer';
import ErrorPage from './pages/ErrorPage';

function App() {
  useEffect(() => {
    kick();
  }, []);

  return (
    <AppContextProvider>
      <UserProvider>
        <Router>
          <AppContainer>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/profile" exact component={Profile} />
              <Route component={ErrorPage} />
            </Switch>
            <ENavigator />
          </AppContainer>
        </Router>
      </UserProvider>
    </AppContextProvider>
  );
}

export default App;
