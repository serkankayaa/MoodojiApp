const express = require('express');
const router = express.Router();

const user_controller = require('../api/controller/UserController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('api/postUser', user_controller.FirstLoad);

module.exports = router;
