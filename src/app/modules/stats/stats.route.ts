import express from "express";
import auth from "../../middleware/auth";
import { StatsController } from "./stats.controller";



const route = express.Router();

route.get("/dashboard/count/stats",StatsController.getAllStats)



export const CountRouters = route;
