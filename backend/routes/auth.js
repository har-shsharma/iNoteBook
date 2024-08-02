const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecretKey = "Thisisasecretkey";
const fetchUser=require('../middleware/fetchUser')

router.post('/createuser', [body('name', 'Enter a valid name').isLength({ min: 3 }), body('email', 'Enter a valid email').isEmail(), body('password', 'Password must contain atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
    const result = validationResult(req);
    let success=false;
    if (!result.isEmpty()) {
        return res.status(400).json({success,errors: result.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "A user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecretKey);
        success=true;
        res.json({success, authToken });
    }
    catch (error) {
        success=false;
        res.status(500).send(success,"Internal server error");
    }
});

router.post('/login', [body('email', 'Enter a valid email').isEmail(), body('password', 'Password cannot be blank').exists()], async (req, res) => {
    const result = validationResult(req);
    let success=false;
    if (!result.isEmpty()) {
        return res.status(400).json({success, errors: result.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({success, error: "Invalid email or password!" });
        }
        const { email, password } = req.body;
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Invalid email or password!" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecretKey);
        success=true;
        res.json({success, authToken });
    }
    catch (error) {
        success=false;
        res.status(500).send(success,"Internal server error");
    }
});

router.post('/getuser',fetchUser, async (req, res) => {
    let success=false;
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        success=true;
        res.send(success,user);
    } catch (error) {
        success=false;
        res.status(500).send(success,"Internal server error");
    }
})

module.exports = router;    