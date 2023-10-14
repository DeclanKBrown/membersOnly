const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Post = require('../models/post')

exports.all_posts = asyncHandler(async(req, res, next) => {
    const allPosts = await Post.find().sort({ date: 1 }).exec()

    res.json({ allPosts: allPosts })
})

exports.create_post = [
    body('title')
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body('text')
        .trim()
        .isLength({ max: 100 })
        .escape(),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req)

        try {
            const post = new Post({
                title: req.body.title,
                text: req.body.text,
                user: req.body.id
            })
            if (!errors.isEmpty()) {
                res.status(401).send({ errors: errors.array() })
            } else {
                await post.save()
                res.status(200).json({ message: 'Success' })
            }
        } catch(err) {
            res.status(500).json({ Message: err })
        }
    })
]

exports.delete_post = asyncHandler(async(req, res, next) => {
    await findByIdAndRemove(req.params.id)
})