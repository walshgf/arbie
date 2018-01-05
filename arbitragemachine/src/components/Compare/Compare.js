import React from 'react';
let axios = require('axios');
const server = require('./config').server;

let apiData = [];
// make a call to the server, using server location from config file (in src)
axios.get(`${server}/show/exchanges`)
.then(function(response){
    console.log(response.data);
    console.log(response.status);
    apiData = response.data;
});

// find smallest bid
function findSmallestBid(array, signal){
    let smallestBid;
    let exchange;
    array.forEach(function(trade){
        if (trade.currencies.name === signal) {
            if (smallestBid === 'undefined') {
                smallestBid = trade.currencies.bid;
                exchange = trade.name;
            } else if (smallestBid > trade.currencies.bid) {
                smallestBid = trade.currencies.bid;
                exchange = trade.name;
            }
        }
    })
    return {smallestBid, exchange};
}

// find largest ask
function findLargestAsk(array, signal){
    let largestAsk;
    let exchange;
    array.forEach((trade) => {
        if (trade.currencies.name === signal) {
            if (largestAsk === 'undefined') {
                largestAsk = trade.currencies.ask;
                exchange = trade.name;
            } else if (largestAsk < trade.currencies.ask) {
                largestAsk = trade.currencies.ask;
                exchange = trade.name;
            }
        }
    })
    return {largestAsk, exchange};
}

//function to determine if arbitrage is available
function isArbitrageAvailable(bid, ask) {
    return ((bid / ask) >= 1.05) ? true : false;
}

export const bitcoinSmallestBidObject = findSmallestBid(apiData, 'BTC_USD');
export const bitcoinLargestAskObject = findLargestAsk(apiData, 'BTC_USD');
export const isBitcoinArbitrageProfitable = isArbitrageAvailable(bitcoinSmallestBidObject.smallestBid, bitcoinLargestAskObject.largestAsk);

export const ethereumSmallestBidObject = findSmallestBid(apiData, 'ETH_USD');
export const ethereumLargestAskObject = findLargestAsk(apiData, 'ETH_USD');
export const isEthereumArbitrageProfitable = isArbitrageAvailable(ethereumSmallestBidObject.smallestBid, ethereumLargestAskObject.largestAsk);

/* previous code before refactor
class BidAsk {
    constructor(bitcoinAskPrice = 0, bitcoinBidPrice = 0, ethereumAskPrice = 0, ethereumBidPrice = 0, exchange = 'test', timeStamp) {
        this.bitcoinAskPrice = bitcoinAskPrice;
        this.bitcoinBidPrice = bitcoinBidPrice;
        this.ethereumAskPrice = ethereumAskPrice;
        this.ethereumBidPrice = ethereumBidPrice;
        this.exchange = exchange;
        this.timeStamp = timeStamp;
    }
}
// create one variable for each exchange
const exchange1 = new BidAsk(0, 0, 0, 0, "grape", '01/01/2018');
const exchange2 = new BidAsk(1, 1, 1, 1, "apple", '01/01/2018');
const arrayOfExchanges = [exchange1, exchange2];


// find smallest bid
function findSmallestBid(array, signal){
    const currency = signal + 'BidPrice';
    let smallestBid;
    let exchange;
    for (let i = 0; i < array.length; i++) {
        if (smallestBid === "undefined") {
            smallestBid = array[i][currency];
            exchange = array[i].exchange;
        } else if (smallestBid >= array[i][currency]) {
            smallestBid = array[i][currency]
            exchange = array[i].exchange;
        }
    }
    return {smallestBid, exchange};
}

// find largest ask
function findLargestAsk(array, signal){
    const currency = signal + 'AskPrice';
    let largestAsk;
    let exchange;
    for (let i = 0; i < array.length; i++) {
        if (largestAsk === "undefined") {
            largestAsk = array[i][currency];
            exchange = array[i].exchange;
        } else if (largestAsk >= array[i][currency]) {
            largestAsk = array[i][currency]
            exchange = array[i].exchange;
        }
    }
    return {largestAsk, exchange};
}


//function to determine if arbitrage is available
function isArbitrageAvailable(bid, ask) {
    return ((bid / ask) >= 1.05) ? true : false;
}

//execution of function to determine relative value
const smallestBitcoinBidObject = findSmallestBid(arrayOfExchanges, bitcoin);
const largestBitcoinAskObject = findLargestAsk(arrayOfExchanges, bitcoin);
export const isBitcoinArbitrageProfitable = isArbitrageAvailable(smallestBitcoinBidObject.smallestBid, largestBitcoinAskObject.largestAsk);

const smallestEthereumBidObject = findSmallestBid(arrayOfExchanges, ethereum)
const largestEthereumAskObject = findLargestAsk(arrayOfExchanges, ethereum);
export const isEthereumArbitrageProfitable = isArbitrageAvailable(smallestEthereumBidObject.smallestBid, largestEthereumAskObject.largestAsk);
*/