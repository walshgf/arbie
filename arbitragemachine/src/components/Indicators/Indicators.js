import React from 'react';
import { BrowserRouter, Link } from 'react-browser-router';
import DonutChart from './DonutChart';
import './Indicators.css';
let axios = require('axios');
const server = require('../Compare/config').server;
// import {
//     bitcoinSmallestBidExchange,
//     bitcoinLargestAskExchange,
//     percentageOfBitcoinArbitrageProfitable,
//     ethereumSmallestBidExchange,
//     ethereumLargestAskExchange,
//     percentageOfEthereumArbitrageProfitable
//     } from '../Compare/Compare';


class Indicators extends React.Component {
    constructor() {
        super();
        this.bitcoinArbitrageValue = null;
        this.bitcoinLowSeller = null;
        this.bitcoinHighBuyer = null;
        this.ethereumArbitrageValue = null;
        this.ethereumLowSeller = null;
        this.ethereumHighBuyer = null;
        this.state = {
            apiData:[], 
            btc:{argVal: null, low: null, high: null}, 
            eth:{argVal: null, low: null, high: null}
        }
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
        console.log("small ==>" + smallestBidObject.smallestBid);
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
            } else if (largestBidObject.largestBid > trade.bid) {
                largestBidObject.largestBid = trade.bid;
                largestBidObject.exchange = trade.exchange;
                largestBidObject.name = trade.name;
            }}
        });
        console.log("Large ==>" + largestBidObject.largestBid);
        return largestBidObject;
    }
    
    // find largest ask
    findLargestAsk = (array, signal) => {
        let largestAskObject = {largestAsk: null, exchange : null, name: null};
    
        array.forEach((trade) => {
            if (largestAskObject.largestAsk === null) {
                largestAskObject = {
                    largestAsk : trade.ask,
                    exchange : trade.exchange,
                    name: trade.name
                };
            } else if (largestAskObject.largestAsk < trade.ask) {
                largestAskObject.largestAsk = trade.ask;
                largestAskObject.exchange = trade.exchange;
                largestAskObject.name = trade.name;
            }
        });
        return  largestAskObject;
    }
    
    //function to determine if arbitrage is available
    percentageOfArbitrageAvailable = (bid, ask) => {
        return (bid / ask) * 100;
    }

    componentDidMount(){   
        setInterval(() => {
            axios.get(`${server}/get-producttickergdax`)
            .then((res) => {
                res.data.bid = Number(res.data.bid);
                res.data.ask = Number(res.data.ask);
                this.setState((props) => {
                    props.apiData.push(res.data)
                });
            });

            axios.get(`${server}/get-geminiBTC`)
            .then((res) => {
                res.data.bid = Number(res.data.bid);
                res.data.ask = Number(res.data.ask);
                this.setState((props) => {
                    props.apiData.push(res.data)
                });
            });

            axios.get(`${server}/get-geminiETH`)
            .then((res) => {
                res.data.bid = Number(res.data.bid);
                res.data.ask = Number(res.data.ask);
                this.setState((props) => {
                    props.apiData.push(res.data)
                });
            });
            axios.get(`${server}/get-poloniexBTC`)
            .then((res) => {
                res.data.bid = Number(res.data.bid);
                res.data.ask = Number(res.data.ask);
                this.setState((props) => {
                    props.apiData.push(res.data)
                });
            });
            axios.get(`${server}/get-poloniexETH`)
            .then((res) => {
                res.data.bid = Number(res.data.bid);
                res.data.ask = Number(res.data.ask);
                this.setState((props) => {
                    props.apiData.push(res.data);
                });
            });

            console.log(this.findSmallestBid(this.state.apiData, "BTC_USD"));
            console.log(this.findLargestBid(this.state.apiData, "BTC_USD"));



            const bitcoinSmallestBidObject = this.findSmallestBid(this.state.apiData, "BTC_USD");
            const bitcoinSmallestBidPrice = bitcoinSmallestBidObject.smallestBid;
            const bitcoinSmallestBidExchange = bitcoinSmallestBidObject.exchange;

            const bitcoinLargestBidObject = this.findLargestBid(this.state.apiData, "BTC_USD");
            const bitcoinLargestBidPrice = bitcoinLargestBidObject.largestBid;
            const bitcoinLargestBidExchange = bitcoinLargestBidObject.exchange;

            const bitcoinLargestAskObject = this.findLargestAsk(this.state.apiData, "BTC_USD");
            const bitcoinLargestAskPrice = bitcoinLargestAskObject.largestAsk;
            const bitcoinLargestAskExchange = bitcoinLargestAskObject.exchange;

            const percentageOfBitcoinArbitrageProfitable = this.percentageOfArbitrageAvailable(bitcoinSmallestBidPrice, bitcoinLargestAskPrice);

            const ethereumSmallestBidObject = this.findSmallestBid(this.state.apiData, "ETH_USD");
            const ethereumSmallestBidPrice = ethereumSmallestBidObject.smallestBid;
            const ethereumSmallestBidExchange = ethereumSmallestBidObject.exchange;

            const ethereumLargestAskObject = this.findLargestAsk(this.state.apiData, "ETH_USD");
            const ethereumLargestAskPrice = ethereumLargestAskObject.largestAsk;
            const ethereumLargestAskExchange = ethereumLargestAskObject.exchange;

            const percentageOfEthereumArbitrageProfitable = this.percentageOfArbitrageAvailable(ethereumSmallestBidPrice, ethereumLargestAskPrice);

            this.bitcoinArbitrageValue = percentageOfBitcoinArbitrageProfitable;
            this.bitcoinLowSeller = bitcoinSmallestBidExchange ;
            this.bitcoinHighBuyer = bitcoinLargestAskExchange ;
            this.ethereumArbitrageValue = percentageOfEthereumArbitrageProfitable ;
            this.ethereumLowSeller = ethereumSmallestBidExchange ;
            this.ethereumHighBuyer = ethereumLargestAskExchange ;
            this.setState({
                btc:{
                    argVal: this.bitcoinArbitrageValue,
                    low:this.bitcoinLowSeller,
                    high:this.bitcoinLowSeller
                },
                eth: {
                    argVal:this.bitcoinArbitrageValue,
                    low:this.bitcoinLowSeller,
                    high:this.bitcoinHighBuyer
                }
            });
            this.setState({apiData: []});
        }, 5000);
    }

    render() {
        return (
            <div>
                <BrowserRouter><Link to="/historicalData" className="link">See Historical Data</Link></BrowserRouter>
                <div className="container">
                    <label className="icons">Largest Possible BitCoin Arbitrage Percent <br/><br/>
                        <DonutChart value={this.state.btc.argVal} lowSeller={this.state.btc.low} highBuyer={this.state.btc.high} />
                    </label>
                    <label className= "icons">Largest Possible Ethereum Arbitrage Percent <br/><br/>
                        <DonutChart value={this.state.eth.argVal} lowSeller={this.state.eth.low} highBuyer={this.state.eth.high} />
                    </label>
                </div>
            </div>
        );
    }
}

export default Indicators;