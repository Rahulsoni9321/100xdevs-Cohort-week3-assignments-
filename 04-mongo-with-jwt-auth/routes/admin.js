const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken');
const { Admin, Course } = require("../db");
const {JWT_KEY}= require("../key");
const router = Router();

// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    await Admin.create({
        username:username,
        password:password
    })
    
    res.json({
        msg:"Admin created succesfully!"
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
   const response = await Admin.findOne({
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
     msg:"Admin does not exist."
})
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const Description=req.body.Description;
    const imagelink=req.body.imagelink;
    const price=req.body.price;
    
    const response=await Course.create({
        title:title,
        Description:Description,
        Imagelink:imagelink,
        price:price
    })

    res.json({
        msg:"course created successfully",
        courseid:response._id
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allcourses=await Course.find({});
    res.json({
        courses:allcourses
    })

});

module.exports = router;