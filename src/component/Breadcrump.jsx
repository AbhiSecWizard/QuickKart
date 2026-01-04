import { useNavigate } from "react-router-dom"


export const Breadcrump = ({title}) => {
    
    const navigate = useNavigate("")
    
    
    return (
        <div className="mt-2.5 ml-2.5">
           <h1 className="font-semibold text-3xl "><span className="cursor-pointer" onClick={()=>navigate("/")}>Home</span> / <span onClick={()=>navigate("/products")} className="cursor-pointer"> Products / </span>{title}</h1>
        </div>
    )
}
