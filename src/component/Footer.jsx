export const Footer = () => {
    return (
        <div>
            <div className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-4"><span className="text-red-600 ">Z</span>eptro</h3>
                    <p className="text-sm">
                       <span> 123 Tech Street, Digital City, DC 12345</span>   
                        <span>Email: info@zaptro.com</span>
                    </p>    
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Customer Service</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                        <li><a href="#" className="hover:underline">Returns</a></li>
                        <li><a href="#" className="hover:underline">Shipping Info</a></li>
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:underline">Facebook</a></li>
                        <li><a href="#" className="hover:underline">Twitter</a></li>
                        <li><a href="#" className="hover:underline">Instagram</a></li>
                        <li><a href="#" className="hover:underline">LinkedIn</a></li>
                    </ul>
                </div>
                <div className="mt-4 flex  align-center  items-center">
                     <input type="email" name="" id="" placeholder="Enter your email" className="bg-transparent  outline-none focus:border-b-amber-200 focus:border-b-2 "/>
                        <button className="ml-2 px-4 py-2 h-12 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition">Subscribe</button>
                </div>
            </div>
            <div className="text-center text-sm mt-8">
                &copy; {new Date().getFullYear()} <span className="text-red-500">Zaptro</span>. All rights reserved.
            </div>
        </div>
    </div>    
    )
}   