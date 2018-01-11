import React from 'react';
import { BrowserRouter, Link } from 'react-browser-router';
import DonutChart from './DonutChart';
import './Indicators.css';
let axios = require('axios');
const server = require('../Compare/config').server;
const arb_percent = require('./config').arb_percent;

class Indicators extends React.Component {
    constructor() {
        super();
        this.apiData = [];
        this.state = { display:[<div>Loading...</div>] };
    }

    findSmallestBid = (array, signal) => {
        let smallestBidObject = {smallestBid : null, exchange : null, name: null};
        array.forEach((trade) => {
            if(trade.name === signal){
                if (smallestBidObject.smallestBid === null) {
                    smallestBidObject = {
                        smallestBid: trade.bid, 
                        exchange: trade.exchange,
                        name: trade.name
                    };
                } else if (smallestBidObject.smallestBid > trade.bid) {
                    smallestBidObject.smallestBid = trade.bid;
                    smallestBidObject.exchange = trade.exchange;
                    smallestBidObject.name = trade.name;
                }
            }
        });
        return smallestBidObject;
    }
    
    // find largest bid
    findLargestBid = (array, signal) => {
        let largestBidObject = {largestBid : null, exchange : null, name: null};
        
        array.forEach((trade) => {
            if(trade.name === signal){
                if (largestBidObject.largestBid === null) {
                largestBidObject = {
                    largestBid: trade.bid, 
                    exchange: trade.exchange,
                    name: trade.name
                };
            } 
            if (largestBidObject.largestBid < trade.bid) {
                largestBidObject.largestBid = trade.bid;
                largestBidObject.exchange = trade.exchange;
                largestBidObject.name = trade.name;
            }}
        });
        return largestBidObject;
    }
    
    // find largest ask
    findLargestAsk = (array, signal) => {
        let largestAskObject = {largestAsk: null, exchange : null, name: null};
    
        array.forEach((trade) => {
            if(trade.name === signal){
                if (largestAskObject.largestAsk === null) {
                    largestAskObject = {
                        largestAsk : trade.ask,
                        exchange : trade.exchange,
                        name: trade.name
                    };
                }
                if (largestAskObject.largestAsk < trade.ask) {
                    largestAskObject.largestAsk = trade.ask;
                    largestAskObject.exchange = trade.exchange;
                    largestAskObject.name = trade.name;
                }
            }
        });
        console.log(`High:${largestAskObject.exchange}-${largestAskObject.largestAsk}-${largestAskObject.name}`);             
        return  largestAskObject;
    }
    // find Smallest ask
    findSmallestAsk = (array, signal) => {
        let smallestAskObject = {smallestAsk: null, exchange : null, name: null};
        array.forEach((trade) => {
            if(trade.name === signal){
                if (smallestAskObject.smallestAsk === null) {
                    smallestAskObject = {
                        smallestAsk : trade.ask,
                        exchange : trade.exchange,
                        name: trade.name
                    };
                } 
                if (smallestAskObject.smallestAsk > trade.ask) {
                    smallestAskObject.smallestAsk = trade.ask;
                    smallestAskObject.exchange = trade.exchange;
                    smallestAskObject.name = trade.name;
                }
            }
        });
        console.log(`Low:${smallestAskObject.exchange}-${smallestAskObject.smallestAsk}-${smallestAskObject.name}`);               
        return  smallestAskObject;
    }
    
    //function to determine if arbitrage is available
    percentageOfArbitrageAvailable = (diff, high) => (diff * 100) / high;

    componentDidMount(){   
        setInterval(() => {
            const exchanges = ['gdax', 'poloniex', 'gemini'];
            const currencies = ["BTC_USD", "ETH_USD", "BTC_USD","BTC_USD","BTC_USD"];

            for(let i = 0; i < exchanges.length; i++) {
                for(let j = 0; j < currencies.length; j++) {
                    axios.get(`${server}/data/${exchanges[i]}/${currencies[j]}`)
                    .then((res) => {
                        res.data.bid = Number(res.data.bid);
                        res.data.ask = Number(res.data.ask);
                        this.apiData.push(res.data);
                    })
                    .catch(err => console.log(err));
                }
            } //Loop through API calls dynamically 

            if(this.apiData.length > 0){
                const display = [];
                currencies.forEach((currency) => { //Loop through currencies and create a display
                    display.push(
                        <label className="icons">Largest Possible {currency} Arbitrage Percent <br/><br/>
                            <DonutChart key={currency} parent={this} type={currency}/>
                        </label>);
                });
                if(display.length === currencies.length) this.setState({display}); //Display after all currencies are found
                this.apiData = [];//Clear API Data before the next interval
            }

        }, 5000); //End of Interval
    }

    render() {
        return (
            <div>
                <BrowserRouter><Link to="/historicalData" className="link">See Historical Data</Link></BrowserRouter>
                <div className="container">     
                {this.state.display} {/*Displays Only When Data Is Present*/}
                </div>
            </div>
        );
    }
}

export default Indicators;