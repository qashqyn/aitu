import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import User from '../module/user.js';

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        
        if(!user) return res.status(404).json({message:'User not found'});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) return res.status(400).json({message: 'Wrong credentials'});

        const token = jwt.sign({email: user.email, id: user._id}, 'AITUadmin', {expiresIn: '5h'});

        res.status(200).json({result: user, token});
    } catch (error) {
        res.status(500);
    }
};

export const signup = async (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    
    try {
        const existingUser = await User.findOne({email});
        
        if(existingUser) return res.status(400).json({message: "User already exists."});
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, firstname, lastname});
        
        const token = jwt.sign({email: result.email, id: result._id}, 'AITUadmin', { expiresIn: "5h"});
        
        res.status(201).json({result, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong."});
    }
};