const express= require('express')

//router object
const router=express.Router()

//signup requiring controller
const userController=require("../controller/signupController")


router.post('/adduser', userController.createuser);
router.get('/adduser',userController.getuser);
router.delete('/adduser/:id', userController.deleteuser);

//signup route
router.get('/', (req, res)=>{
    res.render("signup")
  });

  


module.exports=router;