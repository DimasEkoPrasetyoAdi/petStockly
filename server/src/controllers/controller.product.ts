import { Request, Response, NextFunction } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../models/model.product";

class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { name, description, price, img_url, stock, category_id } =
        req.body;

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
        category_id: numericCategoryId,
      });

      return res.status(201).json({
        message: `Product created successfully`,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      if (Number.isNaN(numericId)) {
        return res.status(400).json({ message: `id must be a number` });
      }

      const product = await getProductById(numericId);
      if (!product) {
        res
          .status(404)
          .json({ message: `Product with id ${numericId} not found` });
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const numberId = Number(id);

      if (Number.isNaN(numberId)) {
        return res.status(400).json({ message: `id must be a number` });
      }

      const product = await getProductById(numberId);

      if (!product) {
        return res.status(404).json({ message: `Product not found` });
      }

      const { name, description, price, img_url, stock, category_id } =
        req.body;
      const updated = await updateProduct(numberId, {
        name,
        description,
        price,
        img_url,
        stock,
        category_id,
      });
      if (!updated) {
        return res.status(400).json({ message: `Failed to update product` });
      }

      res.status(200).json({ message: `Product updated successfully` });
    } catch (error) {
      next(error);
    }
  }
   static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      if (Number.isNaN(numericId)) {
        return res.status(400).json({ message: "ID must be a number" });
      }

      const success = await deleteProduct(numericId);

      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json({
        message: "Product successfully delete",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
