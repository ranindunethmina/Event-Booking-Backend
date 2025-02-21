import express from "express"
import * as BookingController from "../controllers/booking.controller"
import {authenticateUser, authorizeAdmin} from "../middleware/auth.middleware"

const router = express.Router()

router.post("/booking", authenticateUser, authorizeAdmin, BookingController.eventBooking)

router.get("/", authenticateUser,authorizeAdmin, BookingController.getAllBookings);
router.get("/:id", authenticateUser,authorizeAdmin, BookingController.getBookingById);
router.put("/:id", authenticateUser,authorizeAdmin, BookingController.eventBookingUpdate);

export default router;