import {createContext,useState,Provider, useContext} from "react";
import axios from "axios";
export const DataContext = createContext(null);

export const DataProvider = ({children})=>{
    const [data , setData] = useState()
    const fetchApiProducts = async()=>{
        try {
         const res = await axios.get("https://dummyjson.com/products?limit=190")
         const productData = res.data.products
         
        setData(productData)
        }catch (error) {
            console.log("error while fetching products",error)
        }
    }
 const getUniqueCategory = [...new Set(data?.map((item)=>item.category))]
 const getUniqueBrands = ["All",...new Set(data?.map((item)=>item.brand))]
//  console.log("this is my brand data ",getUniqueBrands)

    return <DataContext.Provider value={{data,setData,fetchApiProducts,getUniqueCategory,getUniqueBrands}}>
{children}
    </DataContext.Provider>
    
}

export const GetData = () => useContext(DataContext)