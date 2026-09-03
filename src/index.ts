import "dotenv/config";
import express from "express";
import { errorRequest } from "./error/error.js";
import authRoutes from "./routes/auth/auth.js";
import userRoutes from "./routes/user/create.routes.js";
import transferRoutes from "./routes/user/transfer.routes.js";

const app = express();
app.use(express.json());
app.use(errorRequest);

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", transferRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
