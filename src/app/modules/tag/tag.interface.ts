import { Types } from "mongoose";

export type TTag = {
  category: Types.ObjectId;
  tagName: string[];
  isDeleted: boolean;
};
