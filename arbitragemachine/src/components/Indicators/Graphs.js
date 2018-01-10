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
import Axios from 'axios';
import DonutChart from './DonutChart';
import Graph from './Graph';
const server = require('../Compare/config').server;

export default class Graphs extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      apiData:[],
      btc:{argVal: null, low: null, high: null, LP: null, HP: null}, 
      eth:{argVal: null, low: null, high: null, LP: null, HP: null}
    }
  }

  componentDidMount = () => {   
    setInterval(() => {
      Axios.get(`${server}/get-producttickergdax`)
        .then((res1) => {
          res1.data.bid = Number(res1.data.bid);
          res1.data.ask = Number(res1.data.ask);
          Axios.get(`${server}/get-geminiBTC`)
          .then((res2) => {
            res2.data.bid = Number(res2.data.bid);
            res2.data.ask = Number(res2.data.ask);
            Axios.get(`${server}/get-geminiETH`)
              .then((res3) => {
                res3.data.bid = Number(res3.data.bid);
                res3.data.ask = Number(res3.data.ask);
                Axios.get(`${server}/get-poloniexBTC`)
                  .then((res4) => {
                    res4.data.bid = Number(res4.data.bid);
                    res4.data.ask = Number(res4.data.ask);
                    Axios.get(`${server}/get-poloniexETH`)
                      .then((res5) => {
                        res5.data.bid = Number(res5.data.bid);
                        res5.data.ask = Number(res5.data.ask);
                        this.setState(props => {
                          props.apiData.push(res1.data);
                          props.apiData.push(res2.data);
                          props.apiData.push(res3.data);
                          props.apiData.push(res4.data);
                          props.apiData.push(res5.data);
                        });
                      }).catch(err => console.log(err));
                  }).catch(err => console.log(err));
              }).catch(err => console.log(err));
          }).catch(err => console.log(err));
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
          }
        });
      	this.setState({
          apiData: []
      	});
    	}
  	}, 5000);
		setTimeout(() => {
			const sldr = document.getElementById('graphs');
			const options = {
	      cellSelector: '.graph',
	      setGallerySize: false,
	      contain: true,
	      initialIndex: 0,
	      accessibility: true,
	      prevNextButtons: false,
	      pageDots: false,
	      watchCSS: true
	      // selectedAttraction: 0.2,
	      // friction: 0.7
	    };
			this.flkty = new Flickity(sldr, options);
		}, 300);
	}

  render = () => {
    return (
    	<section className='graphs'>
    		<div id='graphs'>
        	<Graph 
        		heading="Largest Possible BitCoin Arbitrage Percent"
        		value={checkNull(this.state.btc.argVal)} 
          	lowSeller={checkNull(this.state.btc.low)} 
          	highBuyer={checkNull(this.state.btc.high)} 
          	highPrice={checkNull(this.state.btc.HP)} 
          	lowPrice={checkNull(this.state.btc.LP)}
          	active={true} />
          <Graph 
        		heading="Largest Possible Ethereum Arbitrage Percent"
        		value={checkNull(this.state.eth.argVal)} 
          	lowSeller={checkNull(this.state.eth.low)} 
          	highBuyer={checkNull(this.state.eth.high)} 
          	highPrice={checkNull(this.state.eth.HP)} 
          	lowPrice={checkNull(this.state.eth.LP)} 
          	active={true} />
    		</div>
    	</section> 
    );
  }
}
