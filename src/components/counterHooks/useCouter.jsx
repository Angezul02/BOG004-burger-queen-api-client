import { useState } from "react"

export const useCouter = (inicialqty = 1) => {
    const [countqty, setCountqty] = useState(inicialqty)
   
    const incrementQty = () =>{
      setCountqty(countqty + 1);
    }

    const decrementQty = () =>{
      setCountqty(countqty - 1);
    }
    return {
      countqty,
      incrementQty,
      decrementQty
    }
   }

export default useCouter