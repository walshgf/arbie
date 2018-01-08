const Poloniex = require('poloniex-api-node');
let poloniex = new Poloniex();

const returnTickerETH = (req, res) => {

    poloniex.returnTicker((err, data) => {
        if (err) return res.json(err);
            let obj = {};
            obj.bid = Number(data.USDT_ETH.highestBid);
            obj.ask = Number(data.USDT_ETH.lowestAsk);
            obj.time = new Date();
            obj.exchange = "POLONIEX";
            obj.name = "ETH_USD";
            res.json(obj);
    })
    //.catch(err => console.log(err));

};


const returnTickerBTC = (req, res) => {

    poloniex.returnTicker((err, data) => {
        if (err) res.json(err);

            let obj = {};
            //if(!data) return res.json("no data");
            obj.bid = Number(data.USDT_BTC.highestBid);
            obj.ask = Number(data.USDT_BTC.lowestAsk);
            obj.time = new Date();
            obj.exchange = "POLONIEX";
            obj.name = "BTC_USD";
            res.json(obj);
        
    });

};

const return24Volume = (req, res) => {

    poloniex.return24Volume((err, data) => {
        err ? res.json(err.message) : res.json(data);
    });
    //.catch(err => console.log(err));

};

const returnTradeHistory = (req, res) => {
    let start = 1410158341;
    let end = 1410499372;

    poloniex.returnTradeHistory(currencyPair = "USDT_ETH", start, end, null, (err, data) => {
        err ? res.json(err.message) : res.json(data);
    })
    .catch(err => console.log(err));

};

module.exports = {
    returnTickerETH,
    returnTickerBTC,
    return24Volume,
    returnTradeHistory,
}