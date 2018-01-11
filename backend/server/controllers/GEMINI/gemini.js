const axios = require('axios');

const getTickerBTC = (req, res) => {

    axios
        .get(`https://api.gemini.com/v1/pubticker/btcusd`)
            .then((response) => {
                let obj = {};
                if(!response.data) return res.json("no data");
                obj.bid = Number(response.data.bid);
                obj.ask = Number(response.data.ask);
                obj.time = new Date(response.data.volume.timestamp);
                obj.exchange = "GEMINI";
                obj.name = "BTC_USD";
                return res.json(obj);
            })
            .catch(err => res.json(err));
};         


const getTickerETH = (req, res) => {
    axios
        .get(`https://api.gemini.com/v1/pubticker/ethusd`)
            .then((response) => {
                let obj = {};
                if(!response.data) return res.json("no data");
                obj.bid = Number(response.data.bid);
                obj.ask = Number(response.data.ask);
                obj.time = new Date(response.data.volume.timestamp);
                obj.exchange = "GEMINI";
                obj.name = "ETH_USD";
                return res.json(obj);
            })
            .catch((err) => res.json(err));
};         

module.exports = {
    getTickerBTC,
    getTickerETH,
}