const UserModel = require('../database/models/user.model');

const router =  require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//key
const {key} = require('../env/keys');

router.post('/', async (req,res) => {
    const body = req.body;
    const user = await UserModel.findOne({email: body.email}).exec();
    if(user) {
        if(bcrypt.compareSync(body.password, user.password)){
            const token = jwt.sign({}, key, {
                subject: user._id.toString(),
                expiresIn: 60 * 60 * 24,
                algorithm: 'RS256'
            });
            res.cookie('token', token);
            res.json(user);
        }else {
        res.status(400).json('Identifiants incorrects')

        }
    }else {
        res.status(400).json('Identifiants incorrects')
    }
});

router.delete('/', async (_,res) => {
    res.clearCookie('token')
    res.end();
})

module.exports = router