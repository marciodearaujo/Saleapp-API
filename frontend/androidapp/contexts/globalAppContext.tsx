import  {useState,createContext, ReactNode} from 'react'


interface GlobalAppContextInterface{
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

const GlobalAppContext=createContext<GlobalAppContextInterface>({} as GlobalAppContextInterface)

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
      <GlobalAppContext.Provider value={{refreshClientList,refreshProductList,refreshSaleList,refreshClientListNow,refreshProductListNow,refreshSaleListNow}}>
        {children}
      </GlobalAppContext.Provider>
    )
  }

  export default GlobalAppContext;