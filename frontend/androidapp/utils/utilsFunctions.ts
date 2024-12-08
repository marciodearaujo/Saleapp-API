export function narrowingToString(data:string|string[]){
    if(typeof data==="string"){
        return data
    }
    return data[0]
  }