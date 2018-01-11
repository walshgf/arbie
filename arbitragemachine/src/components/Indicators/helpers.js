export const findSmallestBid = (array, signal) => {
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
export const findLargestBid = (array, signal) => {
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
export const findLargestAsk = (array, signal) => {
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
export const findSmallestAsk = (array, signal) => {
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
export const percentageOfArbitrageAvailable = (diff, high) => (diff * 100) / high;


//checks for null and infinite values and returns 0
export const checkNull = (val) => {
  return val === null || val === Infinity ? 0 : val;
}

//formats dollar values (USD)
export const commafy = (x) => {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}