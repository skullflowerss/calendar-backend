const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  // x-token

  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "token missing",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SC_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "invalid token",
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
