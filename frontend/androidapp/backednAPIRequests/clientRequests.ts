import Client from "@/models/Client"


const  url="http://34.232.74.209:3001/clients"

export async function getClients():Promise<Client[]>{
    try{
        const clients=await fetch(url,{
            method:"get"
        })
        return await clients.json()
    }catch(error){
        console.log(error)
        throw error
    } 
  }

  export async function postClient(client:Client):Promise<Client>{
    try{
        const registerdClient=await fetch(url,{
            method:"post",
            body: JSON.stringify({...client}),
            headers:{
            'Content-Type':"application/json"
            }
        }
        )
        return await registerdClient.json()
    }catch(error){
        console.log(error)
        throw error
    }
  }

  export async function updateClient(client:Client){
    try{
       await fetch(url+"/"+client.id,{
            method:"patch",
            body: JSON.stringify({
              name:client.name,
              phone:client.phone
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