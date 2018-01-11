const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const AuthClient = new Gdax.AuthenticatedClient();


const getProducts = (req, res) => AuthClient.getProducts((err, response, data) => err ? res.json(err) : res.json(data));

const getProductTradeBTC = (req, res) => AuthClient.getProductTrades('BTC-USD', (error, response, data) => error ? res.json(error) : res.json(data));

const getProductTradeETH = (req, res) => AuthClient.getProductTrades("ETH-USD", (error, response, data) => error ? res.json(error) : res.json(data));

const getProductHistoricRates = (req, res) => AuthClient.getProductHistoricRates("BTC-USD", (err, response, data) => err ? res.json(err) : res.json(data));

const getProductTicker = (req, res) =>{
    AuthClient.getProductTicker((err, response, data) => {
        if (err) return res.json(err);
            let obj = {};
            if(!data) return res.json("no data");
            obj.bid = Number(data.bid);
            obj.ask = Number(data.ask);
            obj.time = data.time;
            obj.exchange = "GDAX";
            obj.name = "BTC_USD";
            return res.json(obj);
    });
};

module.exports = {
    getProducts,
    getProductTradeBTC,
    getProductTradeETH,
    getProductTicker,
    getProductHistoricRates,
};
