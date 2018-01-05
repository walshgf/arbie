const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();


const getProducts = (req, res) => {

    publicClient.getProducts((err, response, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });

};

const getProductTradeBTC = (req, res) => {

    publicClient.getProductTrades('BTC-USD', (error, response, data) => {
        if (error) {
            res.json(error);
        } else {

            res.json(data);
        }
    });

};

const getProductTradeETH = (req, res) => {

    publicClient.getProductTrades("ETH-USD", (error, response, data) => {
        if (error) {
            res.json(error);
        } else {
            res.json(data);
        }
    });
};

const getProductTicker = (req, res) => {

    const callback = (err, response, data) => {
        if (err) {
            res.json(error);
        } else {
            let obj = {};
            obj.bid = data.bid;
            obj.ask = data.ask;
            obj.time = data.time;
            obj.exchange = "GDAX";
            obj.currency = "BTC";
            res.json(obj);
        }
    };

    publicClient.getProductTicker(callback);
};

const getProductHistoricRates = (req, res) => {

    const callback = (err, response, data) => {
        err ? res.json(err) : res.json(data);
    };

    publicClient.getProductHistoricRates("BTC-USD", callback);

};

module.exports = {
    getProducts,
    getProductTradeBTC,
    getProductTradeETH,
    getProductTicker,
    getProductHistoricRates,
};
