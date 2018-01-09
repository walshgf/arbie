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
        this.bitcoinArbitrageValue = null;
        this.bitcoinLowSeller = null;
        this.bitcoinHighBuyer = null;
        this.bitcoinHighPrice = null;
        this.bitcoinLowPrice = null;
        this.ethereumArbitrageValue = null;
        this.ethereumLowSeller = null;
        this.ethereumHighBuyer = null;
        this.ethereumHighPrice = null;
        this.ethereumLowPrice = null;
        this.state = {
            apiData:[],
            done: false, 
            display: <div />,
            btc:{argVal: null, low: null, high: null, LP: null, HP: null}, 
            eth:{argVal: null, low: null, high: null, LP: null, HP: null}
        }
    }

    findSmallestBid = (array, signal) => {
        console.log(array);
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
        console.log(smallestBidObject.exchange + " " + smallestBidObject.smallestBid);
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
        console.log(largestBidObject.exchange + " " + largestBidObject.largestBid);
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
        return  smallestAskObject;
    }
    
    //function to determine if arbitrage is available
    percentageOfArbitrageAvailable = (diff, high) => {
        return (diff * 100) / high;
    }

    componentDidMount(){   
        setInterval(() => {
            axios.get(`${server}/get-producttickergdax`)
            .then((res1) => {
                res1.data.bid = Number(res1.data.bid);
                res1.data.ask = Number(res1.data.ask);
                axios.get(`${server}/get-geminiBTC`)
                .then((res2) => {
                    res2.data.bid = Number(res2.data.bid);
                    res2.data.ask = Number(res2.data.ask);
                    axios.get(`${server}/get-geminiETH`)
                    .then((res3) => {
                        res3.data.bid = Number(res3.data.bid);
                        res3.data.ask = Number(res3.data.ask);
                        axios.get(`${server}/get-poloniexBTC`)
                        .then((res4) => {
                            res4.data.bid = Number(res4.data.bid);
                            res4.data.ask = Number(res4.data.ask);
                            axios.get(`${server}/get-poloniexETH`)
                            .then((res5) => {
                                res5.data.bid = Number(res5.data.bid);
                                res5.data.ask = Number(res5.data.ask);
                                this.setState((props) => {
                                    props.apiData.push(res1.data);
                                    props.apiData.push(res2.data);
                                    props.apiData.push(res3.data);
                                    props.apiData.push(res4.data);
                                    props.apiData.push(res5.data);
                                });
                            })
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

            

            
            
            

            if(this.state.apiData.length === 5) this.setState({done: true});
            if(this.state.done){

            console.log(this.findSmallestAsk(this.state.apiData, "BTC_USD"));
            console.log(this.findLargestAsk(this.state.apiData, "BTC_USD"));



            const bitcoinSmallestBidObject = this.findSmallestBid(this.state.apiData, "BTC_USD");
            const bitcoinSmallestBidPrice = bitcoinSmallestBidObject.smallestBid;
            const bitcoinSmallestBidExchange = bitcoinSmallestBidObject.exchange;

            const bitcoinLargestBidObject = this.findLargestBid(this.state.apiData, "BTC_USD");
            const bitcoinLargestBidPrice = bitcoinLargestBidObject.largestBid;
            const bitcoinLargestBidExchange = bitcoinLargestBidObject.exchange;

            const bitcoinLargestAskObject = this.findLargestAsk(this.state.apiData, "BTC_USD");
            const bitcoinLargestAskPrice = bitcoinLargestAskObject.largestAsk;
            const bitcoinLargestAskExchange = bitcoinLargestAskObject.exchange;

            const bitcoinSmallestAskObject = this.findSmallestAsk(this.state.apiData, "BTC_USD");
            const bitcoinSmallestAskPrice = bitcoinSmallestAskObject.smallestAsk;
            const bitcoinSmallestAskExchange = bitcoinSmallestAskObject.exchange;

            const percentageOfBitcoinArbitrageProfitable = this.percentageOfArbitrageAvailable(this.bitcoinHighPrice - this.bitcoinLowPrice, bitcoinLargestAskPrice);

            const ethereumSmallestBidObject = this.findSmallestBid(this.state.apiData, "ETH_USD");
            const ethereumSmallestBidPrice = ethereumSmallestBidObject.smallestBid;
            const ethereumSmallestBidExchange = ethereumSmallestBidObject.exchange;

            const ethereumLargestBidObject = this.findLargestBid(this.state.apiData, "ETH_USD");
            const ethereumLargestBidPrice = ethereumLargestBidObject.largestBid;
            const ethereumLargestBidExchange = ethereumLargestBidObject.exchange;

            const ethereumLargestAskObject = this.findLargestAsk(this.state.apiData, "ETH_USD");
            const ethereumLargestAskPrice = ethereumLargestAskObject.largestAsk;
            const ethereumLargestAskExchange = ethereumLargestAskObject.exchange;

            const ethereumSmallestAskObject = this.findSmallestAsk(this.state.apiData, "ETH_USD");
            const ethereumSmallestAskPrice = ethereumSmallestAskObject.smallestAsk;
            const ethereumSmallestAskExchange = ethereumSmallestAskObject.exchange;

            const percentageOfEthereumArbitrageProfitable = this.percentageOfArbitrageAvailable(this.ethereumHighPrice - this.ethereumLowPrice, ethereumLargestAskPrice);

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
                    high:this.bitcoinHighBuyer,
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
            if(this.state.btc.argVal >= arb_percent){
                //ADD ethereum to Db
                console.log("eth working");
                axios.post(`${server}/create/arb`, {
                    buy_exchange: this.ethereumLowSeller, 
                    sell_exchange: this.ethereumHighBuyer, 
                    buy_price: this.ethereumLowPrice, 
                    sell_price: this.ethereumHighPrice, 
                    percentage: this.ethereumArbitrageValue, 
                    currency_type: 'ETH_USD'
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch(err => console.log(err));
            }

            if(this.state.eth.argVal >= arb_percent){
                console.log("bit working");
                //ADD ethereum to Db
                axios.post(`${server}/create/arb`, {
                    buy_exchange: this.bitcoinLowSeller, 
                    sell_exchange: this.bitcoinHighBuyer, 
                    buy_price: this.bitcoinLowPrice, 
                    sell_price: this.bitcoinHighPrice, 
                    percentage: this.bitcoinArbitrageValue, 
                    currency_type: 'BTC_USD'
                })
                .then((res) => {

                    console.log(res);
                })
                .catch(err => console.log(err));
            }
            this.setState({
                apiData: [],
                done: false,
                display: <div className="container">
                <label className="icons">Largest Possible BitCoin Arbitrage Percent <br/><br/>
                    <DonutChart value={this.state.btc.argVal} lowSeller={this.state.btc.low} highBuyer={this.state.btc.high} highPrice={this.state.btc.HP} lowPrice={this.state.btc.LP}/>
                </label>
                <label className= "icons">Largest Possible Ethereum Arbitrage Percent <br/><br/>
                    <DonutChart value={this.state.eth.argVal} lowSeller={this.state.eth.low} highBuyer={this.state.eth.high} highPrice={this.state.eth.HP} lowPrice={this.state.eth.LP}/>
                </label>
            </div>
            });
        }
        }, 5000);
    }

    render() {
        return (
            <div>
                <BrowserRouter><Link to="/historicalData" className="link">See Historical Data</Link></BrowserRouter>
                {this.state.display}
            </div>
        );
    }
}

export default Indicators;