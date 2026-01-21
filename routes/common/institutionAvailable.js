import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import isAuthenticated from "../../middleware/index.js";

const prisma = new PrismaClient();
const router = Router();

router.get("/api/org/available/location", isAuthenticated, async (req, res) => {
  const { musicianLocation, type } = req.session?.user;
  const { page = 1, limit = 20, search } = req.query;
  
  if (type !== "musician")
    return res.status(403).json({ message: "User not allowed." });
  
  const pageNum = Math.max(parseInt(page), 1);
  const limitNum = Math.min(Math.max(parseInt(limit), 1), 50);
  const offset = (pageNum - 1) * limitNum;
  
  try {
    // Build where clause with optional search
    const whereClause = search 
      ? { 
          location: { 
            contains: search,
            mode: 'insensitive' 
          } 
        }
      : { location: musicianLocation };
    
    // Get total count for pagination
    const total = await prisma.organization.count({ where: whereClause });
    
    // Get organizations with pagination
    const orgAvailable = await prisma.organization.findMany({
      where: whereClause,
      select: {
        ID: true,
        orgName: true,
        locationName: true,
        latitude: true,
        longitude: true,
        avatarUrl: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: offset,
      take: limitNum
    });
    
    const totalPages = Math.ceil(total / limitNum);
    
    res.status(200).json({
      organizations: orgAvailable,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalResults: total,
        resultsPerPage: limitNum,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
    
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(500).json({ 
      message: "Something happened.", 
      error: error.message 
    });
  }
});

export default router;
