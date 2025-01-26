import express from "express";
import auth from "../../middleware/auth";
import { LikeController } from "./like.controller";


const route = express.Router();

route.post("/create", auth("user","admin"), LikeController.createLike);
route.delete("/delete/:id", auth("user","admin"), LikeController.deleteLike);	
route.get("/get", auth("user","admin"), LikeController.getLikes);



export const LikeRoute = route;
