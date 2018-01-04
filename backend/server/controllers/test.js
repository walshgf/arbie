const Exchange = require('../../db/models/exchange');
const Currency = require('../../db/models/currencyModel');

const create = (req, res) => {
  Exchange.findOne({name:"test exchange"})
  .then((ex) => {
    const newCoin = new Currency(
      {name:"test coin", bid: 10000, ask:12000, timestamp:"00:00:00"}
    );      
    newCoin.save((e) => {
      if(e) return res.status(500).json("Error saving Coin");
      ex.currencies.push(newCoin._id);
      ex.save((err) => {
        return err ? res.status(500).json(err) : res.json(ex);
      });
    });
  })
  .catch((err) => {
    res.status(500).json(err);
  });
}

module.exports = (route) => {
  route.get('/test', create);
}