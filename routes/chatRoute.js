var express = require('express');
const chatController = require('../controller/chatController');
var router = express.Router();

router.get('/allContacts', chatController.allContacts)
router.get('/getAllMessage', chatController.getAllMessage)
router.post('/addMessage', chatController.addMessage)

module.exports = router;
