import Indicators from '../Indicators/Indicators';

let axios = require('axios');
const server = require('./config').server;

//#########################
    //MOVED TO Indicators
//#########################
 
// make a call to the server, using server location from config file (in src)
// let apiData = [];
// axios.get(`${server}/show/exchanges`)
// .then(function(response){
//     console.log(response.data);
//     console.log(response.status);
//     apiData = response.data || data;
// });
// axios.get(`${server}/get-producttickergdax`) // returns GDAX BTC
// axios.get(`${server}/get-poloniexBTC`) // returns Poloniex BTC
// axios.get(`${server}/get-poloniexETH`) // returns Poloniex ETH

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


// // find smallest bid
// function findSmallestBid(array, signal){
//     let smallestBidObject = {smallestBid : null, exchange : null};

//     array.forEach((trade) => {
//         if (trade.currencies.name === signal) {
//             if (smallestBidObject.smallestBid === null) {
//                 smallestBidObject = {
//                     smallestBid: trade.currencies.bid, 
//                     exchange: trade.name
//                 };
//             } else if (smallestBidObject.smallestBid > trade.currencies.bid) {
//                 smallestBidObject.smallestBid = trade.currencies.bid;
//                 smallestBidObject.exchange = trade.name;
//             }
//         }
//     })
//     return smallestBidObject;
// }
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
function findLargestBid(array, signal){
    let largestBidObject = {largestBid : null, exchange : null, name: null};

    array.forEach((trade) => {
            if (largestBidObject.smallestBid === null) {
                largestBidObject = {
                    smallestBid: trade.bid, 
                    exchange: trade.exchange,
                    name: trade.name
                };
            } else if (largestBidObject.smallestBid > trade.bid) {
                largestBidObject.smallestBid = trade.bid;
                largestBidObject.exchange = trade.exchange;
                largestBidObject.name = trade.name;
            }
    })
    return largestBidObject;
}

// find largest ask
function findLargestAsk(array, signal){
    let largestAskObject = {largestAsk: null, exchange : null};

    array.forEach((trade) => {
        if (trade.currencies.name === signal) {
            if (largestAskObject.largestAsk === null) {
                largestAskObject = {
                    largestAsk : trade.currencies.ask,
                    exchange : trade.name,
                };
            } else if (largestAskObject.largestAsk < trade.currencies.ask) {
                largestAskObject.largestAsk = trade.currencies.ask;
                largestAskObject.exchange = trade.name;
            }
        }
    })
    return  largestAskObject;
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
