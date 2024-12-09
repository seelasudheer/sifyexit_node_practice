const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoute");
const logInRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");
const { default: mongoose } = require("mongoose");
const { authenticatedMiddleware } = require("./middleware/authntication");
dotenv.config();
const uri =
  "mongodb://sudheer:sudheer123@curdcluster-shard-00-00.nwn3m.mongodb.net:27017,curdcluster-shard-00-01.nwn3m.mongodb.net:27017,curdcluster-shard-00-02.nwn3m.mongodb.net:27017/products?ssl=true&replicaSet=atlas-qxny4c-shard-0&authSource=admin&retryWrites=true&w=majority&appName=curdcluster";
// "mongodb+srv://sudheer:sudheer123@curdcluster.nwn3m.mongodb.net/products?retryWrites=true&w=majority&appName=curdcluster";

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas", err);
    process.exit(1);
  }
};

// Start the Express server
const startServer = () => {
  app.use(express.json());
  app.use("/products", authenticatedMiddleware, productRouter);
  app.use("/todo", authenticatedMiddleware, todoRouter);
  app.use("/user", logInRouter);

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
  });
};

// Initialize the application
const init = async () => {
  await connectToDatabase();
  startServer();
};

init().catch(console.error);
