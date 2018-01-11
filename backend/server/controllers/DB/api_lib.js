const Exchange = require('../../../db/models/exchangeModel');
const Currency = require('../../../db/models/currencyModel');
const Arbitrage = require('../../../db/models/arbitrageModel');
const arb_percent = require('../../../../arbitragemachine/src/components/Indicators/config').arb_percent;



//Add Exchange To DB
const add_exchange = (req, res) => {
  const name = req.body.name;
  Exchange.findOne({name})
  .exec((err, ex) => {
    if(ex) return res.json("Exchange Already Exists");
    const exchange = new Exchange({name});
    exchange.save(() => {
      return err ? res.json(err) : res.json("Exchange Added");
    });
  })
};

//Add Currency to DB
const add_currency = (req, res) => {
  const {exchange, name, bid, ask} = req.body;
  const currency = new Currency({name, bid, ask});
  currency.save((err) => {
    if(err) return res.json("Currency Not Added");
    Exchange.findOne({name: exchange})
    .exec((er, ex) => {
      if(er || !ex) return res.json("Exchange Not Found");
      ex.currencies.push(currency._id);
      ex.save((e) => {
        return e ? res.json("Exchanged Not Saved") : res.json("Exchange Saved");
      });
    });
  })
};
//Add Arbitrage to DB
const add_arb = (req, res) => {
  const {buy_exchange, sell_exchange, currency_type, percentage, buy_price, sell_price} = req.body;
  const profit = sell_price - buy_price;
  if(percentage < arb_percent) return res.json(`below ${arb_percent}% `);
  const arb = new Arbitrage({buy_exchange, sell_exchange, timestamp:Date.now(), currency_type, percentage, buy_price, sell_price, profit});
  arb.save((e) => {
    return e ? res.json("Arbitrage Not Saved") : res.json("Arbitrage Saved");
  });
};
//Remove Exchange from DB
const remove_exchange = (req, res) => {
  const id = req.params.id;
  Exchange.findByIdAndRemove(id)
  .exec((err, removed) => {
    return err ? res.json("Exhange Not Removed") : res.json(`Exchange ${removed._id} Removed`);
  });
};
//Remove Currency From DB
const remove_currency = (req, res) => {
  const id = req.params.id;
  Currency.findByIdAndRemove(id)
  .exec((err, removed) => {
    return err ? res.json("Currency Not Removed") : res.json(`Currency ${removed._id} Removed`);
  });
};
//Remove Arbitrage from DB
const remove_arb = (req, res) => {
  const id = req.params.id;
  Arbitrage.findByIdAndRemove(id)
  .exec((err, removed) => {
    return err ? res.json("Arbitrage Not Removed") : res.json(`Arbitrage ${removed._id} Removed`);
  });
};
//Remove All Exchanges
const remove_exchanges = (req, res) => {
  Exchange.remove({}, (err) => {
    if(err) return res.json('All Exchanges Not Removed');
    Currency.remove({}, (e) => {
      return e ? res.json('All Currencies Not Removed') : res.json("All Exchanges And Currencies Removed");
    });
  });
};
//Remove All Currencies
const remove_currencies = (req, res) => {
  Currency.remove({}, (err) => {
    return err ? res.json(0) : res.json(1);
  });
};
//Remove All Arbitrages
const remove_arbs = (req, res) => {
  Arbitrage.remove({}, (err) => {
    return err ? res.json(0) : res.json(1);
  });
};

//Show All Exchanges
const show_exchanges = (req, res) => {
  Exchange.find({}, {__v:0})
  .populate('currencies', {}, Currency)
  .exec((err, exchanges) => {
    return err ? res.status(500).json(err) : res.json(exchanges);
  });
};

//Show All Currencies
const show_currencies = (req, res) => {
  Currency.find({}, {__v: 0})
  .exec((err, currencies) => {
    return err ? res.status(500).json(err) : res.json(currencies);
  });
};
//Show All Arbs
const show_arbs = (req, res) => {
  Arbitrage.find({}, {__v: 0})
  .sort({timestamp: -1})
  .exec((err, arbs) => {
    return err ? res.status(500).json(err) : res.json(arbs);
  });
};

//Show Exchange By ID
const show_exchange = (req, res) => {
  const id = req.params.id;
  Exchange.findById(id, {__v: 0})
  .populate('currencies', {}, Currency)
  .exec((err, exchange) => {
    return err ? res.status(500).json(err) : res.json(exchange);
  });
};
//Show Currency By ID
const show_currency = (req, res) => {
  const id = req.params.id;
  Currency.findById(id, {__v: 0})
  .exec((err, currency) => {
    return err ? res.status(500).json(err) : res.json(currency);
  });
};
//Show Arb By ID
const show_arb = (req, res) => {
  const id = req.params.id;
  Arbitrage.findById(id, {__v: 0})
  .exec((err, arb) => {
    return err ? res.status(500).json(err) : res.json(arb);
  });
};

module.exports = {
  add_exchange,
  add_currency,
  add_arb,
  remove_exchange,
  remove_currency,
  remove_arb,
  remove_exchanges,
  remove_currencies,
  remove_arbs,
  show_exchanges,
  show_currencies,
  show_arbs,
  show_exchange,
  show_currency,
  show_arb
}