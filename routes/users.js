const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', {title: 'Users'});

    let scope = {
        el: '#vue-instance',
        data: {
            username: 'test',
            email: 'test@test.com'
        },
        vue: {
            meta: {
                title: 'Users',
            }
        }
    };

    res.render('users', scope);
});

module.exports = router;
