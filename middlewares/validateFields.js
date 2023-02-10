const { response } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(403).json({
      ok: false,
      msg: errors.mapped(),
    });
  }

  next();
};

module.exports = { validateFields };
