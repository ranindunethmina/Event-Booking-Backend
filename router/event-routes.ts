import express from "express";
import {authenticateUser, authorizeAdmin, authorizeCustomer} from "../middleware/auth.middleware";
import * as EventController from "../controllers/event.controller"

const router = express.Router()

router.post("/eventRegister", authenticateUser, authorizeAdmin, EventController.createEvent)
router.get("/", authenticateUser, authorizeAdmin, EventController.getAllEvent)
router.get("/available", authenticateUser, authorizeCustomer, EventController.getAvailableEvent)
router.get("/:eventId", authenticateUser, authorizeAdmin, EventController.getEventById)
router.put("/:eventId", authenticateUser, authorizeAdmin, EventController.updateEvent)
router.delete("/:eventId", authenticateUser, authorizeAdmin, EventController.deleteEvent)

export default router;