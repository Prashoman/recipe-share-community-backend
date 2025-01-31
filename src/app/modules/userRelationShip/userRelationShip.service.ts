import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { UserRelationShip } from "./userRelationShip.model";


const userFollowingDB = async (followId: any, id: any) => {
    const matchUser = await User.findOne({ _id: followId, isDeleted: false });
    if (!matchUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const followUserInfo = await UserRelationShip.create(
        {
            follower: id,
            following: followId,
        }
    );
    return followUserInfo;
}

const userUnFollowingDB = async (unFollowId: any, id: any) => {
    const matchUser = await User.findOne({ _id: unFollowId, isDeleted: false });
    if (!matchUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const result = await UserRelationShip.findOneAndDelete({ follower: id, following: unFollowId });
    return result;
}

const getFollowersDB = async (id: any) => {
    const followers = await UserRelationShip.find({ following: id }).populate("follower", "userName email profileImage _id").select("follower _id");
    return followers;
}

const getFollowingDB = async (id: any) => {
    const following = await UserRelationShip.find({ follower: id }).populate("following", "userName email profileImage _id").select("following _id");
    return following;
}

export const UserRelationService = {
    userFollowingDB,
    userUnFollowingDB,
    getFollowersDB,
    getFollowingDB
}