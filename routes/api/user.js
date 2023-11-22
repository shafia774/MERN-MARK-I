const express = require('express');
const UserController =require('../../app/controllers/UserController')
const AuthController =require('../../app/controllers/AuthController')
const BruteForce =require('../../app/helpers/BruteForcePreventionHelper')

const router = express.Router();

router.post('/signup', AuthController.signUp);
router.post('/login', BruteForce.prevent ,AuthController.logIn);

router.post('/forgotPassword', AuthController.forgotPassword);
router.patch('/resetPassword/:token', AuthController.resetPassword);
router.patch('/resetMyPassword',  AuthController.protect, AuthController.updatePassword);


router.patch('/updateMe', AuthController.protect, UserController.updateMe);
router.delete('/deleteMe', AuthController.protect, UserController.deleteMe);



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