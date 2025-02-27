// import express from "express"
// import * as BookingController from "../controllers/booking.controller"
// import {authenticateUser, authorizeAdmin} from "../middleware/auth.middleware"
//
// const router = express.Router()
//
// router.post("/booking", authenticateUser, authorizeAdmin, BookingController.eventBooking)
//
// router.get("/", authenticateUser,authorizeAdmin, BookingController.getAllBookings);
// router.get("/:id", authenticateUser,authorizeAdmin, BookingController.getBookingById);
// router.put("/:id", authenticateUser,authorizeAdmin, BookingController.eventBookingUpdate);
//
// export default router;

import express from "express";
import Booking from "../model/Booking";
import { BookingAdd, BookingDelete, BookingUpdate, getAllBookings } from "../services/booking-service";

const router = express.Router();

router.post("/add", async (req, res) => {
    const booking: Booking = req.body;
    try {
        const addedBooking = await BookingAdd(booking);
        res.status(201).json(addedBooking);
    } catch (err) {
        console.log("error adding booking", err);
        res.status(500).send("error adding booking");
    }
})

router.put("/update/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);
    const booking: Booking = req.body;

    try {
        const updatedBooking = await BookingUpdate(id, booking);
        res.status(200).json(updatedBooking);
    } catch (err) {
        console.log("error updating booking", err);
        res.status(400).send("error updating booking");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);
    try {
        const deletedBooking = await BookingDelete(id);
        res.status(200).json(deletedBooking);
    } catch (err) {
        console.log("error deleting booking", err);
        res.status(400).send("error deleting booking");
    }
})

router.get("/view", async (req, res) => {
    try {
        const bookings = await getAllBookings();
        res.status(200).json(bookings);
    } catch (err) {
        console.log("error getting bookings", err);
        res.status(400).send("error getting bookings");
    }
})

export default router;
