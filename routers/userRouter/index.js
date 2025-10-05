import express, { response } from 'express'
import { helpers } from '../../helpers/helpers.js';

export const userRouter = express.Router();

userRouter.post("/signUp",async(req,res)=>{
    await helpers.userSignUp(req.body).then((response)=>{
        res.status(201).json(response);
    }).catch((err)=>{
        res.status(500).json({ message: err.message });
    })
})
userRouter.post("/logIn",async(req,res)=>{
    await helpers.userLogin(req.body).then((response)=>{
        res.status(201).json(response);
    }).catch((err)=>{
        res.status(500).json({ message: err.message });
    })
})
userRouter.post("/addToCart",async(req,res)=>{
    await helpers.addToCart(req.body).then((response)=>{
        res.status(201).json(response);
    }).catch((err)=>{
        res.status(500).json({ message: err.message });
    })
})
userRouter.post("/placeOrder",async(req,res)=>{
    
    await helpers.placeOrder(req.body.userId).then((response)=>{
        res.status(201).json(response);
    }).catch((err)=>{
        res.status(500).json({ message: err.message });
    })
})
