import { useEffect } from "react";
import { GetData } from "../context/DataContext";
import { Category } from "./Category";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate, useParams } from "react-router-dom";
const Carousal = () => {
  const { data, fetchApiProducts } = GetData();
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchApiProducts();
  }, []);
  
  return (
    <div className="md:-my-3">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
      >
        {data?.slice(0, 7).map((item, index) => (
          <SwiperSlide key={index}>
            <div className="w-full bg-linear-to-r from-purple-500 via-pink-500 to-red-500 py-10 md:py-14">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
                
                
                <div className="w-full md:w-1/2 text-white text-center md:text-right">
                  <span className="uppercase tracking-widest text-xs md:text-sm text-gray-300">
                    Trusted Shopping Platform
                  </span>

                  <h1 className="mt-4 text-2xl md:text-4xl font-extrabold leading-tight">
                    Shop Smarter. <br />
                    Get Products On Time.
                  </h1>

                  <p className="mt-4 text-xl md:text-2xl font-semibold text-yellow-400">
                    {item.title}
                  </p>

                  <p className="mt-2 text-xs md:text-sm text-gray-200 leading-relaxed max-w-md mx-auto md:ml-auto">
                    {item.description}
                  </p>

                  <div className="mt-6 flex justify-center md:justify-end gap-4">
                    <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition" onClick={() => navigate("/products")}>
                      Buy Now
                    </button>
                    <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition" onClick={()=>navigate(`/products/${item.id}`)} >
                      View Details
                    </button>
                  </div>
                </div>

                {/* IMAGE SECTION */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-64 h-64 md:w-96 md:h-96 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-300 hover:shadow-blue-400 transition">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-full h-48 md:h-80 object-contain"
                    />
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Category />
    </div>
  );
};

export default Carousal;
