import React from 'react';
import { Switch, Route } from 'react-router';
import HomeContainer from './components/home/HomeContainer';
import HeaderContainer from './components/header/HeaderContainer';
import DetailContainer from './components/detail/DetailContainer';
import Settings from './components/settings/Settings';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderContainer />
      </header>
      <div className="content">
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/detail' component={DetailContainer} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
