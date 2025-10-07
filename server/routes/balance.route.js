import express from "express"
import { getGroupBalances } from "../controller/balance.controller.js";

const router = express.Router();

router.get("/balances/all", getGroupBalances)


export default router;