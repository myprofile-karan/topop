const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { token } = req.cookies;
  console.log("token: ", token);

  //  restrict the route if token is not there
  if (!token) {
    console.log("unauthorized user");
    return res.redirect("/login");
  }

  //  decode token
  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodeToken);
    req.user = decodeToken;
    return next();
  } catch (error) {
    console.log(error);
    return res.redirect("/login");
  }

};
module.exports = auth;
