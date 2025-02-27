export default class Payment {
  PaymentId!: number;
  BookingId!: number;
  Amount!: number;
  Method!: "CREDIT_CARD" | "DEBIT_CARD" | "PAYPAL" | "CASH";
  Status!: "PENDING" | "SUCCESS" | "FAILED";
}
