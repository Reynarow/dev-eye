const express = require('express');
const router = express.Router();


// @route 
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;