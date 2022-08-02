import express, { json } from "express";
import cors from "cors";
import authRouter from "./routers/authRouters.js";
import serviceRouter from "./routers/serviceRouters.js";
import "dotenv/config"

const app = express();

app.use(json());
app.use(cors());
app.use(authRouter)
app.use(serviceRouter)

app.listen(process.env.PORT || 4000, () => console.log(`Server listening to PORT ${process.env.PORT} @${Date().toString()}`));