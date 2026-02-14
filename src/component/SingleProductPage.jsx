import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import loadinggif from "../assets/loadingIcon.gif"
import { Breadcrump } from "../component/Breadcrump.jsx"
import { useCart } from '../context/CartContext.jsx'

export const SingleProductPage = () => {
  const [singleProduct, setSingleProduct] = useState(null)
  const [activeImage, setActiveImage] = useState("")
  const { id } = useParams()
  const {addToCart} = useCart()

  const getSingleProductData = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${id}`
      )
      setSingleProduct(res.data)
      setActiveImage(res.data.images?.[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSingleProductData()
  },[])

  if (!singleProduct) {
    return (
      <div className="flex justify-center items-center h-96">
        <img src={loadinggif} width="10%" alt="Loading" />
      </div>
    )
  }

  const {
    title,
    images,
    description,
    price,
    rating,
    discountPercentage,
    brand,
    stock,
    availabilityStatus,
    warrantyInformation,
    returnPolicy,
    shippingInformation,
    minimumOrderQuantity,
    sku,
    tags
  } = singleProduct

  return (
    <div className="px-6 md:px-16">

      {/* Breadcrumb */}
      <Breadcrump title={title} />

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">

        {/* IMAGES SECTION */}
        <div>
          {/* Main Image */}
          <img
            src={activeImage}
            alt={title}
            className="w-full rounded-lg border"
          />

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 object-cover border rounded cursor-pointer
                  ${activeImage === img ? "border-red-500" : "border-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div>
          {/* Title */}
          <h1 className="md:text-3xl text-2xl font-bold text-gray-800">
            {title}
          </h1>

          {/* Brand + SKU */}
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Brand:</span> {brand}
            <span className="mx-2">|</span>
            <span>SKU: {sku}</span>
          </div>

          {/* Rating */}
          <div className="mt-2 text-yellow-500 text-sm">
            ⭐ {rating} / 5
          </div>

          {/* Price Section */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">
              ₹{price}
            </span>

            <span className="line-through text-gray-500">
              ₹{Math.round(price + (price * discountPercentage) / 100)}
            </span>

            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
              {discountPercentage}% OFF
            </span>
          </div>

          {/* Availability */}
          <p className="mt-2 text-sm">
            <span className="font-medium">Availability:</span>{" "}
            <span className={stock > 0 ? "text-green-600" : "text-red-600"}>
              {availabilityStatus} ({stock} left)
            </span>
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-700 leading-relaxed">
            {description}
          </p>

          {/* Extra Info */}
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p>🚚 {shippingInformation}</p>
            <p>🔁 {returnPolicy}</p>
            <p>🛡 {warrantyInformation}</p>
            <p>📦 Minimum Order: {minimumOrderQuantity}</p>
          </div>

          {/* Quantity */}
        
          

          {/* Tags */}
          <div className="mt-4 flex gap-2 flex-wrap">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-gray-200 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer" onClick={()=>addToCart(singleProduct)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
