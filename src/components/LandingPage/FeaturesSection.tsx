"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-500 font-heading"
        >
          Discover Our Features
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/4 mb-6 md:mb-0 relative h-96 md:h-[500px] w-full">
              <Image
                src="/CrisisMap.png"
                alt="Crisis Map - Your browser can't render this"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-5xl font-bold mb-4 text-orange-500 font-heading">Crisis Map</h3>
              <p className="text-slate-600 text-xl mb-4 font-body">
                Our interactive Crisis Map allows users to explore global crises and take immediate action. Click on
                crisis markers to view detailed information and select trusted nonprofits to support their relief
                efforts.
              </p>
              <Link href="/crisismap">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full font-heading">
                  Explore Map
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

