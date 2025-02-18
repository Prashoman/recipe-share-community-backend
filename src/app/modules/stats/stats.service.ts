import { Recipe } from "../recipes/recipe.model";
import { User } from "../user/user.model";


const getAllStatsFormDB = async () => {
    const totalRecipes = await Recipe.countDocuments({ isDeleted: false });
    const totalPublishedRecipes = await Recipe.countDocuments({ isPublished: true, isDeleted: false });
    const totalUnPublishedRecipes = await Recipe.countDocuments({ isPublished: false, isDeleted: false });
    const totalUser = await User.countDocuments({ isDeleted: false, role: "user" });
    const totalAdmin = await User.countDocuments({ isDeleted: false, role: "admin" });
    return { totalRecipes, totalPublishedRecipes, totalUnPublishedRecipes, totalUser, totalAdmin };
}

export const StatsService={
    getAllStatsFormDB
}