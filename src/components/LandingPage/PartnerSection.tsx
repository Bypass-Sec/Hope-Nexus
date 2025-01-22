"use client"

import type React from "react"
import { motion } from "framer-motion"

interface PartnerItemProps {
  name: string
}

const PartnerItem: React.FC<PartnerItemProps> = ({ name }) => (
  <div className="flex flex-col items-center text-center">
    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
      <img
        src="https://png.pngtree.com/png-vector/20220712/ourmid/pngtree-hand-shake-social-charity-logo-png-image_5888875.png"
        alt={`${name} logo`}
        className="w-16 h-16 mb-2"
      />
    </motion.div>
    <span className="text-2xl text-slate-500 font-bold">{name}</span>
  </div>
)

interface PartnerSectionProps {
  partners: { name: string }[]
}

const PartnerSection: React.FC<PartnerSectionProps> = ({ partners }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-orange-500 mb-10 text-center">Our Partners</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {partners.map((partner, index) => (
          <PartnerItem key={index} name={partner.name} />
        ))}
      </div>
    </div>
  </section>
)

export default PartnerSection

