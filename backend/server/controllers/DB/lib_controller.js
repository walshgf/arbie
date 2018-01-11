const api_lib = require('./api_lib');

module.exports = (route) => {
  route.post('/create/exchange', api_lib.add_exchange);
  route.post('/create/currency', api_lib.add_currency);
  route.post('/create/arb', api_lib.add_arb);
  route.get('/show/exchanges', api_lib.show_exchanges);
  route.get('/show/currencies', api_lib.show_currencies);
  route.get('/show/arbs', api_lib.show_arbs);
  route.get('/show/exchange/:id', api_lib.show_exchange);
  route.get('/show/currency/:id', api_lib.show_currency);
  route.get('/show/arb/:id', api_lib.show_arb);
  route.delete('/remove/exchange/:id', api_lib.remove_exchange);
  route.delete('/remove/currency/:id', api_lib.remove_currency);
  route.delete('/remove/arb/:id', api_lib.remove_arb);
  route.delete('/remove/exchanges', api_lib.remove_exchanges);
  route.delete('/remove/currencies', api_lib.remove_currencies);
  route.delete('/remove/arbs', api_lib.remove_arbs);
}