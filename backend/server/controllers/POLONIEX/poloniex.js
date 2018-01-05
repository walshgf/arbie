const Poloniex = require('poloniex-api-node');
let poloniex = new Poloniex();

const returnTickerETH = (req, res) => {

    poloniex.returnTicker((err, data) => {
        if (err) {
            res.json(err);
        } else {
            let obj = {};
            obj.bid = data.USDT_ETH.highestBid;
            obj.ask = data.USDT_ETH.lowestAsk;
            obj.time = new Date();
            obj.exchange = "POLONIEX";
            obj.currency = "ETH";
            res.json(obj);
        }
    });

};


const returnTickerBTC = (req, res) => {

    poloniex.returnTicker((err, data) => {
        if (err) {
            res.json(err);
        } else {
            let obj = {};
            obj.bid = data.USDT_BTC.highestBid;
            obj.ask = data.USDT_BTC.lowestAsk;
            obj.time = new Date();
            obj.exchange = "POLONIEX";
            obj.currency = "BTC";
            res.json(obj);
        }
    });

};

const return24Volume = (req, res) => {

    poloniex.return24Volume((err, data) => {
        err ? res.json(err.message) : res.json(data);
    });

};

const returnTradeHistory = (req, res) => {
    let start = 1410158341;
    let end = 1410499372;

    poloniex.returnTradeHistory(currencyPair = "USDT_ETH", start, end, null, (err, data) => {
        err ? res.json(err.message) : res.json(data);
    });

};

module.exports = {
    returnTickerETH,
    returnTickerBTC,
    return24Volume,
    returnTradeHistory,
}