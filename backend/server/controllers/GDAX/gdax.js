const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const AuthClient = new Gdax.AuthenticatedClient();


const getProducts = (req, res) => {

    AuthClient.getProducts((err, response, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });

};

const getProductTradeBTC = (req, res) => {

    AuthClient.getProductTrades('BTC-USD', (error, response, data) => {
        if (error) {
            res.json(error);
        } else {

            res.json(data);
        }
    });

};

const getProductTradeETH = (req, res) => {

    AuthClient.getProductTrades("ETH-USD", (error, response, data) => {
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
            if(!data) return res.json("no data");
            obj.bid = Number(data.bid);
            obj.ask = Number(data.ask);
            obj.time = data.time;
            obj.exchange = "GDAX";
            obj.name = "BTC_USD";
            res.json(obj);
        }
    };

    AuthClient.getProductTicker(callback);
};

const getProductHistoricRates = (req, res) => {

    const callback = (err, response, data) => {
        err ? res.json(err) : res.json(data);
    };

    AuthClient.getProductHistoricRates("BTC-USD", callback);

};

module.exports = {
    getProducts,
    getProductTradeBTC,
    getProductTradeETH,
    getProductTicker,
    getProductHistoricRates,
};
