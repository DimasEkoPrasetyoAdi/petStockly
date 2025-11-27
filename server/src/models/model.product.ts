import pool from "../config";

export interface Product {
  id: number;
  name: string;
  description: Text;
  price: number;
  img_url: string;
  category_id: number;
  author_id: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProductInput {
  name: string;
  description: Text;
  price: number;
  img_url: string;
  category_id: number;
  author_id: number;
  stock: number;
}

// create product function

export const createProduct = async (
  data: CreateProductInput
): Promise<Product> => {
  const { name, description, price, img_url, category_id, author_id, stock } =
    data;
  const result = await pool.query(
    `INSERT INTO products (name,description,price,img_url,category_id,author_id,stock) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,

    [name, description, price, img_url, category_id, author_id, stock]
  );
  return result.rows[0];
};

// get all products function
export const getAllProducts = async (): Promise<Product[]> => {
  const result = await pool.query(`SELECT * FROM products ORDER BY id`);

  return result.rows;
};

// get product by id function
export const getProductById = async (id: number): Promise<Product> => {
  const result = await pool.query(`SELECT * FROM products WHERE id = $1, [id]`);

  if (result.rowCount === 0) {
    throw new Error("Product not found");
  }

  return result.rows[0];
};
