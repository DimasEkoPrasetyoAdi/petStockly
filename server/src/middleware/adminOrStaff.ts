import { Request, Response, NextFunction } from "express";
import { getProductById } from "../models/model.product";

export const adminOrStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const numberId = Number(id);

    if (Number.isNaN(numberId)) {
      return res.status(400).json({ message: `id must be a number` });
    }

    const product = await getProductById(numberId);

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with id ${numberId} not found` });
    }

    if (req.user.role === "Admin") {
      return next();
    }

    if (req.user.role === "Staff") {
      if (product.author_id !== req.user.id) {
        return res
          .status(403)
          .json({ message: `You are not authorized to perform this action` });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
