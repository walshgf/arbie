import React from 'react';

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


// find smallest bid for Ethereum
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

// find largest ask for Bitcoin
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