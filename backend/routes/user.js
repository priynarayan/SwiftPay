const express = require("express");
const {signupBody, signinBody, updateBody} = require("../types");
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {authMiddleware} = require("../middleware");

const router = express.Router();

router.post("/signup" , async(req , res) => {

    try {
        const signupPayload = req.body;
        const parsedSignupPayload = signupBody.safeParse(signupPayload);

        if(!parsedSignupPayload.success){
            return res.status(406).json({
                message: "Incorrect inputs"
            })
        }

        const existingUser = await User.findOne({
            username: req.body.username
        })

        if(existingUser){
            return res.status(406).json({
                message: "Email already taken"
            })
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })

        const userId = user._id;

        //create account

        await Account.create({
            userId,
            balance: 1 + Math.random()*10000
        })

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.status(201).json({
            message: "User created successfully",
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: "An error occurred during signup",
            error: error.message,
        });
    }
})

router.post("/signin", async (req , res) => {

    try {
        const signinPayload = req.body;
        const parsedSigninPayload = signinBody.safeParse(signinPayload);

        if(!parsedSigninPayload.success){
            return res.status(406).json({
                message: "Incorrect inputs"
            })
        }

        const user = await User.findOne({
            username: req.body.username,
        })


        if(!user){
            return res.status(404).json({
                message: "User not found, check your email"
            })
        }
        else if (user && req.body.password == user.password) {
            const token = jwt.sign(
                { userId: user._id }, // Payload
                JWT_SECRET            // Secret key
            );

            return res.json({ token });
        }
        else if (req.body.password !== user.password) {
            return res.status(401).json({ message: "Invalid password" });
        } 
        else {
            return res.status(404).json({
                message: "User not found",
            });
    }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred during signup",
            error: error.message,
        });
    }    
})

router.put("/edit",authMiddleware, async(req, res) => {

    try {
        const updatePayload = req.body;
        const parsedUpdatePayload = updateBody.safeParse(updatePayload);
        //console.log("Payload received:", req.body);

        if(!parsedUpdatePayload.success){
            console.log("Parsed payload:", parsedUpdatePayload);
            return res.send(406).json({
                message: "Error while updating information"
            })
        }

        await User.updateOne({_id:req.userId}, req.body);
        //console.log(req.userId);

        const result = await User.updateOne({ _id: req.userId }, req.body);
        //console.log("Database update result:", result);

        return res.json({
            message: "Updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "An error occurred during signup",
            error: error.message,
        });
    }
}) 

router.get("/bulk", async(req,res) => {

    try {
        const filter = req.query.filter || "";
        const users = await User.find({
            $or:[{
                firstName:{
                    "$regex": filter
                }
                },{
                lastName:{
                    "$regex": filter
                }
            }]
        })

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    } catch (error) {
        res.status(500).json({
            message: "An error occurred during signup",
            error: error.message,
        });
    }
})

module.exports = router;