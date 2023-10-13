const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

import User from '../models/user'

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        };
        return done(null, user);
      } catch(err) {
        return done(err);
      };
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
});
  
exports.sign_up = [
      body('name')
          .trim()
          .isLength({ min: 3 })
          .escape(),
      body('email')
          .trim()
          .isEmail()
          .normalizeEmail()
          .escape(),
      body('password')
          .trim()
          .isLength({ min: 6 })
          .escape(),
      body('confirmPassword')
          .trim()
          .custom((value, { req }) => {
              if (value !== req.body.password) {
                  throw new Error('Password confirmation does not match password');
              }
              return true;
          }),
  
      async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() });
          }
  
          try {
              const existingUser = await User.findOne({ email: req.body.email });
              if (existingUser) {
                  return res.status(400).json({ message: 'User with this email already exists' });
              }
  
              const hashedPassword = await bcrypt.hash(req.body.password, 10);
              const user = new User({
                  name: req.body.name,
                  email: req.body.email,
                  password: hashedPassword
              });
  
              await user.save(); 
  
              return res.status(201).json({ message: 'User created successfully' });
          } catch (error) {
              console.error(error);
              return res.status(500).json({ message: 'Internal server error' });
          }
      }
];
  
exports.log_in = asyncHandler(async(req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
})

exports.log_out = asyncHandler(async(req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
    });
});
