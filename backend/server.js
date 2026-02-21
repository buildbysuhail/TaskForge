import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 7000;

// Connect DB First;
connectDB();

app.use(cors());

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})