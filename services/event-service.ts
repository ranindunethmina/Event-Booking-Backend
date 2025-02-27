import prisma from "../database/prismaClient";
import Event from "../model/Event";

export async function EventAdd(e: Event) {
    try {
        const newEvent = await prisma.event.create({
            data: {
                Title: e.Title,
                Description: e.Description,
                Location: e.Location,
                EventDate: new Date(e.EventDate),
                TicketPrice: e.TicketPrice,
                TotalTickets: e.TotalTickets,
                AvailableTickets: e.AvailableTickets,
            }
        })
        console.log('Event Added :', newEvent)
        return newEvent;
    } catch (err) {
        console.log("Error adding event:", err);
    }
}

export async function EventUpdate(id: number, e: Event) {
    try {
        const updatedEvent = await prisma.event.update({
            where: {EventId: id},
            data: {
                Title: e.Title,
                Description: e.Description,
                Location: e.Location,
                EventDate: e.EventDate,
                TicketPrice: e.TicketPrice,
                TotalTickets: e.TotalTickets,
                AvailableTickets: e.AvailableTickets
            }
        })
        console.log('Event updated :', updatedEvent);
        return updatedEvent;
    } catch (err) {
        console.log("error updating event", err);
    }
}

export async function EventDelete(id: number) {
    try {
        const deletedEvent = await prisma.event.delete({
            where: {EventId: id}
        });
        console.log('Event deleted :', id);
        return deletedEvent;
    } catch (err) {
        console.log("error deleting event", err);
    }
}

export async function getAllEvents() {
    try {
        return await prisma.event.findMany();
    } catch (err) {
        console.log("error getting events", err);
    }
}
