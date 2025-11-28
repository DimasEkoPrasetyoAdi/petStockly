import { Request, Response, NextFunction } from "express";
import {
  createCategory,
  getCategoryByNameInsensitive,
  updateCategory,
  getCategoryById,
  getAllCategory,
} from "../models/model.category";

class CategoryController{
    static async createCategory (req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.user.id
            const {name} = req.body

            if(!name){
                res.status(400).json({message: `Category is required`})
            }

           const existingCategory = await getCategoryByNameInsensitive(name);

             if (existingCategory) {
                return res.status(400).json({
                message: "Category name already exists",
                });
            }

            const category = await createCategory({
                name,
                author_id: userId
            })

            return res.status(201).json({
                message: `Category created successfully`,
                category
            })
        } catch (error) {
            next(error)
        }
    }
}

export default CategoryController
