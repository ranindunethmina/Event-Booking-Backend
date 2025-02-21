import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateAdminId(): Promise<string> {
    const lastAdmin = await prisma.admin.findFirst({
        orderBy: { adminId: 'desc' },
    });

    let nextId = "AD-001";
    if (lastAdmin && lastAdmin.adminId) {
        const lastIdNumber = parseInt(lastAdmin.adminId.split("-")[1], 10); // Extract number
        const newIdNumber = lastIdNumber + 1;
        nextId = `AD-${String(newIdNumber).padStart(3, "0")}`;
    }
    return nextId;
}

export async function generateCustomerId(): Promise<string> {
    const lastCustomer = await prisma.customer.findFirst({
        orderBy: { customerId: 'desc' },
    });

    let nextId = "CUS-001";
    if (lastCustomer && lastCustomer.customerId) {
        const lastIdNumber = parseInt(lastCustomer.customerId.split("-")[1], 10);
        const newIdNumber = lastIdNumber + 1;
        nextId = `CUS-${String(newIdNumber).padStart(3, "0")}`;
    }
    return nextId;
}

export async function generateEventId(): Promise<string> {
    const lastEvent = await prisma.event.findFirst({
        orderBy: { eventId: 'desc' },
    });

    let nextId = "EVE-001";
    if (lastEvent && lastEvent.eventId) {
        const lastIdNumber = parseInt(lastEvent.eventId.split("-")[1], 10);
        const newIdNumber = lastIdNumber + 1;
        nextId = `EVE-${String(newIdNumber).padStart(3, "0")}`;
    }
    return nextId;
}

export async function generateBookingId(): Promise<string> {
    const lastBooking = await prisma.booking.findFirst({
        orderBy: { bookingId: 'desc' },
    });

    let nextId = "BO-001";
    if (lastBooking && lastBooking.bookingId) {
        const lastIdNumber = parseInt(lastBooking.bookingId.split("-")[1], 10);
        const newIdNumber = lastIdNumber + 1;
        nextId = `BO-${String(newIdNumber).padStart(3, "0")}`;
    }
    return nextId;
}