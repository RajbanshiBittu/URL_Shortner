import dotenv from "dotenv";
import application from "./src/application.js";
import { connectDB } from "./src/config/db.config.js";

dotenv.config();

const PORT = process.env.PORT;

connectDB();

const startServer = async () => {
    try {
        await connectDB();
        application.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed.");
        console.error(error.message);

        process.exit(1);
    }
};

startServer();
