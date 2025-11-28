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

export interface updateProductInput{
  name: string,
  description: Text,
  price: number,
  img_url: string,
  category_id: number,
  stock:number
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
  const result = await pool.query(`SELECT * FROM products WHERE id = $1`, [id]);

  if (result.rowCount === 0) {
    return null
  }

  return result.rows[0];
};

export const updateProduct = async (id: number, data: updateProductInput) :Promise<Product>=>{
  const {name,description,price,img_url,category_id,stock} = data
  const existing = await getProductById(id)
  const newName = name || existing.name
  const newDescription = description || existing.description
  const newPrice = price || existing.price
  const newImgUrl = img_url || existing.img_url
  const newCategoryId = category_id || existing.category_id
  const newStock = stock || existing.stock

  const result = await pool.query(
    `UPDATE products set name = $1, description = $2, price = $3, img_url = $4, category_id = $5, stock = $6 WHERE id =$7 RETURNING *`,

    [newName,newDescription,newPrice,newImgUrl,newCategoryId,newStock,id]
  )

  return result.rows[0]
}

export const deleteProduct = async (id:number): Promise<boolean>=>{
  const result = await pool.query(`DELETE FROM products WHERE id = $1`,[id])
  return result.rowCount === 1

}
