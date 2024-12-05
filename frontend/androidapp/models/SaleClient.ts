import Client from "./Client";

export default interface SaleClient{
    id:number,
    saleDate:string,
    clientId:number,
    client:Client
  }