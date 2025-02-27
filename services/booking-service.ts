import prisma from "../database/prismaClient";
import Booking from "../model/Booking";

export async function BookingAdd(b: Booking) {
    try {
        const newBooking = await prisma.booking.create({
            data: {
                CustomerId: b.CustomerId,
                EventId: b.EventId,
                Status: b.Status ?? undefined,
                TotalAmount: b.TotalAmount
            }
        })
        console.log('Booking Added :', newBooking)
        return newBooking;
    } catch (err) {
        console.log("Error adding booking:", err);
    }
}

export async function BookingUpdate(id: number, b: Booking) {
    try {
        const updatedBooking = await prisma.booking.update({
            where: { BookingId: id },
            data: {
                CustomerId: b.CustomerId,
                EventId: b.EventId,
                Status: b.Status ?? undefined,
                TotalAmount: b.TotalAmount
            }
        })
        console.log('Booking updated :', updatedBooking);
        return updatedBooking;
    } catch (err) {
        console.log("error updating booking", err);
    }
}

export async function BookingDelete(id: number) {
    try {
        const deletedBooking = await prisma.booking.delete({
            where: { BookingId: id }
        });
        console.log('Booking deleted :', id);
        return deletedBooking;
    } catch (err) {
        console.log("error deleting booking", err);
    }
}

export async function getAllBookings() {
    try {
        return await prisma.booking.findMany();
    } catch (err) {
        console.log("error getting bookings", err);
    }
}
