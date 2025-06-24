const express = require("express");
const cors = require("cors");
// const cors = require("cors")
const cookieParser = require("cookie-parser")
const colors = require("colors");
const morgan = require("morgan"); // also a middleware package
const dotenv = require("dotenv");
const { connectDb } = require("./config/db");
const userModel = require("./models/userModel");
const bcrypt = require("bcryptjs");


// dot env configuration
// dotenv.config({path: './env'})
dotenv.config(); // we have dotenv in root -> hence no path

//DB connection
connectDb();

// rest object
const app = express();

// access data in json format
app.use(express.json());

// enable cors & corsOptions
const corsOptions    = {
    // origin:'http://localhost:8080',        --> this request should be coming from frontend
    origin:'http://localhost:5173',
    credentials: true,                                      // as we are using cookie, credentials will be true.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};


const createSuperAdmin = async () => {
  try {
    // const superAdminEmail = process.env.SUPERADMIN_EMAIL || "superadmin@example.com";
    const superAdminEmail = process.env.SUPERADMIN_EMAIL;
    const existingSuperAdmin = await userModel.findOne({ email: superAdminEmail });
    
    if (!existingSuperAdmin) {
      const hashedPassword = await bcrypt.hash(
        // process.env.SUPERADMIN_PASSWORD || "Super@1234", 
        process.env.SUPERADMIN_PASSWORD, 
        10
      );
      
      await userModel.create({
        userName: "Super Admin",
        email: superAdminEmail,
        password: hashedPassword,
        address: "System Default",
        phone: "0000000000",
        answer: "system",
        usertype: "superadmin"
      });
      console.log("✅ Super Admin created successfully!");
    }
  } catch (error) {
    console.error("❌ Super Admin creation failed:", error.message);
  }
};


// Call this function when the server starts
createSuperAdmin();



// middleware
// cors -> middleware -> application start hone se pehle (yaani request aane ke turant baad aur response jane se pehle) ye middle mai kaam karega
// (e.g. info process karna / auth checks / validation check, headers set karna)
app.use(cors(corsOptions));

app.use(morgan("dev")); // 'dev' -> tells us about which url is hitted/ how much time it took/ whats the status code



// route
// app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));
app.use("/api/v1/orders", require("./routes/orderRoutes"));
app.use("/api/v1/tags", require("./routes/tagRoutes")); // tag routes
app.use("/api/v1/cart", require("./routes/cartRoutes")); // tag routes


// app.use("/api/v1/admin", require("./routes/"))

// URL -> http://localhost:8080
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Restaurant App server </h1>");
});

// PORT
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Sever is Up & running perfectly on ${PORT}`.bgMagenta.black
  );
});
