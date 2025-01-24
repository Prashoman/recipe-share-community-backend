import { Types } from "mongoose"

export type TUserRelationShip ={
    follower:Types.ObjectId,
    following:Types.ObjectId,
}