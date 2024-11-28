import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";

const router = Router();
const modulerRoute = [
  {
    path:"/auth",
    route: UserRoute
  },
];

modulerRoute.forEach((root) => {
  router.use(root.path, root.route);
});

export default router;

