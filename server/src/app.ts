import  express  from "express";
import pool from "./config";


const app = express ()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api/db-test", async (_req, res) => {
  try {
    const result = await pool.query ("SELECT NOW()");
    res.json({
      success: true,
      now: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "DB error" });
  }
});



export default app

