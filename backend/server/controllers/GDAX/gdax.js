const axios = require('axios');
const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const AuthClient = new Gdax.AuthenticatedClient();

const getBTCTicker = (req, res) => {
    axios.get('http://api.gdax.com/products/BTC-USD/ticker')
    .then((r) => {
        let obj = {};
            if(!r.data) return res.json("no data");
            obj.bid = Number(r.data.bid);
            obj.ask = Number(r.data.ask);
            obj.time = r.data.time;
            obj.exchange = "GDAX";
            obj.name = "BTC_USD";
            return res.json(obj);
    })
    .catch(e => res.json(e));
}; 
const getETHTicker = (req, res) => {
    axios.get('http://api.gdax.com/products/ETH-USD/ticker')
    .then((r) => {
        let obj = {};
            if(!r.data) return res.json("no data");
            obj.bid = Number(r.data.bid);
            obj.ask = Number(r.data.ask);
            obj.time = r.data.time;
            obj.exchange = "GDAX";
            obj.name = "ETH_USD";
            return res.json(obj);
    })
    .catch(e => res.json(e));
}; 

module.exports = {
    getBTCTicker,
    getETHTicker
};
