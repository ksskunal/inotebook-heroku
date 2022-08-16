const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "kunal123";
const fetchuser = require("../middleware/fetchUser");

router.post(
  "/createUser",
  [
    body("name", "please Enter valid value with min character 3").isLength({
      min: 3,
    }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false
    // if Ther e are errors, return bad request amd the errors to the userrr
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // }\ check weather  the user with same email exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "user already exist with this email" });
      }
      const salt = await bcrypt.genSalt(10);

      secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        id: user.id,
      };
      success = true
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });
    } catch (e) {
      res.json({ success, e: e.message });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "please enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false
    // if Ther e are errors, return bad request amd the errors to the userrr
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({ success ,authToken });
    } catch (e) {
      res.json({ e: e.message });
    }
  }
);

router.post("/getUser", fetchuser, async (req, res) => {
  const userid = req.user.id;
  console.log(userid);
  const user = await User.findById(userid);
  res.send(user);
});

module.exports = router;
