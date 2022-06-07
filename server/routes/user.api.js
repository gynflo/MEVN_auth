const router = require('express').Router();
const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user.model');

router.post('/', async (req,res) => {
    const body = req.body;
    const user = new UserModel({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(8))
    })
    user.save((err,user) => {
        if(err){
            res.status(400).json("Erreur lors de l'inscription");
        }
        res.status(201).json(null);
    })

})

module.exports = router;