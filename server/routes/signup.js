const express = require('express');
const cors = require('cors');
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Harryisagoodb$oy';

const router = express.Router();
router.use(cors());

router.post('/', [
    body('email', "Invalid Email!").isEmail(),
    body('password', "Password Length Must Be At Least 6 Charecters").isLength({ min: 6 })
],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        };

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);

            res.json({ authtoken })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    });

module.exports = router;