"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"

export default function NewsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h3 className="text-5xl font-bold mb-4 text-slate-900 font-heading">Stay updated on what's happening</h3>
              <p className="text-slate-600 text-xl mb-6 font-body">
                A coalition of nonprofits joins forces to tackle water scarcity in developing regions. This groundbreaking initiative aims to provide clean water access to millions of people worldwide through sustainable infrastructure and community-led programs.
              </p>
              <Link href="/newspage">
                <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white font-heading">
                  See the News
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 mb-6 md:mb-0 relative h-96 md:h-[500px] w-full">
              <Image
                src="/NewsPage.png"
                alt="Latest News"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

