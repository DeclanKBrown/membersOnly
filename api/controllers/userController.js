const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/user');

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email }, {
        email: 1,
        name: 1,
        password: 1
      });

      if (user === null) {
        return done(null, false, { message: "Incorrect email" });
      };

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      user.password = undefined

      if (isPasswordMatch === false) {
        return done(null, false, { message: "Incorrect password" });
      };

      return done(null, user);
    } catch(err) {
      console.log('err', err)
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

              const token = jwt.sign(
                {
                  userId: user._id,
                  userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
              );

              return res.status(200).send({
                message: "User Created Successfully",
                user: {
                  email: user.email,
                  name: user.name
                },
                token,
              });
          } catch (error) {
              console.error(error);
              return res.status(500).json({ message: 'Internal server error' });
          }
      }
];

exports.local_login = asyncHandler(async(req,res,next) => {
    passport.authenticate("local", function(err, user, info, status) {
      if (err) { return next(err) }
      if (!user) { return res.status(status).json(info) }
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );

      //   return success response
      return res.status(200).send({
        message: "Login Successful",
        user: {
          email: user.email,
          name: user.name
        },
        token,
      });
    })(req,res,next)
})

exports.log_out = asyncHandler(async(req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.json({ message: 'successfully logged out'})
    });
});
