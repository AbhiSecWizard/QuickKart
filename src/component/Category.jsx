import { useNavigate } from "react-router-dom";
import { GetData } from "../context/DataContext";

export const Category = () => {
    const navigate = useNavigate()
    const { getUniqueCategory } = GetData();
    
    
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex gap-9 overflow-auto bg-gray-50 py-4 px-2 custom-scrollbar">
          {getUniqueCategory.map((category, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <button
                onClick={()=>navigate(`/category/${category}`)}
                className="text-lg font-semibold uppercase whitespace-nowrap cursor-pointer">
                {category}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
