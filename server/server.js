import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./lib/db.js";
import authRouter from "./routes/auth.route.js"
import expenseRouter from "./routes/expense.route.js"
import groupRouter from "./routes/group.route.js"
import balanceRouter from "./routes/balance.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import path from "path"
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")))

app.use("/api/auth", authRouter)
app.use("/api", expenseRouter)
app.use("/api", groupRouter)
app.use("/api", balanceRouter)
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
})

app.listen(PORT, ()=>{
    dbConnect();
    console.log(`The server is runnning on ${PORT}`)
})