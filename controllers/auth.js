const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jtw");

// * CREATE USER
const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "user has already been created",
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // ? generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "",
    });
  }
};

//* LOGIN USER
const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "wrong information",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "incorrect password",
      });
    }
    const token = await generateJWT(user.id, user.name);
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "",
    });
  }
};

//* RENEW USER
const renewUser = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  login,
  renewUser,
};
