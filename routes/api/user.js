const express = require('express');
const UserController =require('../../app/controllers/UserController')
const AuthController =require('../../app/controllers/AuthController')

const router = express.Router();

router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.logIn);



router
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route('/:id')
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;