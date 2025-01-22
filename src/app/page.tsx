import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import SignOut from "../components/SignOut"
import Footer from "../components/Footer"

import HeroSection from "../components/LandingPage/HeroSection"
import ProblemSolutionSection from "../components/LandingPage/ProblemSolutionSection"
import PartnerSection from "../components/LandingPage/PartnerSection"
import FeaturesSection from "../components/LandingPage/FeaturesSection"
import NewsSection from "../components/LandingPage/NewsSection"
import ForumsSection from "../components/LandingPage/ForumsSection"
import TestimonialSection from "../components/LandingPage/TestimonialSection"
import CtaSection from "../components/LandingPage/CtaSection"

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Sample partner data - you might want to fetch this from an API or database
  const partners = [
    { name: "Partner 1" },
    { name: "Partner 2" },
    { name: "Partner 3" },
    { name: "Partner 4" },
    { name: "Partner 5" },
    { name: "Partner 6" },
  ]

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSolutionSection />
      <PartnerSection partners={partners} />
      <FeaturesSection />
      <NewsSection />
      <ForumsSection />
      <TestimonialSection />
      <CtaSection />
      <Footer />
    </main>
  )
}

