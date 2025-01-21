"use client"

import { motion } from "framer-motion"
import { useTypewriter, Cursor } from "react-simple-typewriter"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  const [text] = useTypewriter({
    words: ["everyone.", "the displaced.", "Non-Profits.", "the unfortunate.", "humanity.", "charities.", "good samaritans.", "volunteers"],
    loop: 0,
  })

  return (
    <section className="relative bg-slate-900 text-white py-32 min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-slate-900/70 z-[1]"></div>
        <img
          src="https://images.unsplash.com/photo-1581059686229-de26e6ae5dc4?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Ruined City BG - Your Browser can't render this"
          className="w-full h-full object-cover z-0"
        />
      </div>
      <div className="container mx-auto px-4 relative z-[2]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-heading whitespace-nowrap">
            For the better of <span>{text}</span>
            <Cursor cursorColor="white" />
          </h1>
          <p className="text-2xl md:text-3xl mb-10 font-body max-w-3xl">
            Connecting hearts, empowering change, and building a better world together.
          </p>
          <Link href="/auth/sign-up">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-lg font-heading"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

