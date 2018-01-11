const User = require('../../../db/models/userModel');
const Arb = require('../../../db/models/arbitrageModel');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const secret = require('./config').secret;


const add_user = (req, res) => {
  const key = Math.floor(Math.random() * Math.floor(777777777));
  const {username, name, password} = req.body;
  bcrypt.hash(password, 11, (err, hash) => {
    if(err) return res.json("User Creation Error");
    const user = new User({username, name, hash, key});
    user.save((err) => {
      if(err) return res.json(err);
      const token = jwt.encode({username, hash, key}, secret);
      res.json(token);
    })
  })
};

const login = (req, res) => {
  const key = Math.floor(Math.random() * Math.floor(777777777));
  const {username, password} = req.body;
  const regex = new RegExp(["^", username, "$"].join(""), "i");
  User.findOne({username: regex})
  .exec((err, user) => {
    if(err || !user) return res.status(422).json('Login Failed');
    bcrypt.compare(password, user.hash, (err, same) => {
      if(err || !same) res.status(422).json(0);
      user.key = key;
      user.save((e) => {
        if(e) res.json(0);
        const token = jwt.encode({username: user.username, hash: user.hash, key: user.key}, secret);
        res.json(token);
      });
    });
  })
};

const find_all = (req, res) => {
  User.find({}, {username:1})
  .exec((err, users) => {
    return err ? res.status(500).json(err) : res.json(users);
  });
};

const find_user = (req, res) => {
  User.findById(req.params.id, {username: 1})
  .exec((err, user) => {
    return err ? res.status(422).json(err) : res.json(user);
  });
};

const remove_user = (req, res) => {
  User.findByIdAndRemove(req.params.id, {username: 1})
  .exec((err, removed) => {
    return err || !removed ? res.status(422).json(0) : res.json(1);
  });
};

const logout = (req, res) => {
  const user = jwt.decode(req.headers.token, secret);
  User.findOne({username: user.username, hash: user.hash, key: user.key}, {username:1})
  .exec((err, found) => {
    if(err || !found ) return res.status(401).json(0);
    found.key = 0;
    found.save((err) => {
      return err ? res.status(500).json(0) : res.json(`SIGNED OUT ${found.username}`);
    });
  });
};

const verify = (req, res) => {
  const user = jwt.decode(req.headers.token, secret);
  User.findOne({username: user.username, hash: user.hash, key: user.key}, {username:1})
  .exec((err, user) => {
    if(err || !user) res.status(401).json(0);
    res.json(1);
  });
}

module.exports = {
  add_user,
  find_all,
  find_user,
  remove_user,
  login,
  logout,
  verify
}