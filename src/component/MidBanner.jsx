import banner from "../assets/banner1.png"

const MidBanner = () => {
  return (
    <div className="bg-gray-100 md:py-24">
      <div className="relative max-w-7xl mx-auto rounded-2xl px-12 bg-cover bg-center h-137.5 md:h-150"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Next-Gen Electronics at Your Fingertips
            </h1>

            <p className="text-lg md:text-xl mb-6">
              Discover the latest tech innovations with unbeatable prices and
              free shipping on all orders.
            </p>

            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidBanner;
