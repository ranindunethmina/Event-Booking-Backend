import dotenv from "dotenv";
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import {isCustomerCredentials} from "../database/customer-client";
import {bookingAll, createBooking, isBookingCredentials} from "../database/booking-client";

const prisma = new PrismaClient();

dotenv.config();

export const eventBooking = async (req: Request, res: Response): Promise<any> => {
    try {
        const { eventIds, customerId, status, totalAmount } = req.body;

        if (!Array.isArray(eventIds) || eventIds.length === 0) {
            return res.status(400).json({ message: 'Please provide a list of event IDs' });
        }

        const isCustomer = await isCustomerCredentials(customerId);
        if (isCustomer == null) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Call createBooking from booking-client.ts
        const booking = await createBooking(eventIds, customerId, status, totalAmount);

        return res.status(200).json({
            message: 'Booking successfully',
            booking,
            totalAmount: booking.totalAmount,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const eventBookingUpdate = async (req: Request, res: Response): Promise<any> => {
    try {

    }catch (err){
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAllBookings = async (req: Request, res: Response): Promise<any> =>{
    try {
        const eventBooking = await bookingAll();
        return res.status(200).json(eventBooking);

    }catch (err){
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getBookingById = async (req: Request, res: Response): Promise<any> =>{
    const {bookingId} = req.params

    try {
        const eventBooking = await isBookingCredentials(bookingId);
        if (eventBooking == null) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(200).json(eventBooking);
    }catch (err){
        return res.status(500).json({message: "Internal Server Error"});
    }
}