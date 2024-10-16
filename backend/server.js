import express from "express";
import endpoints from "express-list-endpoints";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes.js";
import cors from "cors";
import favoriteRouter from "./src/routes/favorites.js";

// Configuring dotenv to load environment variables from the .env file
dotenv.config();

// setting up basic express server
const app = express();

// Definition of the port on which the server will listen
const PORT = process.env.PORT || 5000;

// CORS configuration options
const corsOptions = {
  origin: function (origin, callback) {
    // We define a whitelist of allowed sources.
    // These are the URLs from which our frontend will make requests to the backend.
    const whitelist = [
      "http://localhost:5173",
      process.env.FRONTEND_URL, // Use frontend URL from environment variable
      process.env.BACKEND_URL, // Use backend URL from environment variable
    ];

    if (process.env.NODE_ENV === "development") {
      // In development, we also allow sourceless requests (e.g. Postman)
      callback(null, true);
    } else if (whitelist.indexOf(origin) !== -1 || !origin) {
      // In production, we check if the source is in the whitelist
      callback(null, true);
    } else {
      callback(new Error("PERMIT DENIED - CORS"));
    }
  },
  credentials: true, 
	// Allows sending credentials, as in the case of authentication session based.
};

// Use cors as global middleware
app.use(cors(corsOptions));

// Middleware for parsing the body of JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
	.then(() => {
    // Start the server only when we are connected to the DB
    app.listen(PORT, () => {
      console.log(`Server turned on on the port ${PORT}`);
  		console.log("The following endpoints are available:");
  		console.table(endpoints(app));
    });
  })
  .catch((error) =>
    console.log("error establishing connection to mongodb ", error)
  );

// Handle GET requests on the base API endpoint
app.get("/api", (req, res) => {
  res.status(200).send("Handling basic get request on /api endpoint");
});

// Use routes for user registration
app.use("/api/register", userRouter);
app.use('/favorites',favoriteRouter);