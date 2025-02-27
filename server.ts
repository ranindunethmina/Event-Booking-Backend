import express from 'express';
import eventRoutes from "./router/event-routes";
import bookingRoutes from "./router/booking-routes";
import customerRoutes from "./router/customer-routes";

const app = express();

app.use(express.json());
app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');

    next();
})
app.use("/event", eventRoutes);
app.use("/booking", bookingRoutes)
app.use("/customer", customerRoutes)

app.listen(3000, (err=>{
    console.log("Server running on port 3000");
}));