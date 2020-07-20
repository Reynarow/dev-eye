const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User')

// @auth route / send token (handle with middleware)

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
});



//Route for auth/ get token

router.post('/', [
    check('email', "لطفا ایمیل خود را به صورت صحیح وارد کنید").isEmail(),
    check('password', "لطفا رمز عبور را وارد کنید").exists()
],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        const { email, password } = req.body;

        //user exist?
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'شناسه یا رمز عبور صحیح نیست' }] })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'شناسه یا رمز عبور صحیح نیست' }] })
            }

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw error;
                    res.json({ token });
                }
            )
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error')
        }
    }


)





module.exports = router;