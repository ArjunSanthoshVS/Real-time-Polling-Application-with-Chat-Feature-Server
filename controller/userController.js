const User = require("../models/userSchema");
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')

module.exports = {
    register: async(req, res) => {
        try {
            const { name, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already registered' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Unable to register user' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const token = jwt.sign({ userId: user._id }, "Scintillate", { expiresIn: '24h' });

            res.status(200).json({ message: 'User logged in successfully', token, user });

        } catch (error) {
            res.status(500).json({ error: 'Unable to log in' });
        }
    },
}