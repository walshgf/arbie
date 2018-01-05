const getGdax = require('../controllers/GDAX/gdax');
const getPoloniex = require('../controllers/POLONIEX/poloniex');
const getGemini = require('../controllers/GEMINI/gemini');

module.exports = (app) => {

    //DatatBase Library
    require('./lib_controller')(app);

    app
        .route('/get-productsgdax')
        .get(getGdax.getProducts);
    
    app 
        .route('/get-producttickergdax')
        .get(getGdax.getProductTicker);

    app
        .route('/get-producttradebtcgdax')
        .get(getGdax.getProductTradeBTC);

    app
        .route('/get-producttradeethgdax')
        .get(getGdax.getProductTradeETH);

    app
        .route('/get-test')
        .get(getGdax.getProductHistoricRates);

    app
        .route('/get-poloniexETH')
        .get(getPoloniex.returnTickerETH);

    app
        .route('/get-poloniexBTC')
        .get(getPoloniex.returnTickerBTC);
    
    app
        .route('/get-geminiBTC')
        .get(getGemini.getTickerBTC);

    app
        .route('/get-geminiETH')
        .get(getGemini.getTickerETH);

};