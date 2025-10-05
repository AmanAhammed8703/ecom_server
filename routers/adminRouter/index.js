import express from 'express'
import { helpers } from '../../helpers/helpers.js';



export const adminRouter = express.Router();
adminRouter.post("/add-product/",async(req,res)=>{ 
    await helpers.addProduct(req.body).then((response)=>{
        console.log(response);
        res.status(201).json(response);
    }).catch((err)=>{
        res.status(500).json({ message: err.message });
    })
})

adminRouter.delete("/delete-product",async(req,res)=>{
    await helpers.deleteProduct(req.body.id).then((response)=>{
        console.log(response);
        res.status(201).json(response)
    }).catch((err)=>{
        res.status(500).json({ message: err.message });
    })
})
adminRouter.put("/update-product",async(req,res)=>{
    await helpers.updateProduct(req.body).then((response)=>{
        console.log(response);
        res.status(201).json(response)
    }).catch((err)=>{
        res.status(500).json({ message: err.message });
    })
})
adminRouter.get("/get-all-product",async(req,res)=>{
    await helpers.getProducts().then((response)=>{
        console.log(response);
        res.status(201).json(response)
    }).catch((err)=>{
        res.status(500).json({ message: err.message });
    })
})
adminRouter.post("/get-One-Product",async(req,res)=>{
    await helpers.getProductById(req.body.id).then((response)=>{
        console.log(response);
        res.status(201).json(response)
    }).catch((err)=>{
        res.status(500).json({ message: err.message });
    })
})



