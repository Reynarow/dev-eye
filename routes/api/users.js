const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route for register
// @access  Public 
router.post('/', [
    check('name', 'اسم را وارد کنید.').not().isEmpty(),
    check('name', 'اسم را کامل وارد کنید.').isLength({min: 2}),
    check('email', 'لطفا ایمیل خود را به طور صحیح وارد کنید.').isEmail(),
    check('password', ' لطفا رمز عبور خود را در ۶ رقم وارد کنید.  ').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {

            // if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'این ایمیل استفاده شده است' }] })
            }
            //get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            user = new User({
                name,
                email,
                avatar,
                password
            })
            //EnCrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            //return jwt

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
                    if (err) throw err;
                    res.json({ token });
                }
            );




        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error')
        }




    });

module.exports = router;