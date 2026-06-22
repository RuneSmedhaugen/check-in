import express
from "express";

import cors
from "cors";

import foodRoutes
from "./routes/food.js";

const app =
  express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/food",
  foodRoutes
);

const PORT =
  3001;

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on port ${PORT}`
    );
  }
);