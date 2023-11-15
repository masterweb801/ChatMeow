const express = require('express');
const cors = require('cors');
const Post = require('../models/Posts');
const fetchUser = require('../middleware/fetchUser');

const router = express.Router();
router.use(cors());

router.post('/', fetchUser, async (req, res) => {
    let success = false;
    try {
        const posts = await Post.find({});
        res.json(posts)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
})

module.exports = router;