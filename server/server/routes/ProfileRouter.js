const express = require('express');
const router = express.Router();
const passport = require('passport');
const ProfileController = require('../controllers/ProfileController');

// Authentication Method
const authenticateRoute = passport.authenticate('jwt', {
  session: false,
});

// @route GET api/profiles
// @desc Gets the public profile list of the user
// @access Public
router.get('/profiles', ProfileController.profiles_get);

module.exports = router;