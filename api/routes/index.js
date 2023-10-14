var express = require('express');
var router = express.Router();

const post_controller = require('../controllers/postController')
const user_controller = require('../controllers/userController');

/// POST ROUTES ///
router.get('/all-posts', post_controller.all_posts)

router.post('/create-post', post_controller.create_post)

router.post('/delete-post', post_controller.delete_post)

/// USER ROUTES ///

router.post("/sign-up", user_controller.sign_up)

router.post("/login-local", user_controller.local_login)

router.post("/log-out", user_controller.log_out)

module.exports = router
