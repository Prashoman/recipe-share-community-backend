import express from "express";
import auth from "../../middleware/auth";
import { RatingController } from "./rating.controller";



const route = express.Router();

route.post("/create", auth("user","admin"), RatingController.createRating);

route.get("/get-my-rating", auth("user","admin"), RatingController.getMyRating);



export const RatingRoute = route;
