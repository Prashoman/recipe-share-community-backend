import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { UserRelationShip } from "../modules/userRelationShip/userRelationShip.route";

const router = Router();
const modulerRoute = [
  {
    path:"/auth",
    route: UserRoute
  },
  {
    path:"/user",
    route: UserRelationShip
  }
];

modulerRoute.forEach((root) => {
  router.use(root.path, root.route);
});

export default router;

