import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { protact } from "./middleware/authMiddleware.js";  
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express(); 
app.use(cors());
app.use(express.json());    


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


app.get('/api/protected', protact, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, this is a protected route!` });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});
