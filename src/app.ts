import express from "express";
import cors from "cors";

import indexRoute from "./routes/index";
import reservationRoute from "./routes/reservation";
import reservationsRoute from "./routes/reservations";

const app = express();

// Configuration
app.use(express.json());
app.use(cors());

// Routes
app.use("/", indexRoute);
app.use("/reservation", reservationRoute);
app.use("/reservations", reservationsRoute);

// Default to 404 if Endpoint/Method Not Recognized
app.use((req, res, next) => res.status(404).json({ message: "Not found" }));

module.exports = app;
