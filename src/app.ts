import express, { Application } from "express";
import cors from "cors";
import router from "./app/router/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
const app: Application = express();
app.use(cors({ origin: [
  "http://localhost:3000",
  "https://recipe-sharing-community-platform.vercel.app"
],
credentials: true }));
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Recipe share Community Api is running");
});

app.use(globalErrorHandler);

//not found api
app.use(notFound);

export default app;
