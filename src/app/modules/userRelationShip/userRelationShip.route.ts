import express from "express";

import auth from "../../middleware/auth";
import { UserRelationShipController } from "./userRelationShip.controller";


const route = express.Router();

route.post("/follow", auth("user"), UserRelationShipController.followUser)
route.post("/un-follow", auth("user"), UserRelationShipController.unFollowUser);
route.get("/followers", auth("user"), UserRelationShipController.getFollowers);

route.get("/following", auth("user"), UserRelationShipController.getFollowing);


export const UserRelationShip = route;
