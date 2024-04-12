export interface Cart {
    id: number,
    orderId: number,
    userId: number,
    username: string,
    productId: number,
    productname: string,
    quantity: number,
    unitPrice: number,
    totalPrice: number,
    status: string,
}
export interface CartModel{
    list:Cart[],
    cartobj:Cart,
    errormessage:string,
    maxId: number
}
