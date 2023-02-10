const jwt = require("jsonwebtoken");

const generateJWT = async (uid, name) => {
  return new Promise((res, rej) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SC_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          rej("token not generated");
        }

        res(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
