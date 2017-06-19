const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    vue = new Vue()
    res.render('events', vue);
});

module.exports = router;
