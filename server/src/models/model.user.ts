import pool from "../config";

export interface User {
    id : number;
    username : string;
    email : string;
    password : string;
    role : string
    phone_number :string
    address: string
    created_at : Date;
    updated_at : Date
}

export interface CreateUserInput{
    username: string
    email: string
    password: string
    role: string
    phone_number :string
    address: string
}


export const findUserByEmail = async (
  email: string
): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (result.rowCount === 0) return null;
  return result.rows[0];
};

export const findUserById = async(id: number): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (result.rowCount === 0) return null;
  return result.rows[0];
}

export const createUser = async (
  data: CreateUserInput
): Promise<Omit<User, "password">> => {
  const {
    username,
    email,
    password,
    role = "Staff",
    phone_number = null,
    address = null,
  } = data;

  const result = await pool.query(
    `INSERT INTO users (username, email, password, role, phone_number, address)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, username, email, role, phone_number, address, created_at, updated_at`,
    [username, email, password, role, phone_number, address]
  );

  return result.rows[0];
};
