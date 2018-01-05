const axios = require('axios');

const getTickerBTC = (req, res) => {

    axios
        .get(`https://api.gemini.com/v1/pubticker/btcusd`)
            .then((response) => {
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

module.exports = {
    getTickerBTC,
    getTickerETH,
}