import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { UserRelationShip } from "../modules/userRelationShip/userRelationShip.route";
import { RecipeRouter } from "../modules/recipes/recipe.route";
import { LikeRoute } from "../modules/likes/like.route";
import { RatingRoute } from "../modules/ratings/rating.route";
import { CommentRoute } from "../modules/commets/comment.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { TagRoutes } from "../modules/tag/tag.route";
import { CountRouters } from "../modules/stats/stats.route";

const router = Router();
const modulerRoute = [
  {
    path: "/auth",
    route: UserRoute,
  },
  {
    path: "/user",
    route: UserRelationShip,
  },
  {
    path: "/recipe",
    route: RecipeRouter,
  },
  {
    path: "/like",
    route: LikeRoute,
  },
  {
    path: "/rating",
    route: RatingRoute,
  },
  {
    path: "/comment",
    route: CommentRoute,
  },
  {
    path: "",
    route: CategoryRoutes,
  },
  {
    path: "",
    route: TagRoutes
  },
  {
    path: "",
    route: CountRouters
  }
];

modulerRoute.forEach((root) => {
  router.use(root.path, root.route);
});

export default router;
