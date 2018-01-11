import React, { Component } from 'react';
import Flickity from 'flickity';
import { 
	findSmallestBid, 
	findLargestBid, 
	findLargestAsk, 
	findSmallestAsk,
	percentageOfArbitrageAvailable,
	checkNull
} from './helpers';
import update from 'immutability-helper';
import Axios from 'axios';
import Graph from './Graph';
const server = require('../Compare/config').server;

export default class Graphs extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      apiData:[],
      btc:{argVal: null, low: null, high: null, LP: null, HP: null}, 
      eth:{argVal: null, low: null, high: null, LP: null, HP: null},
      allActive: false,
      curIndex: 0
    }
  }

  componentDidMount = () => {
    this.init();
    setInterval(this.init, 5000);
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
    this.flkty.on('cellSelect', this.updateSelected);
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resize, false);
  }

  resize = () => {
    this.setState({ allActive: window.innerWidth > 669 })
  }

  updateSelected = () => {
    const index = this.flkty.selectedIndex;
    this.setState({ curIndex: index });
  }

  init = () => {   
    Axios.all([
      Axios.get(`${server}/get-producttickergdax`),
      Axios.get(`${server}/get-geminiBTC`),
      Axios.get(`${server}/get-geminiETH`),
      Axios.get(`${server}/get-poloniexBTC`),
      Axios.get(`${server}/get-poloniexETH`),
    ]).then(res => {
      res.forEach(response => {
        response.data.bid = Number(response.data.bid);
        response.data.ask = Number(response.data.ask);
        this.setState(prevState => {
          const ns = update(prevState.apiData, {$push: [response.data]});
          return { apiData: ns }
        });
      });
    }).catch(err => console.log(err));

    if(this.state.apiData.length === 5) this.setState({done: true});
    if(this.state.done){

      console.log(findSmallestAsk(this.state.apiData, "BTC_USD"));
      console.log(findLargestAsk(this.state.apiData, "BTC_USD"));

      const bitcoinSmallestBidObject = findSmallestBid(this.state.apiData, "BTC_USD");
      const bitcoinSmallestBidPrice = bitcoinSmallestBidObject.smallestBid;
      const bitcoinSmallestBidExchange = bitcoinSmallestBidObject.exchange;

      const bitcoinLargestBidObject = findLargestBid(this.state.apiData, "BTC_USD");
      const bitcoinLargestBidPrice = bitcoinLargestBidObject.largestBid;
      const bitcoinLargestBidExchange = bitcoinLargestBidObject.exchange;

      const bitcoinLargestAskObject = findLargestAsk(this.state.apiData, "BTC_USD");
      const bitcoinLargestAskPrice = bitcoinLargestAskObject.largestAsk;
      const bitcoinLargestAskExchange = bitcoinLargestAskObject.exchange;

      const bitcoinSmallestAskObject = findSmallestAsk(this.state.apiData, "BTC_USD");
      const bitcoinSmallestAskPrice = bitcoinSmallestAskObject.smallestAsk;
      const bitcoinSmallestAskExchange = bitcoinSmallestAskObject.exchange;

      const percentageOfBitcoinArbitrageProfitable = percentageOfArbitrageAvailable(this.bitcoinHighPrice - this.bitcoinLowPrice, bitcoinLargestAskPrice);

      const ethereumSmallestBidObject = findSmallestBid(this.state.apiData, "ETH_USD");
      const ethereumSmallestBidPrice = ethereumSmallestBidObject.smallestBid;
      const ethereumSmallestBidExchange = ethereumSmallestBidObject.exchange;

      const ethereumLargestBidObject = findLargestBid(this.state.apiData, "ETH_USD");
      const ethereumLargestBidPrice = ethereumLargestBidObject.largestBid;
      const ethereumLargestBidExchange = ethereumLargestBidObject.exchange;

      const ethereumLargestAskObject = findLargestAsk(this.state.apiData, "ETH_USD");
      const ethereumLargestAskPrice = ethereumLargestAskObject.largestAsk;
      const ethereumLargestAskExchange = ethereumLargestAskObject.exchange;

      const ethereumSmallestAskObject = findSmallestAsk(this.state.apiData, "ETH_USD");
      const ethereumSmallestAskPrice = ethereumSmallestAskObject.smallestAsk;
      const ethereumSmallestAskExchange = ethereumSmallestAskObject.exchange;

      const percentageOfEthereumArbitrageProfitable = percentageOfArbitrageAvailable(this.ethereumHighPrice - this.ethereumLowPrice, ethereumLargestAskPrice);

      this.bitcoinArbitrageValue = percentageOfBitcoinArbitrageProfitable;
      this.bitcoinLowSeller = bitcoinSmallestAskExchange ;
      this.bitcoinHighBuyer = bitcoinLargestAskExchange ;
      this.bitcoinHighPrice = bitcoinLargestAskPrice;
      this.bitcoinLowPrice = bitcoinSmallestAskPrice;
      this.ethereumArbitrageValue = percentageOfEthereumArbitrageProfitable ;
      this.ethereumLowSeller = ethereumSmallestAskExchange ;
      this.ethereumHighBuyer = ethereumLargestAskExchange ;
      this.ethereumHighPrice = ethereumLargestAskPrice;
      this.ethereumLowPrice = ethereumSmallestAskPrice;
      this.setState({
        btc:{
          argVal: this.bitcoinArbitrageValue,
          low:this.bitcoinLowSeller,
          high:this.bitcoinLowSeller,
          LP:this.bitcoinLowPrice,
          HP:this.bitcoinHighPrice
        },
        eth: {
          argVal: this.ethereumArbitrageValue,
          low:this.ethereumLowSeller,
          high:this.ethereumHighBuyer,
          LP:this.ethereumLowPrice,
          HP:this.ethereumHighPrice   
        },
        apiData: []
      });
  	}
	}

  render = () => {
    return (
    	<section className='graphs'>
    		<div id='graphs'>
        	<Graph 
        		heading="Bitcoin"
        		value={checkNull(this.state.btc.argVal)} 
          	lowSeller={checkNull(this.state.btc.low)} 
          	highBuyer={checkNull(this.state.btc.high)} 
          	highPrice={checkNull(this.state.btc.HP)} 
          	lowPrice={checkNull(this.state.btc.LP)}
            color1="#FFF056"
            color2="#FE9C1F"
          	active={this.state.allActive || this.state.curIndex === 0} />
          <Graph 
        		heading="Ethereum"
        		value={checkNull(this.state.eth.argVal)} 
          	lowSeller={checkNull(this.state.eth.low)} 
          	highBuyer={checkNull(this.state.eth.high)} 
          	highPrice={checkNull(this.state.eth.HP)} 
          	lowPrice={checkNull(this.state.eth.LP)} 
            color1="#A7CAFF"
            color2="#4C99FF"
          	active={this.state.allActive || this.state.curIndex === 1} />
    		</div>
    	</section> 
    );
  }
}
