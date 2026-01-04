import { MdOutlineLocalShipping } from "react-icons/md";
import { IoMdLock } from "react-icons/io"
import { IoMdRefresh } from "react-icons/io";
import { LuClock4 } from "react-icons/lu";
export const Features = ()=>{
    return (
        <div className="flex md:flex-row md:h-auto md:justify-center md:items-center md:gap-10 md:max-w-6xl md:mx-auto py-10 text-gray-700 flex-col px-4 gap-3.5 ">                                             
          <div className="md:border-r-2 border-b-1 md:border-b-0 pb-3 pr-6 flex gap-4 items-center">
            <i><MdOutlineLocalShipping  size={40}/></i>
           <div > <h3 className="text-lg font-bold">Free Shipping</h3>
            <p>On all orders over $50</p></div>
          </div>
          <div className="md:border-r-2 border-b-1 md:border-b-0 pb-3 pr-6 flex gap-4 items-center">
            <i><IoMdLock  size={40}/></i>
          <div>  <h3 className="text-lg font-bold">Secure Payment</h3>
            <p>100% secure payment</p></div>
          </div>
          <div  className="md:border-r-2 border-b-1 md:border-b-0 pb-3 pr-6 flex gap-4 items-center">
            <i><IoMdRefresh  size={40}/></i>
            <div>
                <h3 className="text-lg font-bold">Easy Returns</h3>
            <p>Free returns within 30 days</p>
            </div>
          </div>
          <div  className="md:border-r-2 border-b-1 md:border-b-0 pb-3 pr-6 flex gap-4 items-center">
            <i><LuClock4  size={40}/></i>
            <div>
                <h3 className="text-lg font-bold">24/7 Support</h3>
               <p>Customer support available anytime</p>
            </div>
          </div>

        </div>
    )
}