const { response } = require("express");
const {googleVerify} = require("../helpers/google-verify");
const {generateJWT} = require('../helpers/generate-jwt');
const User = require('../models/user');

const googleLogin = async(req, res = response) => {

    const {tokenId} = req.body;

    try {

        const {name, email} = await googleVerify(tokenId);

        let user = await User.findOne({email});

        //User do not exist
        if(!user){
            const data = {
                name,
                email
            };

            user = new User(data);
            await user.save();
        }

        //Generate JWT
        const token = await generateJWT(user._id, user.name);

        res.json({
            ok: true,
            data: {
                name,
                uid: user._id,
                token
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es válido'
        });
    }

}

const revalidateToken = async(req, res = response) => {

    const {uid, name} = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        data: {
            token,
            uid,
            name
        }
    })
}

module.exports = {
    googleLogin,
    revalidateToken
}