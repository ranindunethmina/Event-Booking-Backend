import express from "express";
import Event from "../model/Event";
import {EventAdd, EventDelete, EventUpdate, getAllEvents} from "../services/event-service";

const router = express.Router();

router.post("/add", async (req, res) => {
    const event: Event = req.body;
    try {
        const addedEvent = await EventAdd(event);
        res.status(201).json(addedEvent);
    } catch (err) {
        console.log("error adding event", err);
        res.status(500).send("error adding event");
    }
})

router.put("/update/:id",async (req, res) => {
    const id:number = parseInt(req.params.id);
    const event : Event = req.body;

    try{
        const updatedEvent = await EventUpdate(id, event);
        res.status(200).json(updatedEvent);
    }catch(err){
        console.log("error updating event", err);
        res.status(400).send("error updating event");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);
    try {
        const deletedEvent = await EventDelete(id);
        res.status(200).json(deletedEvent);
    }catch(err){
        console.log("error deleting event", err);
        res.status(400).send("error deleting event");
    }
})

router.get("/view", async (req, res) => {
    try{
        const events = await getAllEvents();
        res.status(200).json(events);
    }catch(err){
        console.log("error getting events", err);
        res.status(400).send("error getting events");
    }
})

export default router;