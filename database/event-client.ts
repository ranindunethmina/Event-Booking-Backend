import { PrismaClient } from "@prisma/client";
import Event from "../model/Event";
import { generateEventId } from "../controllers/util/generateID.controller";

const prisma = new PrismaClient();

export async function eventRegister(event: Event) {
    try {
        const newEventId = await generateEventId();

        const addedEvent = await prisma.event.create({
            data: {
                eventId: newEventId,
                title: event.title,
                description: event.description,
                location: event.location,
                eventDate: event.eventDate,
                ticketPrice: event.ticketPrice,
                totalTickets: event.totalTickets,
                availableTickets: event.availableTickets,
            },
        });
        console.log("Event created:", addedEvent);
        return addedEvent;
    } catch (err) {
        console.error("Error in eventRegister:", err);
        throw new Error("Error creating event");
    }
}

export async function eventsGetAll(onlyAvailable = false) {
    try {
        const events = await prisma.event.findMany({
            where: onlyAvailable ? { availableTickets: { gt: 0 } } : {}
        });
        return events;
    } catch (err) {
        console.error("Error in eventsGetAll:", err);
        throw new Error("Error fetching events");
    }
}

export async function eventDelete(eventId: string) {
    try {
        const deletedEvent = await prisma.event.delete({
            where: { eventId:eventId },
        })
        return deletedEvent;
    } catch (err) {
        console.error("Error in eventDelete:", err);
        throw new Error("Error deleting event");
    }
}

export async function eventUpdate(eventId: string, event: Event) {
    try {
        const updatedEvent = await prisma.event.update({
            where: { eventId:eventId },
            data: {
                title: event.title,
                description: event.description,
                location: event.location,
                eventDate: event.eventDate,
                ticketPrice: event.ticketPrice,
                totalTickets: event.totalTickets,
                availableTickets: event.availableTickets,
            }
        });
        return updatedEvent;
    } catch (err) {
        console.error("Error in eventUpdate:", err);
        throw new Error("Error updating event");
    }
}

export async function isEventExists(eventId: string) {
    try {
        if (!eventId) {
            throw new Error("eventId is required");
        }

        let event = await prisma.event.findUnique({
            where: { eventId }
        });
        return event;
    } catch (err) {
        console.error("Error in isEventExists:", err);
        throw new Error("Error verifying event existence");
    }
}
