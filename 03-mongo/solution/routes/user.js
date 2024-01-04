const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username, 
        password
    })
    res.json({
        message: "User created successfully"
    })
});

router.get('/courses',  (req, res) => {
    // Implement listing all courses logic
    
      Course.find({})
      .then(function(value){
        if (value){
            res.json({
                courses:value
             })
        }
        else{
            console.log(e);
            res.json({
                e
            })
        }
      })
   
    
    
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
   console.log("fhgdfgdfjl")
    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedcourse: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedcourse);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedcourse
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router