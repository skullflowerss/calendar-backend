//userpath - host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, renewUser } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.post(
  "/new",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password length should be more than 6 letters").isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "invalid email").isEmail(),
    check("password", "password length should be more than 6 letters")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    validateFields,
  ],
  login
);

router.get("/renew", [validateJWT], renewUser);

module.exports = router;
