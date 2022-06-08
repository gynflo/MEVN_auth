const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../database/models/user.model');
const {keyPub} = require('../env/keys')


router.post('/', async (req,res) => {
    const body = req.body;
    const user = new UserModel({
        name: body.name,
        email: body.email,
        password: bcrypt.hash(body.password, 8)
    });
    user.save((err,user) => {
        if(err){
            res.status(400).json("Erreur lors de l'inscription");
        }
        res.status(201).json(null);
    });
});

router.get('/current', async (req,res) => {
    const token = req.cookies.token;
    if(token){
        try {
            const decodedToken = jwt.verify(token, keyPub);
            const user = await UserModel.findById(decodedToken.sub)
            .select('-password -__v')
            .exec();
            if (user) {
                res.json(user);
            } else {
                res.json(null);
            }
        } catch (e) {
            res.json(null);
        }
    } else {
        res.json(null);
    }
});

module.exports = router;