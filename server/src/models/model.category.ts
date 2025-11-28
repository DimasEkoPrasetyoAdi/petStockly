import pool from "../config"

export interface Category {
    id: number
    name: string
    author_id: number
    created_at: Date
    updated_at: Date
}


export interface CreateCategoryInput{
    name: string
    author_id: number
}

export interface UpdateCategoryInput {
    name: string
}

export const getCategoryByNameInsensitive = async (
  name: string
): Promise<Category | null> => {
  const result = await pool.query(
    `SELECT * FROM categories WHERE LOWER(name) = LOWER($1)`,
    [name]
  );

  if (result.rowCount === 0) return null;
  return result.rows[0];
}

export const createCategory = async (
    data:CreateCategoryInput
): Promise<Category> =>{
    const {name, author_id} = data

    const result = await pool.query(
        `INSERT INTO categories (name, author_id) VALUES ($1,$2) RETURNING *`,
        [name, author_id]
    )
    return result.rows[0]
}

export const getAllCategory = async (): Promise<Category[]> =>{
    const result = await pool.query (`SELECT * FROM categories ORDER BY id`)

    return result.rows
}

export const getCategoryById = async (id:number) : Promise<Category> =>{
    const result = await pool.query(`SELECT * FROM categories WHERE id = $1`, [id])

    if(result.rowCount === 0){
        return null
    }

    return result.rows[0]
}

export const updateCategory = async (id: number, data: UpdateCategoryInput) : Promise<Category> =>{
    const {name} = data
    const existing = await getCategoryById(id)

    const newName = name || existing.name


    const result = await pool.query (`UPDATE categories set name = $1 WHERE id = $2 RETURNING *`,
        [newName, id]
    )

    return result.rows[0]
}