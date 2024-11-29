import Client from '@/models/Client'
import Product from '@/models/Product'
import  {useState,createContext, ReactNode} from 'react'


interface ShoppingCartContextInterface{
   cartClients:Cart[],
   updateClientCart:(client:Client,product:Product)=>void,
   selectedClient:Client | null,
   setSelectedClient:React.Dispatch<React.SetStateAction<Client | null>>
}

interface Cart{
  client:Client,
  products:Product[]
}

type props = {
  children: ReactNode
}

const ShoppingCartContext=createContext<ShoppingCartContextInterface>({} as ShoppingCartContextInterface)

export function ShoppingCartProvider({children}:props){
    // const [refreshCart,setRefreshCart]=useState(false)
    const [cartClients,setCartClients]=useState<Cart[]>([])
    const [selectedClient, setSelectedClient]= useState<Client | null>(null)
    
    
    function refreshCartNow(){
      //setRefreshCart(prev=>!prev)
    }
    
  function updateClientCart(client:Client,product:Product){
      setCartClients(prev=>{
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
      //refreshCartNow()
  }
    
  return(
      <ShoppingCartContext.Provider value={{cartClients,updateClientCart,selectedClient,setSelectedClient}}>
        {children}
      </ShoppingCartContext.Provider>
    )
  }

  export default ShoppingCartContext;