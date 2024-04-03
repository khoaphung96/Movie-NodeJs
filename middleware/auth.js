const Users = require("../models/UserToken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const checkUser = Users.find((item) => item.token === token);

  if (!checkUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // const token = authHeader.split(" ")[1];

  // let decodedToken;

  // try {
  //   decodedToken = jwt.verify(token, "supersecretkey");
  // } catch (err) {
  //   err.statusCode = 500;
  //   throw err;
  // }

  // if (!decodedToken) {
  //   const err = new Error("Not Authenticated");
  //   err.statusCode = 401;
  //   throw err;
  // }

  // req.userId = decodedToken.userId;

  next();
};
