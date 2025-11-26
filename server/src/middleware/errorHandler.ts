import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number; // optional, kalau kamu kadang lempar { status: 400, ... }
}

export const errorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("ERROR:", error);

  if (error.name === "Unauthorized") {
    res.status(401).json({ message: error.message });
  } else if (error.name === "BadRequest") {
    res.status(400).json({ message: error.message });
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" });
  } else if (error.name === "Forbidden") {
    res.status(403).json({ message: error.message });
  } else if (error.name === "NotFound") {
    res.status(404).json({ message: error.message });
  } else {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error" });
  }
};
