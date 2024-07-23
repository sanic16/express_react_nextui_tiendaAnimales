import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import db from "../utils/db";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await db.product.count({
    where: {
      name: {
        contains: req.query.keyword as string,
        mode: "insensitive",
      },
    },
  });

  const products = await db.product.findMany({
    take: pageSize,
    skip: pageSize * (page - 1),
    where: {
      name: {
        contains: req.query.keyword as string,
        mode: "insensitive",
      },
    },
  });

  return res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await db.product.findUnique({
      where: {
        id: req.params.id as string,
      },
    });
    if (product) {
      return res.json(product);
    }
    throw new Error("Product not found");
  }
);
