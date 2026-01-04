// import React from 'react'

// const Contact = () => {
//   return (
//     <div>
//       Hello Contact js
//     </div>
//   )
// }



// export default Contact

import React from "react";

const Contact = () => {
  return (
    <section className="w-full bg-linear-to-r from-purple-500 via-pink-500 to-red-500 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 text-white">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Get In Touch With Us
          </h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            Have a question, need help, or want to know more about our products?
            Our team is always here to help you.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT: CONTACT INFO */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Customer Support
            </h3>

            <p className="text-white/90 leading-relaxed">
              We believe in fast, friendly, and reliable support. Whether it’s
              about orders, returns, or product details — feel free to reach
              out anytime.
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl">
                <h4 className="font-semibold">Email</h4>
                <p className="text-white/80">support@yourstore.com</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl">
                <h4 className="font-semibold">Phone</h4>
                <p className="text-white/80">+91 98765 43210</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl">
                <h4 className="font-semibold">Address</h4>
                <p className="text-white/80">
                  New Delhi, India
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl">
            <form className="space-y-5">

              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-black focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-400 hover:bg-sky-500 text-black font-semibold py-3 rounded-full transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
