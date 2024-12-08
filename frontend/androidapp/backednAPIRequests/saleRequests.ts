import Item from "@/models/Item";
import Product from "@/models/Product";
import SaleClient from "@/models/SaleClient";

const  url="http://34.232.74.209:3001/sales"




export async function postSale(clientId:number,products:Product[]){
    try{
        await fetch(url+"/items",{
            method:"post",
            body: JSON.stringify({
              saleDate:new Date().toISOString(),
              clientId,
              products
            }),
            headers:{
              'Content-Type':"application/json"
            }
          })
    }catch(error){
        console.log(error)
        throw error
    }
}

export async function getSaleClient():Promise<SaleClient[]>{
    try{
        const saleClient= await fetch(url+"?filter[include][]=client",{
            method:"get"
          })
          return await saleClient.json()
    }catch(error){
        console.log(error)
        throw error
    }
}

export async function removeSale(id:number){
  try{
    await fetch(url+"/"+id,{
      method:"delete"
    })
  }catch(error){
    console.log(error)
    throw error
  }
}


export async function getSaleItems(id:number):Promise<Item[]>{
  try{
    const response= await fetch(url+"/"+id+"/items",{
      method:"get"
    })
    return await response.json()
  }catch(error){
    console.log(error)
    throw error
  }
}