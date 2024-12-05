import Client from '@/models/Client'
import Product from '@/models/Product'
import  {useState,createContext, ReactNode} from 'react'


interface ShoppingCartContextInterface{
   clientsCart:Cart[],
   setClientsCart:React.Dispatch<React.SetStateAction<Cart[]>>
   updateClientCart:(client:Client,product:Product)=>void,
   selectedClient:Client | null,
   setSelectedClient:React.Dispatch<React.SetStateAction<Client | null>>
   createSelectedClientCart:(client:Client)=>void
}

export interface Cart{
  client:Client,
  products:Product[]
}

type props = {
  children: ReactNode
}

const ShoppingCartContext=createContext<ShoppingCartContextInterface>({} as ShoppingCartContextInterface)

export function ShoppingCartProvider({children}:props){
    const [clientsCart,setClientsCart]=useState<Cart[]>([])
    const [selectedClient, setSelectedClient]= useState<Client | null>(null)
    
  function updateClientCart(client:Client,product:Product){
      setClientsCart(prev=>{
        if(prev.length!==0){
          const index =prev.findIndex(cart=>cart.client.id===client.id)
          if(index!==-1){
            prev[index].products.push(product)
            return [...prev]
          }
          else
            return [...prev,{
              client,
              products:[product]
            }]
        }else
          return [...prev,{
            client,
            products:[product]
          }]
      })

  }

  function createSelectedClientCart(client:Client){
    setSelectedClient(client)
    setClientsCart(prev=>{
      return [
        ...prev,
        {
        client,
        products:[]
        }
      ]
    })
  }
    
  return(
      <ShoppingCartContext.Provider value={{createSelectedClientCart,clientsCart,updateClientCart,selectedClient,setSelectedClient,setClientsCart}}>
        {children}
      </ShoppingCartContext.Provider>
    )
  }

  export default ShoppingCartContext;