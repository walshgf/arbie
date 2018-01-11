const auth = require('./auth');

module.exports = (route) => {
  route.post('/create/user', auth.add_user);
  route.post('/login', auth.login);
  route.get('/logout', auth.logout);
  route.get('/find/user/all', auth.find_all);
  route.get('/find/user/:id', auth.find_user);
  route.get('/verify', auth.verify);
  route.delete('/remove/user/:id', auth.remove_user);
}