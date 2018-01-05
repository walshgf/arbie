import React, { Component } from 'react';
import style from './components/Navigation/Navigation.css';
import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Homepage/Homepage';
import Indicators from './components/Indicators/Indicators';
import Footer from './components/Footer/Footer';


class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Homepage />
        <Indicators />
        <Footer />
      </div>
    );
  }
}

export default App;
