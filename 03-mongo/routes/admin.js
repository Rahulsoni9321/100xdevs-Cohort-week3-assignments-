const express=require("express");
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin}=require("../db")
const {Course}=require("../db")
const router = Router();
let courseid=1;
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    Admin.create({
        username:username,
        password:password
    }).then(function(){
        res.json({
            msg:"Admin Created Successfully"
        })
    })
    
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const Description=req.body.Description;
    const price=req.body.price;
    const imagelink=req.body.imagelink;

    const newcourse=await Course.create({
        title,
        Description,
        imagelink,
        price,
        published:true
    })

    res.json({
        msg:"Course created successfully",
        courseid:newcourse._id
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        courses:response
    })
});

module.exports = router;