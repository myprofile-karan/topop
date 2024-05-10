const {
  registerUser,
  getUser,
  checkUser,
  userProfile,
  loginUser,
} = require("../controllers/user.controller");
const { Router } = require("express");

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

router.route("/signup").get(getUser);
router.route("/check-user/:email").get(checkUser);

router.route("/user-profile/:email").get(userProfile);

module.exports = router;
