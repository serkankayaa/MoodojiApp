var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Modooji Api' });
});

router.post('/postUser', (req, res) => {
  return UserController.PostUser(req, res);
});

router.get('/getAllUser', (req, res) => {
  return UserController.GetAllUser(req, res);
});

router.get('/getUserGroup', (req, res) => {
  var phoneNumbers = ["5392059363", "5302512625", "1231231"];
  //Arayüzden gelecek telefon numara dizisi
  return UserController.GetUserData(req, res, phoneNumbers);
});

router.delete('/deleteAllData', () => {
  return UserController.DeleteAllData();
});

router.get('/dropIndex', () => {
  return UserController.DropIndexes();
});

module.exports = router;
