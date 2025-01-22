"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ForumsSection() {
  return (
    <section className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 relative h-96 md:h-[500px] w-full">
              <Image
                src="/ForumsPage.png"
                alt="Community Forums - Your browser can't render this"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-5xl font-bold mb-4 text-orange-500 font-heading">Discuss with individuals and non-profits alike</h3>
              <p className="text-slate-600 text-xl mb-4 font-body">
                Connect with like-minded individuals, share ideas, and collaborate with nonprofits in our vibrant
                community forums. Your voice matters in shaping a better future.
              </p>
              <Link href="/forums">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full font-heading">
                  Join the conversation
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

