const express = require("express");
const userAuth = require("../middlewares/authMiddleware.js");
const {getUserController,updateUserController, getTotalUsers} = require("../controllers/userController.js");

const router = express.Router();

router.get("/getUser",userAuth,getUserController);
router.put("/update-user", userAuth, updateUserController);
router.get("/total-user",userAuth,getTotalUsers);
module.exports = router;