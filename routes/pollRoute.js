var express = require('express');
const voteController = require('../controller/voteController');
var router = express.Router();

router.get('/getAllVotes', voteController.getAllVotes)
router.post('/vote', voteController.vote)

module.exports = router;
