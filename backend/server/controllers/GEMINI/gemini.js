const axios = require('axios');
// {exchange name, currency name, bid, ask.. ect}
const getTickerBTC = (req, res) => {

    axios
        .get(`https://api.gemini.com/v1/pubticker/btcusd`)
            .then((response) => {
                // response.data.exchange_name = "GEMINI";
                // response.data.currency_name = "BTC";
                // res.json(response.data);
                let obj = {};
                obj.bid = response.data.bid;
                obj.ask = response.data.ask;
                obj.time = new Date(response.data.volume.timestamp);
                obj.exchange = "GEMINI";
                obj.currency = "ETH";
                res.json(obj);
            })
            .catch((err) => {
                res.json(err);
            });
};         


const getTickerETH = (req, res) => {

    axios
        .get(`https://api.gemini.com/v1/pubticker/ethusd`)
            .then((response) => {
                // response.data.exchange_name = "GEMINI";
                // response.data.currency_name = "ETH";
                // res.json(response.data);
                let obj = {};
                obj.bid = response.data.bid;
                obj.ask = response.data.ask;
                obj.time = response.data.volume.timestamp;
                obj.exchange = "GEMINI";
                obj.currency = "ETH";
                res.json(obj);
            })
            .catch((err) => {
                res.json(err);
            });
};         

module.exports = {
    getTickerBTC,
    getTickerETH,
}