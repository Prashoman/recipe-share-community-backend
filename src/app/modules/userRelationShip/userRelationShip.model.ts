import { model, Schema } from "mongoose";

import { TUserRelationShip } from "./userRelationShip.interface";

const userRelationShip = new Schema<TUserRelationShip>(
  {
    follower: {type: Schema.Types.ObjectId, ref: "User", required: true},
    following: {type: Schema.Types.ObjectId, ref: "User", required: true},
  },
  {
    timestamps: true,
  }
);

export const UserRelationShip = model<TUserRelationShip>("UserRelationShip", userRelationShip);
