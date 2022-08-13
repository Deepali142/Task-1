const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name == null || name == undefined || name == '') {
            console.log('Please insert your name')
            return res.send('Please insert your name')
        }
        if (email == null || email == undefined || email == '') {
            console.log('Please insert your email')
            return res.send('Please insert your email')
        }
        if (password == null || password == undefined || password == '') {
            console.log('Please insert required password')
            return res.send('Please insert required password')
        }

        const oldUser = await User.findOne({ email })
        if (oldUser) {
            console.log('User already exists, Please Login')
            return res.send('User already exists, Please Login')
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: encryptedPassword,
        });
        return res.status(201).send({
            message:'User Created successfully!!',
            user
        })
    } catch (err) {
        console.log(err);
        return res.send(err)
    }
}

exports.login = (req,res) =>{
    if(!req.body.email && !req.body.password){
        console.log('Fill the required field')
        return res.json({ success: false, error: "Fill the required field" });
    }

    User.findOne({email:req.body.email})
    .then((User) =>{
        if(!User){
            console.log('User does not exists')
            return res.json('User does not exists')
        }else {
            if(!bcrypt.compareSync(req.body.password,User.password)){
                return res.json('Password did not match')
            } else{
                const accessToken = jwt.sign({"_id":User._id},"Anaya",{
                    expiresIn:'1d'
                });
                res.json({ success: true, accessToken: accessToken,message:'Logged in successfully!!' })
            }
        }
    }).catch((err) =>{
        return res.json({ success: false, message: err.message })
    })
}