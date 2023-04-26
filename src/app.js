import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/users.routes.js"
import productRoutes from "./routes/products.routes.js"
import setHeaders from "./utils/middlewares/setHeaders.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(setHeaders);

app.use(userRoutes, productRoutes);

export default app;
