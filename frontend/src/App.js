import React from 'react';
import './App.css';
import HomeContainer from './components/home/HomeContainer';
import HeaderContainer from './components/header/HeaderContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderContainer />
      </header>
      <div className="content">
        <HomeContainer />
      </div>
    </div>
  );
}

export default App;
