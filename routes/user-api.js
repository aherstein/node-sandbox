const express = require('express');
const router = express.Router();

/* GET users */
router.get('/', function (req, res) {
    const db = req.db;
    const collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        res.json(docs); // Render the results in JSON format
    });
});

/* POST user */
router.post('/', function (req, res) {
    const db = req.db;
    const collection = db.get('usercollection');

    console.log(req.body);

    collection.insert(req.body);

    res.send(200);
});

module.exports = router;
