import React, { Component } from 'react';
import Flickity from 'flickity';
import update from 'immutability-helper';
import Axios from 'axios';
import Graph from './Graph';
const server = require('../Compare/config').server;

export default class Graphs extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      apiData:[],
      allActive: false,
      curIndex: 0
    }
    this.exchanges = ['gdax', 'poloniex', 'gemini'];
    this.currencies = [
      {type: "BTC_USD", heading: 'Bitcoin', color1: "#FFF056", color2: "#FE9C1F"},
      {type: "ETH_USD", heading: 'Ethereum', color1: "#A7CAFF", color2: "#4C99FF"},
      {type: "BTC_USD", heading: 'Bitcoin', color1: "#FFF056", color2: "#FE9C1F"},
      {type: "ETH_USD", heading: 'Ethereum', color1: "#A7CAFF", color2: "#4C99FF"},
    ]; 
    //Added colors to each currency to make the graphs feel
    //a little bit more familiar - these can be dynamic or part of the api
  }

  componentDidMount = () => {
    //Start fetching data
    this.init();
    setInterval(this.init, 5000);
    //Build slider component => each slide is the Graph Component (Graph.js)
    const sldr = document.getElementById('graphs');
    const options = {
      cellSelector: '.graph',
      setGallerySize: false,
      contain: true,
      initialIndex: 0,
      accessibility: true,
      prevNextButtons: false,
      pageDots: false,
      watchCSS: true,
    };
    this.flkty = new Flickity(sldr, options);
    //Attach listener to animate only the visible Graph Component
    this.flkty.on('cellSelect', this.updateSelected);
    //Add resize handler to animate all graphs when slider is destroyed
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resize, false);
    if(this.flkty) {
      this.flkty.off('cellSelect', this.updateSelected);
      this.flkty.destroy()
    }
  }

  //when this.state.allActive is true all Graph
  //Components will animate changes in numeric values
  resize = () => {
    this.setState({ allActive: window.innerWidth > 669 });
  }

  //Allows state to keep track of the current visible Graph Component
  updateSelected = () => {
    const index = this.flkty.selectedIndex;
    this.setState({ curIndex: index });
  }

  init = () => { 
    //Create an array of URLs
    const http = [];
    for(let i = 0; i < this.exchanges.length; i++) {
      for(let j = 0; j < this.currencies.length; j++) {
        const url = `${server}/data/${this.exchanges[i]}/${this.currencies[j].type}`;
        http.push(url);
      }
    }
    //Make GET request to each of the urls in http array
    Axios.all(http.map(url => Axios.get(url)))
      .then(res => {
        //Loop through each response object and create numbers from Bid and Ask
        res.forEach(response => {
          response.data.bid = Number(response.data.bid);
          response.data.ask = Number(response.data.ask);
          //Set state without mutation 
          //update function comes from (immutability-helper)
          this.setState(prevState => {
            const ns = update(prevState.apiData, {$push: [response.data]}); //THIS IS A COPY OF THE STATE OBJECT THAT HAS BEEN GIVEN THE RESPONSE DATA
            return { apiData: ns }
          });
        });
      }).catch(err => console.log(err));

    //Set aside to create a loader while data is being fetched
    // if(this.state.apiData.length > 0) this.setState({done: true});
	}

  render = () => {
    return (
    	<section className='graphs'>
    		<div id='graphs'>
          {
            this.currencies.map((currency, i) => {
              return (
                <Graph
                  key={i} 
                  type={currency.type}
                  heading={currency.heading}
                  data={this.state.apiData}
                  color1={currency.color1}
                  color2={currency.color2}
                  active={this.state.allActive || this.state.curIndex === i} />
              );
            })
          }
    		</div>
    	</section> 
    );
  }
}
