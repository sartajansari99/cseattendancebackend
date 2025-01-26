const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = 'sartaj';

async function registration(req, res) {
    let { name, email, password } = req.body
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "User with this email already exists." });
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const createdUser = await userModel.create({
                name, email, password: hash
            })
            console.log(createdUser);


        })
    })
}


async function login(req, res) {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) return res.send('something went wrong')
    // console.log(user.password, req.body.password);
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        // Set cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            maxAge: 60 * 60 * 1000, // 1 hour
            sameSite: 'strict',
        });
        return res.status(200).json({ message: 'Login successful' });
    })

}

async function send(req, res) {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}!` });
}

module.exports = { registration, login, send }