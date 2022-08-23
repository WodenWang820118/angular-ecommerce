export class OrderHistory {
  id: string;
  orderTrackingNumber: string;
  totalQuantity: number;
  totalPrice: number;
  dateCreated: Date;

  constructor(
    id: string,
    orderTrackingNumber: string,
    totalQuantity: number,
    totalPrice: number,
    dateCreated: Date
  ) {
    this.id = id;
    this.orderTrackingNumber = orderTrackingNumber;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
    this.dateCreated = dateCreated;
  }
}
