export default class Booking {
  BookingId!: number;
  CustomerId!: number;
  EventId!: number;
  Status!: "PENDING" | "CONFIRMED" | "CANCELLED" | null;
  TotalAmount!: number;
}