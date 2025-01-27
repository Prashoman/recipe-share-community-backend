

import express from "express";
import auth from "../../middleware/auth";
import { CommentController } from "./comment.controller";

const route = express.Router();

route.post("/create", auth("user","admin"), CommentController.createComment);
// route.delete("/delete/:id", auth("user","admin"), LikeController.deleteLike);	
// route.get("/get", auth("user","admin"), LikeController.getLikes);

route.get("/get/:id", CommentController.getMyComments);


export const CommentRoute = route;
