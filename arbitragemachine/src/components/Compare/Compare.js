import React from 'react';

class BidAsk {
    constructor(btcAskPrice, btcBidPrice, exchange, timeStamp) {
        this.btcAskPrice = btcAskPrice;
        this.btcBidPrice = btcBidPrice;
        this.exchange = exchange;
        this.timeStamp = timeStamp;
    }
}
//create one variable for each exchange, //parsed by the data of interest
const exchange1 = new BidAsk(btcAskPrice, btcBidPrice, exchange, timeStamp);
const exchange2 = new BidAsk(btcAskPrice, btcBidPrice, exchange, timeStamp);

//function to determine if arbitrage is available
function isArbitrageAvailable(bid, ask) {
    return ((bid / ask) >= 1.05) ? true : false;
}

//execution of function to determine relative value
export const canProfitFromArbitrageOneToTwo = isArbitrageAvailable(exchange1.btcBidPrice, exchange2.btcAskPrice);
export const canProfitFromArbitrageTwoToOne = isArbitrageAvailable(exchange2.btcBidPrice, exchange1.btcAskPrice);