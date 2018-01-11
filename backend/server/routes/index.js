const getGdax = require('../controllers/GDAX/gdax');
const getPoloniex = require('../controllers/POLONIEX/poloniex');
const getGemini = require('../controllers/GEMINI/gemini');

module.exports = (app) => {

    //Database Library
    require('../controllers/DB/lib_controller')(app);

    //Authorization
    require('../controllers/AUTH/auth_controller')(app);

    app
        .route('/data/gdax/BTC_USD')
        .get(getGdax.getBTCTicker);
    app
        .route('/data/gdax/ETH_USD')
        .get(getGdax.getETHTicker);
    
    app
        .route('/data/poloniex/BTC_USD')
        .get(getPoloniex.returnTickerETH);

    app
        .route('/data/poloniex/ETH_USD')
        .get(getPoloniex.returnTickerBTC);
    
    app
        .route('/data/gemini/BTC_USD')
        .get(getGemini.getTickerBTC);

    app
        .route('/data/gemini/ETH_USD')
        .get(getGemini.getTickerETH);

};