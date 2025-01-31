import express from "express";

import auth from "../../middleware/auth";
import { UserRelationShipController } from "./userRelationShip.controller";


const route = express.Router();

route.post("/follow", auth("user","admin"), UserRelationShipController.followUser)
route.post("/un-follow", auth("user","admin"), UserRelationShipController.unFollowUser);
route.get("/followers", auth("user","admin"), UserRelationShipController.getFollowers);

route.get("/following", auth("user","admin"), UserRelationShipController.getFollowing);


export const UserRelationShip = route;
