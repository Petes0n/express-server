import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import isAuthenticated from "../../middleware/index.js";
const router = Router();
const prisma = new PrismaClient();


router.post("/api/org/gig",isAuthenticated,async(req,res)=>{
    const {duration,gigType,musicianTypeNeeded,latitude,longitude} = req.body;
    if(req.session.user.type === "musician")return res.status(403).json({"message":"user not allowed."})
    try{
      const gig = await prisma.gig.create({
        data:{
            duration,
            gigType,
            musicianTypeNeeded,
            latitude,
            longitude,
            organization: {
                connect: { ID: req.session.user.OrgId } 
              }
        }
      });
      res.status(201).json({ message: "Success", gig })  
    }
    catch(error){
        res
        .status(500)
        .json({ message: error });
    } finally {
      await prisma.$disconnect();
    }
    
});

export default router;