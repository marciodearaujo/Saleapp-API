import Item from "@/models/Item"
import Product from "@/models/Product"

const  url="http://34.232.74.209:3001/products"

export async function getProducts(){
    try{
        const products=await fetch(url,{
            method:"get"
        })
        return await products.json()
    }catch(error){
        console.log(error)
        throw error
    } 
  }

  export async function removeProductById(id:number){
    try{
        fetch(url+"/"+id,{
            method:"delete"
          })
    }catch(error){
        console.log(error)
        throw error
    }
    
  }

  export async function postProduct(product:Product):Promise<Product>{
    try{
        const response = await fetch(url,{
            method:"post",
            body: JSON.stringify({
              ...product
            }),
            headers:{
              'Content-Type':"application/json"
            }
          }
        )
        return await response.json()
    }catch(error){
        console.log(error)
        throw error
    }
  }


  export async function updateProduct(product:Product){
    try{
        const {id,...body}=product
        await fetch(url+"/"+id,{
            method:"patch",
            body: JSON.stringify({
              ...body
            }),
            headers:{
              'Content-Type':"application/json"
            }
          }
        )

    }catch(error){
        console.log(error)
        throw error
    }
  }

  export async  function getProductById(id:number){
    try{
        const response = await fetch(url+"/"+id,{
            method:"get"
        })
        return await response.json()
    }catch(error){
        console.log(error)
        throw error
    }
  }

  export async function getSaleitems(saleId:number):Promise<Item>{
    try{
      const response= await fetch(url+"/"+saleId+"/items",{
        method:"get"
      })
      return await response.json()
    }catch(error){
      console.log(error)
      throw error
    }
    }