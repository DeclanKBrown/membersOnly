var express = require('express');
var router = express.Router();

const post_controller = require('../controllers/postController')
const user_controller = require('../controllers/userController')

/// POST ROUTES ///
router.get('/', post_controller.all_posts)

router.get('/create-post', post_controller.create_post)

router.get('./delete-post', post_controller.delete_post)

/// USER ROUTES ///

app.post("/sign-up", user_controller.sign_up)

app.post("/log-in", user_controller.log_in)

app.post("/log-out", user_controller.out)

module.exports = router
