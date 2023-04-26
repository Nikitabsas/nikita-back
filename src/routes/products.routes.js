import { Router } from "express";
import { getProductDetail, getProducts } from "../utils/controllers/products.controllers.js";

const router = Router()

router.get("/product/getAll", getProducts)
router.get("/product/getDetail/:id", getProductDetail)

export default router