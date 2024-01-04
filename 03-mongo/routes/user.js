const express=require ("express")
const { Router } = require("express");
const {User, Course}=require("../db");
const router = Router();

const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;
     const response=await User.create({
        username,
        password
    })
    res.json({
        msg:"User created successfully"
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allcourses=await Course.find({});
    res.json({
        courses:allcourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseid=req.params.courseId;
    await User.findOneAndUpdate({
        username:req.headers.username,
        password:req.headers.password
    },
    {
        "$push":{
            purchasedcourse:courseid
        }
    });
    res.json({
        msg:"Course purchased successfully"
    })

});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const username= req.headers.username;
    const password=req.headers.password;
    const client=await User.findOne({
        username:username,
        password:password
    })
   
    const response= await Course.find({
        _id:{
           "$in": client.purchasedcourse
        }
    })

    res.json({
        courses:response
    })



});

module.exports = router