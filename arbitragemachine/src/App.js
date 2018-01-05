import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  } from 'react-browser-router';
import './components/Navigation/Navigation.css';
import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Homepage/Homepage';
import Indicators from './components/Indicators/Indicators';
import Footer from './components/Footer/Footer';
import Team from './components/Team/Team';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Route path="/home" component={Homepage} />
          <Route path="/chart" component={Indicators} />
          <Route path="/team" component={Team} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
