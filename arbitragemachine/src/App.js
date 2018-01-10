import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-browser-router';
// import './components/Navigation/Navigation.css';
// import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Homepage/Homepage';
import Indicators from './components/Indicators/Indicators';
import Footer from './components/Footer/Footer';
import Team from './components/Team/Team';
import Display from './components/Display/Display';

import Nav from './components/Nav/Nav';
import Menu from './components/Menu/Menu';
import Graphs from './components/Indicators/Graphs';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuToggle: true,
      burgerClasses : 'hamburglar is-open',
      menuClasses: 'menu'
    }
  }

  toggleMenu = () => {
    this.setState(prevState => {
      return {
          menuToggle : !prevState.menuToggle,
          burgerClasses : (prevState.burgerClasses === "hamburglar is-open") ? 
                          "hamburglar is-closed" : 
                          "hamburglar is-open",
          menuClasses: (prevState.menuClasses === "menu") ? 
                        "menu menu-show" : 
                        "menu",
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
{/*          <Navigation />*/}
          <Nav 
            classes={this.state.burgerClasses}
            toggleMenu={this.toggleMenu} />

          <Menu
            classes={this.state.menuClasses}
            toggleMenu={this.toggleMenu} />

          <Route path="/home" component={Homepage} />
          <Route exact path="/" component={Graphs} />
          <Route path="/team" component={Team} />
          <Route path="/historicalData" component={Display} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
