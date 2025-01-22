"use client"

import { AnimatedTestimonials } from "./ui/animated-testimonials"

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "Hope Nexus has revolutionized how we respond to local emergencies. The real-time crisis mapping helps us allocate resources more effectively and reach those in need faster.",
      name: "Sarah Chen",
      designation: "Emergency Response Coordinator",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "As a disaster relief volunteer, this platform has made it incredibly easy to connect with affected communities and coordinate aid efforts efficiently.",
      name: "Michael Rodriguez",
      designation: "Disaster Relief Coordinator",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The immediate impact tracking and transparent donation system has helped us build trust with donors and increase support for urgent humanitarian causes.",
      name: "Emily Watson",
      designation: "Humanitarian Aid Director",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: 
        "The community response feature has transformed how we mobilize local support during crises. It's amazing to see people coming together so quickly to help.",
      name: "James Kim",
      designation: "Community Crisis Manager",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Hope Nexus provides crucial real-time data that helps us make informed decisions during emergencies. It's become an essential tool in our crisis management toolkit.",
      name: "Lisa Thompson",
      designation: "Emergency Operations Manager",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-500 font-heading">
          Voices from the Field
        </h2>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  )
}

