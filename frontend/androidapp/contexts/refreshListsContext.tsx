import  {useState,createContext, ReactNode} from 'react'


interface RefreshListsContextInterface{
   refreshClientList:boolean
   refreshProductList:boolean
   refreshSaleList:boolean
   refreshClientListNow:()=>void
   refreshProductListNow:()=>void
   refreshSaleListNow:()=>void
}

type props = {
  children: ReactNode
}

const RefreshListsContext=createContext<RefreshListsContextInterface>({} as RefreshListsContextInterface)

export function GlobalAppProvider({children}:props){
    const [refreshClientList,setRefreshClientList]=useState(false)
    const [refreshProductList,setRefreshProductList]=useState(false)
    const [refreshSaleList,setRefreshSaleList]=useState(false)

    function refreshClientListNow(){
      setRefreshClientList(!refreshClientList)
    }

    function refreshProductListNow(){
      setRefreshProductList(!refreshProductList)
    }

    function refreshSaleListNow(){
      setRefreshSaleList(!refreshSaleList)
    }


    return(
      <RefreshListsContext.Provider value={{refreshClientList,refreshProductList,refreshSaleList,refreshClientListNow,refreshProductListNow,refreshSaleListNow}}>
        {children}
      </RefreshListsContext.Provider>
    )
  }

  export default RefreshListsContext;