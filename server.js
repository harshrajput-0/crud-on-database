import 'dotenv/config';
import app from "./app.js";
import { connectDB } from "./src/db.js";

const PORT = 3000;
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
});