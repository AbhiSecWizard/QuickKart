import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import  image  from "../assets/about-fashion.png"
const About = () => {
  return (
    <section className="w-full bg-linear-to-r from-purple-500 via-pink-500 to-red-500 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -top-4 -left-4 w-full h-full border border-white/30 rounded-2xl"></div>

            <img
              src={image}
              alt="Premium Fashion Brand"
              className="relative z-10 rounded-2xl w-full h-[380px] object-cover
              transition duration-500 group-hover:scale-105 group-hover:shadow-2xl"
            />
          </motion.div>

          {/* CONTENT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <span className="uppercase tracking-widest text-sm text-sky-300">
              About Our Brand
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-3 leading-tight">
              Crafted For Style,  
              <br className="hidden md:block" />
              Designed For Confidence
            </h2>

            <p className="mt-5 text-white/90 leading-relaxed max-w-xl">
              We build premium fashion experiences for modern shoppers.
              Every product reflects quality, elegance, and long-lasting comfort.
            </p>

            {/* TRUST NUMBERS */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { value: "10K+", label: "Customers" },
                { value: "500+", label: "Products" },
                { value: "4.9★", label: "Ratings" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center"
                >
                  <h4 className="text-xl font-semibold">{item.value}</h4>
                  <p className="text-sm text-white/80">{item.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex gap-4">
              <Link
                to="/products"
                className="bg-sky-400 hover:bg-sky-500 text-black font-semibold px-7 py-3 rounded-full transition"
              >
                Shop Collection
              </Link>

              <Link
                to="/about"
                className="border border-white/40 hover:bg-white/10 px-7 py-3 rounded-full transition"
              >
                Our Story
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
