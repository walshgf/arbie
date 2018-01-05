import React from 'react';
let axios = require('axios');
const server = require('./config').server;


const apiData = [];

axios.get(`${server}/get-producttickergdax`)
.then((res) => {
    apiData.push(res.data);
});

axios.get(`${server}/get-geminiBTC`)
.then((res) => {
    apiData.push(res.data);
});

axios.get(`${server}/get-geminiETH`)
.then((res) => {
    apiData.push(res.data);
});
axios.get(`${server}/get-poloniexBTC`)
.then((res) => {
    apiData.push(res.data);
});
axios.get(`${server}/get-poloniexETH`)
.then((res) => {
    apiData.push(res.data);
});

console.log(apiData);


// find smallest bid
function findSmallestBid(array, signal){
    let smallestBidObject = {smallestBid : null, exchange : null, name: null};

    array.forEach((trade) => {
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
    })
    return smallestBidObject;
}

// find largest bid
function findLargestAsk(array, signal){
    let largestAskObject = {largestAsk : null, exchange : null, name: null};

    array.forEach((trade) => {
            if (largestAskObject.largestAsk === null) {
                largestAskObject = {
                    largestAsk: trade.bid, 
                    exchange: trade.exchange,
                    name: trade.name
                };
            } else if (largestAskObject.largestAsk > trade.bid) {
                largestAskObject.largestAsk = trade.bid;
                largestAskObject.exchange = trade.exchange;
                largestAskObject.name = trade.name;
            }
    })
    return largestAskObject;
}
class Compare extends React.Component{
    constructor() {
        super();
        this.state = {
            smallestBid : null,
            largestAsk : null,
        };
    }
}
//function to determine if arbitrage is available
function percentageOfArbitrageAvailable(bid, ask) {
    return (bid / ask) * 100;
}

const bitcoinSmallestBidObject = findSmallestBid(apiData, "BTC_USD");
export const bitcoinSmallestBidPrice = bitcoinSmallestBidObject.smallestBid;
export const bitcoinSmallestBidExchange = bitcoinSmallestBidObject.exchange;

const bitcoinLargestAskObject = findLargestAsk(apiData, "BTC_USD");
export const bitcoinLargestAskPrice = bitcoinLargestAskObject.largestAsk;
export const bitcoinLargestAskExchange = bitcoinLargestAskObject.exchange;

export const percentageOfBitcoinArbitrageProfitable = percentageOfArbitrageAvailable(bitcoinSmallestBidPrice, bitcoinLargestAskPrice);

const ethereumSmallestBidObject = findSmallestBid(apiData, "ETH_USD");
export const ethereumSmallestBidPrice = ethereumSmallestBidObject.smallestBid;
export const ethereumSmallestBidExchange = ethereumSmallestBidObject.exchange;

const ethereumLargestAskObject = findLargestAsk(apiData, "ETH_USD");
export const ethereumLargestAskPrice = ethereumLargestAskObject.largestAsk;
export const ethereumLargestAskExchange = ethereumLargestAskObject.exchange;

export const percentageOfEthereumArbitrageProfitable = percentageOfArbitrageAvailable(ethereumSmallestBidPrice, ethereumLargestAskPrice);
