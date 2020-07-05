const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { response } = require('express');

// @route      Get api/profile/me
// @descrip    get current users profile
//@acces       private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'پروفایلی برای این کاربر یافت نشد' });
        }

        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error')
    }
});

// @route      Post api/profile
// @descrip    create or update  users profile
//@acces       private


router.post('/', [auth, [
    check('status', 'وضعیت مورد نیاز است').not().isEmpty(),
    check('skills', 'حداقل یک مهارت مورد نیاز است').not().isEmpty()
]
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company, website, location, bio, status, githubusername,
            skills, youtube, facebook, twitter, instagram, linkedin
        } = req.body;

        // Build profile object

        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;


        try {

            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true });
                return res.json(profile);
            }

            //Create 

            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error')
        }



    })



// @route      Get api/profile
// @descrip   get all profiles
//@acces       public


router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route      Get api/profile/user/:user_id
// @descrip   get user profile by id
//@acces       private


router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There are no profile for this user' });
        }
        res.json(profile)
    } catch (error) {
        console.log(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There are no profile for this user' });
        }
        res.status(500).send('Server Error');
    }
});
// @route      DELETE api/profile
// @descrip   delete profile, user & post
//@acces       private
router.delete('/', auth, async (req, res) => {
    try {
        //Remove users posts 

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id })
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({ msg: 'کاربر حذف شد' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});


// @route      DELETE api/education
// @descrip   delete education, user & post
//@acces       private


router.put('/education', [auth, [
    check('school', 'دانشگاه مورد نیاز است').not().isEmpty(),
    check('degree', 'مدرک مورد نیاز است').not().isEmpty(),
    check('fieldofstudy', 'رشته ی تحصیلی مورد نیاز است').not().isEmpty(),
    check('from', 'تاریخ شروع مورد نیاز است').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    const newEdu = {
        school, degree, fieldofstudy, from, to, current, description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }

});



// @route      DELETE api/profile/education/:exp_id
// @descrip   delete education from profile
//@acces       private

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {



        let profile = await Profile.findOne({ user: req.user.id });
        // Get the remove index

        const eduId = profile.education.find(item => item.id === req.params.edu_id);

        if (eduId) {
            profile.education = profile.education.filter(item => item.id !== req.params.edu_id);
            await profile.save();

            res.json(profile);


        } else {
            res.status(400).json({ msg: "سابقه با این شناسه یافت شد" });
        }


        // const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);

        // profile.experience.splice(removeIndex, 1);



    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});




// @route      Put api/profile
// @descrip   add experience to 
//@acces       private


router.put('/experience', [auth, [
    check('title', 'تیتر مورد نیاز است').not().isEmpty(),
    check('company', 'شرکت مورد نیاز است').not().isEmpty(),
    check('from', 'تاریخ شروع مورد نیاز است').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;

    const newExp = {
        title, company, location, from, to, current, description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }

});



// @route      DELETE api/profile/experience/:exp_id
// @descrip   delete experience from profile
//@acces       private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {



        let profile = await Profile.findOne({ user: req.user.id });
        // Get the remove index

        const expId = profile.experience.find(item => item.id === req.params.exp_id);

        if (expId) {
            profile.experience = profile.experience.filter(item => item.id !== req.params.exp_id);
            await profile.save();

            res.json(profile);


        } else {
            res.status(400).json({ msg: "سابقه با این شناسه یافت شد" });
        }


        // const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);

        // profile.experience.splice(removeIndex, 1);



    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});


//@route  Get api/profile/github/:username
//@desc   get user repos from github
//@access Public

router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?
            per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}
            &client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {
            if (error) console.log(error);

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'چنین شناسه ای در گیت هاب پیدا نشد' });
            }

            res.json(JSON.parse(body));
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})





module.exports = router;