const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', {title: 'Hello, World!'});
});

// UI

/* GET Userlist page. */
router.get('/userlist', function (req, res) {
    const db = req.db;
    const collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});

// API

/* GET users */
router.get('/user', function (req, res) {
    const db = req.db;
    const collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        res.json(docs); // Render the results in JSON format
    });
});

/* POST user */
router.post('/user', function (req, res) {
    const db = req.db;
    const collection = db.get('usercollection');

    console.log(req.body);

    collection.insert(req.body);

    res.send(200);
});


module.exports = router;
