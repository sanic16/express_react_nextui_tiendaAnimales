import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import db from "../utils/db";
import type { Request, Response, NextFunction } from "express";

// @desc   Protect routes
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          userId: string;
          isAdmin: boolean;
        };
        const user = await db.user.findUnique({
          where: {
            id: decoded.userId,
          },
          select: {
            id: true,
            role: true,
          },
        });
        if (!user) {
          return res
            .status(401)
            .json({ message: "Not authorized, token failed" });
        }
        req.user = {
          id: user.id,
          isAdmin: user.role === "ADMIN",
        };
        return next();
      } catch (error) {
        console.log("Error in authMiddleware.ts: ", error);
        throw new Error("Not authorized, token failed or expired");
      }
    } else {
      res.status(401);
      console.log("Error in authMiddleware.ts: ", "Not authorized, no token");
      throw new Error("Not authorized, no token");
    }
  }
);

// @desc    Admin middleware
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
