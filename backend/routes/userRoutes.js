
const express = require("express")
const {getAllUsers,getTwoUsers,deleteUser,createUser,acceptUserData,login} = require("./../controllers/userController")
 
const router = express.Router()

router.post("/create-user",createUser)
router.post("/accept-user",acceptUserData)
router.post("/login",login)
router.get("/get-two-users",getTwoUsers)
router.get("/get-all-users",getAllUsers)
router.delete("/delete-user",deleteUser)
module.exports = router