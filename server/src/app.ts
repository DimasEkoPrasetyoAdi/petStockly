import  express  from "express";
import pool from "./config";
import {errorHandler} from './middleware/errorHandler'
import authRouter from './routes/route.auth'
import productRouter from './routes/route.product'
import categoryRouter from './routes/route.category'



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


app.use("/", authRouter)
app.use("/", productRouter)
app.use("/", categoryRouter)

app.use(errorHandler)



export default app

