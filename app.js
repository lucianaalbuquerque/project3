// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/cloudinary.config")

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

const productRoutes = require("./routes/product.routes");
app.use("/api", isAuthenticated, productRoutes);

const stockistRoutes = require("./routes/stockist.route");
app.use("/api", isAuthenticated, stockistRoutes);

const pageRoutes = require("./routes/page.route");
app.use("/api", isAuthenticated, pageRoutes);

const catalogueRoutes = require("./routes/catalogue.route");
app.use("/api", isAuthenticated, catalogueRoutes);

const firstpageRoutes = require("./routes/firstpage.route");
app.use("/api", isAuthenticated, firstpageRoutes);

const secondpageRoutes = require("./routes/secondpage.route");
app.use("/api", isAuthenticated, secondpageRoutes);

const lastpageRoutes = require("./routes/lastpage.route");
app.use("/api", isAuthenticated, lastpageRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
