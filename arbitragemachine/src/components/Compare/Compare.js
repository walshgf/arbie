import React from 'react';

class BidAsk {
    constructor(btcAskPrice = 0, btcBidPrice = 0, ethAskPrice = 0, ethBidPrice = 0, exchange = 'test', timeStamp) {
        this.btcAskPrice = btcAskPrice;
        this.btcBidPrice = btcBidPrice;
        this.ethAskPrice = ethAskPrice;
        this.ethBidPrice = ethBidPrice;
        this.exchange = exchange;
        this.timeStamp = timeStamp;
    }
}
// create one variable for each exchange
const exchange1 = new BidAsk(0, 0, 0, 0, "grape", '01/01/2018');
const exchange2 = new BidAsk(1, 1, 1, 1, "apple", '01/01/2018');
const arrayOfExchanges = [exchange1, exchange2];


// find smallest bid price for Bitcoin
function findSmallestBitcoinBid(array){
    let smallestBid;
    let exchange;
    for (let i = 0; i < array.length; i++) {
        if (smallestBid === "undefined") {
            smallestBid = array[i].btcBidPrice;
            exchange = array[i].exchange;
        } else if (smallestBid >= array[i].btcBidPrice) {
            smallestBid = array[i].btcBidPrice
            exchange = array[i].exchange;
        }
    }
    return ({smallestBid, exchange});
}

// find smallest bid for Ethereum
function findSmallestEthereumBid(array){
    let smallestBid;
    let exchange;
    for (let i = 0; i < array.length; i++) {
        if (smallestBid === "undefined") {
            smallestBid = array[i].ethBidPrice;
            exchange = array[i].exchange;
        } else if (smallestBid >= array[i].ethBidPrice) {
            smallestBid = array[i].ethBidPrice
            exchange = array[i].exchange;
        }
    }
    return ({smallestBid, exchange});
}

// find largest ask for Bitcoin
function findLargestBitcoinAsk(array){
    let largestAsk;
    let exchange;
    for (let i = 0; i < array.length; i++) {
        if (largestAsk === "undefined") {
            largestAsk = array[i].btcAskPrice;
            exchange = array[i].exchange;
        } else if (largestAsk >= array[i].btcAskPrice) {
            largestAsk = array[i].btcAskPrice
            exchange = array[i].exchange;
        }
    }
    return ({largestAsk, exchange});
}

// find largest ask for Ethereum
function findLargestEthereumAsk(array){
    let largestAsk;
    let exchange;
    for (let i = 0; i < array.length; i++) {
        if (largestAsk === "undefined") {
            largestAsk = array[i].ethAskPrice;
            exchange = array[i].exchange;
        } else if (largestAsk >= array[i].ethAskPrice) {
            largestAsk = array[i].ethAskPrice
            exchange = array[i].exchange;
        }
    }
    return ({largestAsk, exchange});
}

//function to determine if arbitrage is available
function isArbitrageAvailable(bid, ask) {
    return ((bid / ask) >= 1.05) ? true : false;
}

//execution of function to determine relative value
export const isBitcoinArbitrageProfitable = isArbitrageAvailable(findSmallestBitcoinBid(arrayOfExchanges).smallestBid, findLargestBitcoinAsk(arrayOfExchanges).largestAsk);

export const isEthereumArbitrageProfitable = isArbitrageAvailable(findSmallestEthereumBid(arrayOfExchanges).smallestBid, findLargestEthereumAsk(arrayOfExchanges).largestAsk);