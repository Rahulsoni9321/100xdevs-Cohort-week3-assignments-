const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const {JWT_KEY}= require("../key");
const jwt = require('jsonwebtoken');

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic 
    const username=req.body.username;
    const password=req.body.password;
    const response=await User.create({
          username:username,
          password:password
    })
    res.json({
        msg:"user created successfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
   const response = await User.findOne({
      username:username,
      password:password
   })
   if (response){
    const token = jwt.sign({
        username:username
    },JWT_KEY);
    res.json({
        token:token
    })
   }
   else 
   res.json({
     msg:"Username does not exist."
})


});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    const allcourses=await Course.find({});
    res.json({
        courses:allcourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try{
    const courseid=req.params.courseId;
    const user=await User.findOneAndUpdate({
        username:req.username
    },{
        "$push":{
            purchasedcourse:courseid
        }
    })
    res.json({
        msg:"course purchased successfully"
    })
    }
    catch(e){
        res.json({
            msg:"invalid course id"
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user=req.username;
    const response=await User.findOne({
        username:user
    })
    const id=response.purchasedcourse;
    const allcourses=await Course.find({
        _id :{
            "$in":id
        }
    })

    res.json({
        courses:allcourses
    })
});

module.exports = router