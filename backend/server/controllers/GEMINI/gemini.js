const axios = require('axios');

const getTickerBTC = (req, res) => {

    axios
        .get(`https://api.gemini.com/v1/pubticker/btcusd`)
            .then((response) => {
                res.json(response.data);
            })
            .catch((err) => {
                res.json(err);
            });
};         


const getTickerETH = (req, res) => {

    axios
        .get(`https://api.gemini.com/v1/pubticker/ethusd`)
            .then((response) => {
                res.json(response.data);
            })
            .catch((err) => {
                res.json(err);
            });
};         

module.exports = {
    getTickerBTC,
    getTickerETH,
}