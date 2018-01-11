import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-browser-router';
import Homepage from './components/Homepage/Homepage';
import Footer from './components/Footer/Footer';
import Team from './components/Team/Team';
import Display from './components/Display/Display';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Graphs from './components/Indicators/Graphs';


export default class App extends Component {
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

          <Header 
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
