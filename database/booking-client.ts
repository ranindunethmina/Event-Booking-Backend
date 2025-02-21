import { PrismaClient } from "@prisma/client";
import { generateBookingId } from "../controllers/util/generateID.controller";
import {isEventExists} from "./event-client";

const prisma = new PrismaClient();

export const createBooking = async (
    eventIds: string[],
    customerId: string
) => {
    try {
        const transaction = await prisma.$transaction(async (prisma) => {
            const bookingId = await generateBookingId();

            let totalAmount = 0;

            const booking = await prisma.booking.create({
                data: {
                    bookingId,
                    customerId,
                    eventIds,
                    status: "PENDING",
                    totalAmount: 0
                },
            });

            // Process each event in the booking
            for (const eventId of eventIds) {
                const event = await prisma.event.findUnique({ where: { eventId } });

                if (!event) {
                    throw new Error(`Event with ID ${eventId} not found`);
                }

                totalAmount += Number(event.ticketPrice);

                await prisma.bookingEvent.create({
                    data: {
                        bookingId,
                        eventId,
                    },
                });

                await prisma.event.update({
                    where: { eventId },
                    data: { availableTickets: event.availableTickets - 1 },
                });
            }

            // Update total amount in the booking
            await prisma.booking.update({
                where: { bookingId },
                data: { totalAmount },
            });

            return booking;
        });

        return transaction;
    } catch (err) {
        console.error("Error in createBooking:", err);
        throw new Error("Error creating booking");
    }
};

export async function bookingAll() {
    try {
        const bookings = await prisma.booking.findMany();
        return bookings;
    } catch (err) {
        console.error("Error in bookingAll:", err);
        throw new Error("Error retrieving bookings");
    }
}

export async function isBookingCredentials(bookingId: string) {
    try {
        if (!bookingId) {
            throw new Error("Booking ID is required");
        }

        const booking = await prisma.booking.findUnique({
            where: { bookingId }
        });
        return booking;
    } catch (err) {
        console.error("Error in isBookingCredentials:", err);
        throw new Error("Error verifying booking credentials");
    }
}

// import { PrismaClient } from "@prisma/client";
// import {generateBookingId} from "../controllers/util/generateID.controller";
//
// const prisma = new PrismaClient();
//
// export const createBooking = async (
//     eventIds: string[],
//     customerId: string,
//     startDate: string,
//     endDate: string,
//     location: string
// ) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//
//     if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//         throw new Error('Invalid date format');
//     }
//
//     const rentalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
//
//     try {
//         const transaction = await prisma.$transaction(async (prisma) => {
//             const bookingId = await generateBookingId();
//
//             let totalAmount = 0;
//
//             const booking = await prisma.booking.create({
//                 data: {
//                     bookingId,
//                     customerId,
//                     status: 'PENDING',
//                     totalAmount: 0,
//                 },
//             });
//
//             const eventBookingPromises = eventIds.map(async (eventId) => {
//                 const isEvent = await isEventCredentials(eventId);
//                 if (isEvent == null) {
//                     throw new Error(`Event with ID ${eventId} not found`);
//                 }
//
//                 const eventTotalAmount = rentalDays * Number(isEvent.pricePerDay);
//                 totalAmount += eventTotalAmount;
//
//                 await prisma.bookingEvent.create({
//                     data: {
//                         bookingId,
//                         eventId,
//                     },
//                 });
//             });
//
//             await Promise.all(eventBookingPromises);
//
//             await prisma.booking.update({
//                 where: { bookingId },
//                 data: { totalAmount },
//             });
//
//             return booking;
//         });
//
//         return transaction;
//     } catch (err) {
//         throw new Error('Error bookings',);
//     }
// };
//
// export async function bookingAll() {
//     try{
//         let bookings = await prisma.booking.findMany();
//         return bookings;
//     }catch (err){
//         console.error('Error in getAllBookings:', err);
//         throw new Error('Error getting all bookings');
//     }
// }
//
// export async function isBookingCredentials(bookingId: string) {
//     try{
//         if (!bookingId) {
//             throw new Error("bookingId is required");
//         }
//
//         let booking = await prisma.booking.findUnique({
//             where: { bookingId: bookingId }
//         });
//         return booking;
//     }catch (err){
//         console.error("Error in isBookingCredentials:", err);
//         throw new Error('Error verifying booking credentials');
//     }
// }