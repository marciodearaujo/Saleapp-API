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