const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

const auth = require('../../middleware/auth');



// @route    Post api/posts
//@desc      Create a post
//@access     Private
router.post('/', [auth, [
    check('text', ' متن نباید خالی باشد').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }




});

//@route       Get api/posts
//@desc         Get all posts of user
//@access       Private

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts);
    } catch (error) {
        res.status(500).send('Server Error');
    }
})



//@route           Get api/posts/:id
//@desc            Get post by ID
//@access          Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post ? res.json(post) : res.status(404).json({ msg: 'پستی یافت نشد' });
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'پستی یافت نشد' })
        }
        res.status(500).send('Server Error');
    }
});


//@route             Delete api/posts/:id
//@desc              Delete post by ID
//@access            Private


router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "پستی یافت نشد" });
        }
        //check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'کاربر مورد نظر شناسایی نشد' });
        }

        await post.remove();
        res.json({ msg: 'پست حذف شد' });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "پستی یافت نشد" })
        }
    }
})

//@route             PUT api/posts/like/:id
//@desc              Like a post
//@access            Private

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Check if the post has already been liked
        if (post.likes.find(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: "پست قبلا لایک شده" })
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//@route             PUT api/posts/unlike/:id
//@desc              Like a post
//@access            Private

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        const checkLiked = post.likes.find(like => like.user.toString() === req.user.id);
        //Check if the post has already been liked
        if (checkLiked) {
            post.likes = post.likes.filter(like => like.user.toString() !== req.user.id)
        } else {
            return res.status(400).json({ msg: "پست قبلا لایک نشده" })
        }


        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
// @route     Post api/posts/comment/:id
//@desc       Create a post
//@access     Private


router.post("/comment/:id", [auth, [
    check('text', 'متن نباید خالی باشد').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);


            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);

            await post.save();

            res.json(post.comments);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });


// @route     DELETE api/posts/comment/:id/:comment_id
//@desc       delete comment
//@access     Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        // pull out comment
        comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //make sure comment exists

        if (!comment) {
            return res.status(404).json({ msg: "کامنت وجود ندارد" });
        }
        //check user 
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "شناسه مربوط به کاربر مورد نظر نیست" });

        }
        post.comments = post.comments.filter(comment => comment.id.toString() !== req.params.comment_id);

        await post.save();

        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;