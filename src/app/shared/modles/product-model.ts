export interface Products {
    id:number,
    productname:string,
    description:string,
    price:number,
    category:string,
    brand:string,
    stockCount:number,
    imageUrl: string,
    orderCount: number
}

export interface ProductModel{
    list:Products[],
    productobj:Products,
    errormessage:string
}