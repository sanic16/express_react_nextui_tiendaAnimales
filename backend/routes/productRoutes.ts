import { Router } from "express";
import * as productController from "../controllers/productController";
// import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
export default router;
