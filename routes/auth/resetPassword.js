import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import isAuthenticated from "../../middleware/index.js";
import bcrypt from "bcrypt";
const router = Router();
const prisma = new PrismaClient();


router.patch("/api/reset-password",isAuthenticated,async(req,res)=>{
const {initPassword,currentPassword} = req.body;
const {type,userId,musicianPassword,orgPassword} = req.session?.user;
try{
if(type === "musician"){
    const parsedId = parseInt(userId);
    const isValid = await bcrypt.compare(initPassword,musicianPassword);
    if(!isValid)return res.status(400).json({"message":"Incorrect password."});
    const hashedPassword = await bcrypt.hash(currentPassword,19);
    const user = await prisma.musician.update({
        where:{ID:parsedId},
        data:{
            password:hashedPassword
        }
    })
    res.status(200).json({"message":"Password reset successfully."})
}
if(type === "organization"){
    const parsedId = parseInt(userId);
    const isValid = await bcrypt.compare(initPassword,orgPassword);
    if(!isValid)return res.status(400).json({"message":"Incorrect password."});
    const hashedPassword = await bcrypt.hash(currentPassword,19);
    const user = await prisma.organization.update({
        where:{ID:parsedId},
        data:{
            password:hashedPassword
        }
    })
    res.status(200).json({"message":"Password reset successfully."})
}
}catch(error){
    console.log("error",error);
    res.status(500).json({"message":"Something went wrong."})
}
});

export default router;
