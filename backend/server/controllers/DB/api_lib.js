const Exchange = require('../../../db/models/exchange');
const Currency = require('../../../db/models/currencyModel');
const Arbitrage = require('../../../db/models/arbitrageModel');

//Arbitrage Percentage
const arb_percent = 5;


//Add Exchange To DB
const add_exchange = (req, res) => {
  const {name, state} = req.body;
  Exchange.findOne({name, state})
  .exec((err, ex) => {
    if(ex || (state !== "buy" && state !== "sell")) return res.json(0);
    const exchange = new Exchange({name, state});
    exchange.save((err) => {
      return err ? res.json(0) : res.json(1);
    });
  })
};

//Add Currency to DB
const add_currency = (req, res) => {
  const {exchange, name, bid, ask, state, timestamp} = req.body;
  const currency = new Currency({name, bid, ask, timestamp});
  currency.save((err) => {
    if(err) return res.json(0);
    Exchange.findOne({name: exchange, state})
    .exec((er, ex) => {
      if(er || !ex || (state !== "buy" && state !== "sell")) return res.json(0);
      ex.currencies.push(currency._id);
      ex.save((e) => {
        return e ? res.json(0) : res.json(1);
      });
    });
  })
};
//Add Arbitrage to DB
const add_arb = (req, res) => {
  const {buy_exchnage, sell_exchange, currency_type, percentage, buy_price, sell_price} = req.body;
  if(percentage < arb_percent) return res.json(0);
  const arb = new Arbitrage({buy_exchnage, sell_exchange, currency_type, percentage, buy_price, sell_price});
  arb.save((e) => {
    return e ? res.json(0) : res.json(1);
  });
};
//Remove Exchange from DB
const remove_exchange = (req, res) => {
  const id = req.params.id;
  Exchange.findByIdAndRemove(id)
  .exec((err, removed) => {
    return err ? res.json(0) : res.json(removed._id);
  });
};
//Remove Currency From DB
const remove_currency = (req, res) => {
  const id = req.params.id;
  Currency.findByIdAndRemove(id)
  .exec((err, removed) => {
    return err ? res.json(0) : res.json(removed._id);
  });
};
//Remove Arbitrage from DB
const remove_arb = (req, res) => {
  const id = req.params.id;
  Arbitrage.findByIdAndRemove(id)
  .exec((err, removed) => {
    return err ? res.json(0) : res.json(removed._id);
  });
};
//Remove All Exchanges
const remove_exchanges = (req, res) => {
  Exchange.remove({}, (err) => {
    if(err) return res.json(0);
    Currency.remove({}, (e) => {
      return e ? res.json(0) : res.json(1);
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
  Exchange.find({})
  .populate('currencies', {}, Currency)
  .exec((err, exchanges) => {
    return err ? res.status(500).json(err) : res.json(exchanges);
  });
};
//Show All Buy Exchanges
const show_buy_exchanges = (req, res) => {
  Exchange.find({state: "buy"})
  .populate('currencies', {}, Currency)
  .exec((err, exchanges) => {
    return err ? res.status(500).json(err) : res.json(exchanges);
  });
};
//Show All Sell Exchanges
const show_sell_exchanges = (req, res) => {
  Exchange.find({state: "sell"})
  .populate('currencies', {}, Currency)
  .exec((err, exchanges) => {
    return err ? res.status(500).json(err) : res.json(exchanges);
  });
};
//Show All Currencies
const show_currencies = (req, res) => {
  Currency.find({})
  .exec((err, currencies) => {
    return err ? res.status(500).json(err) : res.json(currencies);
  });
};
//Show All Arbs
const show_arbs = (req, res) => {
  Arbitrage.find({})
  .sort({timestamp: -1})
  .exec((err, arbs) => {
    return err ? res.status(500).json(err) : res.json(arbs);
  });
};
//Show All Buy Arbs
const show_buy_arbs = (req, res) => {
  Arbitrage.find({state: "buy"})
  .sort({timestamp: -1})
  .exec((err, arbs) => {
    return err ? res.status(500).json(err) : res.json(arbs);
  });
};
//Show All Sell Arbs
const show_sell_arbs = (req, res) => {
  Arbitrage.find({state: "sell"})
  .sort({timestamp: -1})
  .exec((err, arbs) => {
    return err ? res.status(500).json(err) : res.json(arbs);
  });
};
//Show Exchange By ID
const show_exchange = (req, res) => {
  const id = req.params.id;
  Exchange.findById(id)
  .populate('currencies', {}, Currency)
  .exec((err, exchange) => {
    return err ? res.status(500).json(err) : res.json(exchange);
  });
};
//Show Currency By ID
const show_currency = (req, res) => {
  const id = req.params.id;
  Currency.findById(id)
  .exec((err, currency) => {
    return err ? res.status(500).json(err) : res.json(currency);
  });
};
//Show Arb By ID
const show_arb = (req, res) => {
  const id = req.params.id;
  Arbitrage.findById(id)
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
  show_buy_exchanges,
  show_sell_exchanges,
  show_currencies,
  show_arbs,
  show_buy_arbs,
  show_sell_arbs,
  show_exchange,
  show_currency,
  show_arb
}