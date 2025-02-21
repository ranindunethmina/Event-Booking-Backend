export default interface Booking {
  bookingId: string;
  customerId: string;
  eventId: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | null;
  totalAmount: number;
}