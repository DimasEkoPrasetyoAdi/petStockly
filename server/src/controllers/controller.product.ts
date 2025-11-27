import { Request, Response, NextFunction } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../models/model.product";
import { create } from "domain";

class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user.id;
    const { name, description, price, img_url, stock, category_id } = req.body;

    if (!name) {
      res.status(400).json({ message: `Name is required` });
    }
    if (!description) {
      res.status(400).json({ message: `Description is required` });
    }
    if (!price) {
      res.status(400).json({ message: `Price is required` });
    }
    if (!category_id) {
      res.status(400).json({ message: `Category is required` });
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);
    const numericCategoryId =
      category_id !== undefined && category_id !== null
        ? Number(category_id)
        : 0;

    if (Number.isNaN(numericPrice) || Number.isNaN(numericStock)) {
      return res.status(400).json({
        message: "price dan stock harus berupa angka",
      });
    }

    const product = await createProduct({
        name,
        author_id: userId,
        description,
        price: numericPrice,
        img_url,
        stock: numericStock,
        category_id: numericCategoryId
    })

    return res.status(201).json({
        message : `Product created successfully`,
        product
    })
    } catch (error) {
        next(error)
    }
  }

  static async getAllProducts(req: Request, res: Response, next: NextFunction){
    try {
        
        
    } catch (error) {
        next(error)
    }
  }
}

export default ProductController


