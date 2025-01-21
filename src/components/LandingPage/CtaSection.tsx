"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"

export default function CtaSection() {
  return (
    <section className="relative py-16 bg-gradient-to-r from-slate-950 to-indigo-950 text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D')`
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 font-body">
            Join Hope Nexus today and be part of the change you want to see in the world.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-heading">
                Sign Up Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

