import { Request, Response } from 'express';
import {eventDelete, eventRegister, eventsGetAll, eventUpdate, isEventExists} from "../database/event-client";
import Event from "../model/Event";
import dotenv from "dotenv";

dotenv.config();

export const createEvent = async (req: Request, res: Response): Promise<any> => {
   try {
       const event:Event = {
           eventId: req.body.eventId,
           title: req.body.title,
           description: req.body.description,
           location: req.body.location,
           eventDate: req.body.date,
           ticketPrice: req.body.ticketPrice,
           totalTickets: req.body.totalTickets,
           availableTickets: req.body.availableTickets
       }

       const newEvent = await eventRegister(event);
       res.status(201).json(newEvent);
   }catch (error){
       return res.status(500).json({message: "Internal Server Error"});
   }
}

export const getAllEvent = async (req: Request, res: Response): Promise<any> => {
    try {
        const event = await eventsGetAll(false);
        return res.json(event);

    }catch (err){
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getEventById = async (req: Request, res: Response): Promise<any> => {
    const {eventId} = req.params;
    try {
        const event = await isEventExists(eventId);

        if (event == null) {
            return res.status(404).json({ message: 'Event not founds' });
        }
        return res.status(200).json(event);
    }catch (err){
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const updateEvent = async (req: Request, res: Response): Promise<any> => {
    const  eventId = req.params.eventId;
    const event:Event = req.body;

    try {
        const isEvent = await isEventExists(eventId);

        if (isEvent == null){
            return res.status(404).json({ message: 'Event not found' });
        }

        const updateEvent = await eventUpdate(eventId, event);
        return res.status(200).json({
            message: 'Event updated successfully',
            event: updateEvent
        });

    }catch (err){
        console.error("Error in update event:", err);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: err,
        });
    }
}

export const deleteEvent = async (req: Request, res: Response): Promise<any> => {
    const eventId = req.params.eventId;
    try {
        const event = await isEventExists(eventId);

        if (event == null) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const deleteEvent = await eventDelete(eventId);
        return res.status(200).json({
            message: 'Event deleted successfully',
        });

    }catch (err){
        return res.status(500).json({message: "Internal Server Error"});
    }
}


export const getAvailableEvent = async (req: Request, res: Response): Promise<any> => {
    try {
        const event = await eventsGetAll(true);

        if (event.length === 0) {
            return res.status(404).json({ message: "No available events found" });
        }
        return res.json(event);
    } catch (error) {
        console.error("Error fetching available events:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
