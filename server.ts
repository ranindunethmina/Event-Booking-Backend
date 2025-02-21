import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./router/auth-router";
import bookingRoutes from "./router/booking-routes";
import eventRoutes from "./router/event-routes";
import userRoutes from "./router/customer-routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

declare module 'express' {
    interface Request {
        user?: any;
    }
}

app.use("/api/auth", authRoutes);
app.use("/api/customer", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

// app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});