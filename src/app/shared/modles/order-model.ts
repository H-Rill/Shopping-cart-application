export interface Order {
    id: number,
    orderId: string [];
    payablePrice: number,
    shippingAddress: string,
    contactNumber: string,
    paymentMethod: string,
}
export interface ProductModel{
    list:Order[],
    orderobj:Order,
    errormessage:string
}
