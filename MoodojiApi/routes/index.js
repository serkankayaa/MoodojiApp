var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Modooji Api' });
});

router.post('/postUser', function(req, res, next){
  return UserController.FirstLoad(req, res, next);
});

router.get('/getAllUser', function(req, res, next){
  return UserController.GetData();
});

router.get('/dropIndex', function(req, res, next){
  return UserController.DropIndexes();
});

module.exports = router;
