export default interface Event {
    eventId: string;
    title: string;
    description: string;
    location: string;
    eventDate: Date;
    ticketPrice: number;
    totalTickets: number;
    availableTickets: number;
}
