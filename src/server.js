import express, { json } from "express";
import cors from "cors";
import "dotenv/config"
import authRouter from "./routers/authRouters.js";

const app = express();

app.use(json());
app.use(cors());
app.use(authRouter)

app.listen(process.env.PORT || 4000, () => console.log(`Server listening to PORT ${process.env.PORT} @${Date().toString()}`));