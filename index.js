import express from "express";
const app = express()
import { adminRouter } from './routers/adminRouter/index.js';
import { userRouter } from "./routers/userRouter/index.js";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db.js";
dotenv.config();

const PORT = 3000;
app.use(express.json());      
await connectDB();

// sync models
await sequelize.sync({ alter: true });
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Welcome to Express Server!");
});
app.use('/admin',adminRouter);
app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server succesfully running at ${PORT}`); 
})