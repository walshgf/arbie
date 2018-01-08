const User = require('../../../db/models/userModel');
const Arb = require('../../../db/models/arbitrageModel');
const bcrypt = require('bcrypt');

const add_user = (req, res) => {
  const {username, name, password} = req.body;
  bcrypt.hash(password, 11, (err, hash) => {
    if(err) return res.json("User Creation Error");
    const user = new User({user, name, hash});
    user.save((err) => {
      if(err) return res.json(err);
      res.json(1);
    })
  })
};

const find_all = (req, res) => {
  User.find({})
  .exec((err, users) => {
    return err ? res.status(500).json(err) : res.json(users);
  });
};

const find_user = (req, res) => {
  User.findById(req.params.id)
  .exec((err, user) => {
    return err ? res.status(422).json(err) : res.json(user);
  });
};

const remove_user = (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .exec((err, removed) => {
    return err ? res.status(422).json(err) : res.json(1);
  });
};

module.exports = {
  add_user,
  find_all,
  find_user,
  remove_user
}