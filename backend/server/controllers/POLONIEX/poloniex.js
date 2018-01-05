const Poloniex = require('poloniex-api-node');
let poloniex = new Poloniex();


const returnTickerETH = (req, res) => {

    poloniex.returnTicker((err, ticker) => {
        if (err) {
            res.json(err);
        } else {
            res.json(ticker.USDT_ETH);
        }
    });

};

const returnTickerBTC = (req, res) => {

    poloniex.returnTicker((err, ticker) => {
        if (err) {
            res.json(err);
        } else {
            res.json(ticker.USDT_BTC);
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